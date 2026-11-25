'use server';

import { z } from 'zod';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';
import { auth, signIn } from '@/auth';
import { addMeeting, updateMeeting as updateMeetingRecord, deleteMeeting as deleteMeetingRecord } from './meetings-db';
import type { SacramentMeeting } from './types';

export type State = {
  message: string | null;
  errors: Record<string, string[]>;
};

const requiredText = z.string().trim().min(1, 'This field is required.').max(255, 'Use 255 characters or fewer.');
const hymnNumber = z.string().regex(/^[1-9]\d*$/, 'Enter a positive whole number.')
  .refine((value) => Number.isSafeInteger(Number(value)), 'Enter a valid hymn number.');

const MeetingFormSchema = z.object({
  date: z.iso.date('Enter a valid date.')
    .refine((value) => !value.startsWith('0000-'), 'Enter a valid date.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special'], 'Choose a meeting type.'),
  presiding: requiredText,
  conducting: requiredText,
  openingHymnNumber: hymnNumber,
  openingHymnTitle: requiredText,
  openingPrayer: requiredText,
  sacramentHymnNumber: hymnNumber,
  sacramentHymnTitle: requiredText,
  closingHymnNumber: hymnNumber,
  closingHymnTitle: requiredText,
  closingPrayer: requiredText,
  announcements: z.array(requiredText),
  wardBusiness: z.array(requiredText),
  speakerName: z.array(requiredText),
  speakerTopic: z.array(z.string().trim().max(255, 'Use 255 characters or fewer.')),
  speakerType: z.array(z.enum(['speaker', 'musical-number'], 'Choose a valid type.')),
  stakeBusiness: z.enum(['on']).nullable(),
}).refine(
  (data) => data.speakerName.length === data.speakerTopic.length && data.speakerName.length === data.speakerType.length,
  { message: 'Speaker information is incomplete.' },
);

function parseMeeting(formData: FormData) {
  return MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
    announcements: formData.getAll('announcements'),
    wardBusiness: formData.getAll('wardBusiness'),
    speakerName: formData.getAll('speakerName'),
    speakerTopic: formData.getAll('speakerTopic'),
    speakerType: formData.getAll('speakerType'),
    stakeBusiness: formData.get('stakeBusiness'),
  });
}

function validationState(error: z.ZodError): State {
  const errors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.');
    if (key) (errors[key] ??= []).push(issue.message);
  }
  return { errors, message: 'Please correct the errors below and try again.' };
}

function toMeeting(data: z.output<typeof MeetingFormSchema>): Omit<SacramentMeeting, 'id'> {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: data.announcements,
    openingHymn: { number: Number(data.openingHymnNumber), title: data.openingHymnTitle },
    openingPrayer: data.openingPrayer,
    wardBusiness: data.wardBusiness.map((description) => ({ description })),
    stakeBusiness: data.stakeBusiness === 'on',
    sacramentHymn: { number: Number(data.sacramentHymnNumber), title: data.sacramentHymnTitle },
    speakers: data.speakerName.map((name, index) => ({
      name, topic: data.speakerTopic[index], type: data.speakerType[index],
    })),
    closingHymn: { number: Number(data.closingHymnNumber), title: data.closingHymnTitle },
    closingPrayer: data.closingPrayer,
  };
}

function isDuplicateDate(error: unknown): boolean {
  return typeof error === 'object' && error !== null &&
    'code' in error && error.code === '23505' &&
    'constraint_name' in error && error.constraint_name === 'meetings_date_key';
}

function validId(id: number): boolean {
  return Number.isSafeInteger(id) && id > 0 && id <= 2_147_483_647;
}

async function requireOwnerSession(): Promise<void> {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Not authenticated.');
  }
}

export async function authenticate(
  _previousState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return error.type === 'CredentialsSignin'
        ? 'Invalid email or password.'
        : 'Unable to sign in. Please try again.';
    }
    throw error;
  }
}

export async function createMeeting(_prevState: State, formData: FormData): Promise<State> {
  await requireOwnerSession();
  const result = parseMeeting(formData);
  if (!result.success) return validationState(result.error);

  try {
    await addMeeting(toMeeting(result.data));
  } catch (error) {
    console.error('Error creating meeting:', error);
    if (isDuplicateDate(error)) {
      return { errors: { date: ['A meeting already exists on this date.'] }, message: 'Please choose another date.' };
    }
    throw new Error('Unable to create the meeting. Please try again.');
  }
  revalidatePath('/meetings');
  revalidatePath('/meetings/current');
  redirect('/meetings');
}

export async function updateMeeting(id: number, _prevState: State, formData: FormData): Promise<State> {
  await requireOwnerSession();
  if (!validId(id)) notFound();
  const result = parseMeeting(formData);
  if (!result.success) return validationState(result.error);

  let updated: SacramentMeeting | null;
  try {
    updated = await updateMeetingRecord(id, toMeeting(result.data));
  } catch (error) {
    console.error('Error updating meeting:', error);
    if (isDuplicateDate(error)) {
      return { errors: { date: ['A meeting already exists on this date.'] }, message: 'Please choose another date.' };
    }
    throw new Error('Unable to update the meeting. Please try again.');
  }
  if (!updated) notFound();
  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  revalidatePath('/meetings/current');
  redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  await requireOwnerSession();
  if (!validId(id)) notFound();
  let deleted: boolean;
  try {
    deleted = await deleteMeetingRecord(id);
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error('Unable to delete the meeting. Please try again.');
  }
  if (!deleted) notFound();
  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  revalidatePath('/meetings/current');
}
