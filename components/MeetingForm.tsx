"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { createMeeting, updateMeeting, type State } from "@/lib/actions";
import type { SacramentMeeting, SpeakerItem } from "@/lib/types";

const initialState: State = { message: null, errors: {} };
const inputClass = "mt-1 block w-full rounded-md border border-foreground/40 bg-surface px-3 py-2 focus:outline-2 focus:outline-offset-2 focus:outline-accent";
const buttonClass = "rounded-md border border-accent px-3 py-2 font-semibold text-accent hover:bg-accent/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

type FieldProps = {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    errors: string[] | undefined;
    type?: string;
};

function Field({ id, name, label, value, onChange, errors, type = "text" }: FieldProps) {
    return (
        <div>
            <label htmlFor={id} className="block font-medium">{label}</label>
            <input id={id} name={name} type={type} value={value}
                onChange={(event) => onChange(event.target.value)}
                aria-describedby={`${id}-error`} aria-invalid={errors?.length ? true : undefined}
                className={inputClass} />
            <FieldErrors id={id} errors={errors} />
        </div>
    );
}

function FieldErrors({ id, errors }: { id: string; errors?: string[] }) {
    return (
        <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
            {errors?.map((error, index) => <p key={index} className="mt-1 text-sm text-red-700">{error}</p>)}
        </div>
    );
}

export default function MeetingForm({ meeting }: { meeting?: SacramentMeeting }) {
    const action = meeting ? updateMeeting.bind(null, meeting.id) : createMeeting;
    const [state, formAction, isPending] = useActionState(action, initialState);
    const [fields, setFields] = useState({
        date: meeting?.date ?? "",
        meetingType: String(meeting?.meetingType ?? "regular"),
        presiding: meeting?.presiding ?? "",
        conducting: meeting?.conducting ?? "",
        openingHymnNumber: meeting ? String(meeting.openingHymn.number) : "",
        openingHymnTitle: meeting?.openingHymn.title ?? "",
        openingPrayer: meeting?.openingPrayer ?? "",
        sacramentHymnNumber: meeting ? String(meeting.sacramentHymn.number) : "",
        sacramentHymnTitle: meeting?.sacramentHymn.title ?? "",
        closingHymnNumber: meeting ? String(meeting.closingHymn.number) : "",
        closingHymnTitle: meeting?.closingHymn.title ?? "",
        closingPrayer: meeting?.closingPrayer ?? "",
    });
    const [announcements, setAnnouncements] = useState(meeting?.announcements ?? []);
    const [wardBusiness, setWardBusiness] = useState(meeting?.wardBusiness.map((item) => item.description) ?? []);
    const [speakers, setSpeakers] = useState<SpeakerItem[]>(meeting?.speakers ?? []);
    const [stakeBusiness, setStakeBusiness] = useState(meeting?.stakeBusiness ?? false);

    function field(name: keyof typeof fields, label: string, type?: string) {
        return <Field id={name} name={name} label={label} type={type} value={fields[name]}
            onChange={(value) => setFields((current) => ({ ...current, [name]: value }))}
            errors={state.errors[name]} />;
    }

    function textList(
        name: "announcements" | "wardBusiness",
        title: string,
        values: string[],
        setValues: (values: string[]) => void,
    ) {
        return (
            <fieldset className="space-y-3">
                <legend className="text-lg font-semibold">{title}</legend>
                {values.map((value, index) => (
                    <div key={index} className="space-y-2">
                        <Field id={`${name}-${index}`} name={name} label={`${title} ${index + 1}`} value={value}
                            onChange={(next) => setValues(values.map((item, i) => i === index ? next : item))}
                            errors={state.errors[`${name}.${index}`]} />
                        <button type="button" className={buttonClass}
                            onClick={() => setValues(values.filter((_, i) => i !== index))}
                            aria-label={`Remove ${title.toLowerCase()} ${index + 1}`}>Remove</button>
                    </div>
                ))}
                <button type="button" className={buttonClass} onClick={() => setValues([...values, ""])}>
                    Add {name === "announcements" ? "announcement" : "ward business"}
                </button>
            </fieldset>
        );
    }

    function setSpeaker(index: number, change: Partial<SpeakerItem>) {
        setSpeakers((current) => current.map((item, i) => i === index ? { ...item, ...change } : item));
    }

    return (
        <form action={formAction} noValidate className="space-y-6 rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-accent/10 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
                {field("date", "Meeting date", "date")}
                <div>
                    <label htmlFor="meetingType" className="block font-medium">Meeting type</label>
                    <select id="meetingType" name="meetingType" value={fields.meetingType}
                        onChange={(event) => setFields((current) => ({ ...current, meetingType: event.target.value }))}
                        aria-describedby="meetingType-error" aria-invalid={state.errors.meetingType?.length ? true : undefined}
                        className={inputClass}>
                        <option value="regular">Regular</option>
                        <option value="testimony">Testimony</option>
                        <option value="stake">Stake conference</option>
                        <option value="general">General conference</option>
                        <option value="special">Special</option>
                    </select>
                    <FieldErrors id="meetingType" errors={state.errors.meetingType} />
                </div>
                {field("presiding", "Presiding")}
                {field("conducting", "Conducting")}
            </div>

            {textList("announcements", "Announcement", announcements, setAnnouncements)}

            <fieldset className="grid gap-4 sm:grid-cols-2">
                <legend className="text-lg font-semibold">Opening</legend>
                {field("openingHymnNumber", "Opening hymn number", "number")}
                {field("openingHymnTitle", "Opening hymn title")}
                {field("openingPrayer", "Opening prayer")}
            </fieldset>

            {textList("wardBusiness", "Ward business item", wardBusiness, setWardBusiness)}
            <div>
                <label htmlFor="stakeBusiness" className="flex items-center gap-2 font-medium">
                    <input id="stakeBusiness" name="stakeBusiness" type="checkbox" checked={stakeBusiness}
                        onChange={(event) => setStakeBusiness(event.target.checked)}
                        aria-describedby="stakeBusiness-error" aria-invalid={state.errors.stakeBusiness?.length ? true : undefined}
                        className="h-4 w-4 accent-accent" />
                    Stake business
                </label>
                <FieldErrors id="stakeBusiness" errors={state.errors.stakeBusiness} />
            </div>

            <fieldset className="grid gap-4 sm:grid-cols-2">
                <legend className="text-lg font-semibold">Sacrament</legend>
                {field("sacramentHymnNumber", "Sacrament hymn number", "number")}
                {field("sacramentHymnTitle", "Sacrament hymn title")}
            </fieldset>

            <fieldset className="space-y-4">
                <legend className="text-lg font-semibold">Speakers and music</legend>
                {speakers.map((speaker, index) => (
                    <div key={index} className="space-y-3 rounded-lg border border-foreground/20 p-4">
                        <Field id={`speakerName-${index}`} name="speakerName" label={`Name ${index + 1}`}
                            value={speaker.name} onChange={(name) => setSpeaker(index, { name })}
                            errors={state.errors[`speakerName.${index}`]} />
                        <Field id={`speakerTopic-${index}`} name="speakerTopic" label={`Topic ${index + 1} (optional)`}
                            value={speaker.topic} onChange={(topic) => setSpeaker(index, { topic })}
                            errors={state.errors[`speakerTopic.${index}`]} />
                        <div>
                            <label htmlFor={`speakerType-${index}`} className="block font-medium">Type {index + 1}</label>
                            <select id={`speakerType-${index}`} name="speakerType" value={speaker.type}
                                onChange={(event) => setSpeaker(index, { type: event.target.value === "musical-number" ? "musical-number" : "speaker" })}
                                aria-describedby={`speakerType-${index}-error`}
                                aria-invalid={state.errors[`speakerType.${index}`]?.length ? true : undefined}
                                className={inputClass}>
                                <option value="speaker">Speaker</option>
                                <option value="musical-number">Musical number</option>
                            </select>
                            <FieldErrors id={`speakerType-${index}`} errors={state.errors[`speakerType.${index}`]} />
                        </div>
                        <button type="button" className={buttonClass}
                            onClick={() => setSpeakers((current) => current.filter((_, i) => i !== index))}
                            aria-label={`Remove speaker or musical number ${index + 1}`}>Remove</button>
                    </div>
                ))}
                <button type="button" className={buttonClass}
                    onClick={() => setSpeakers((current) => [...current, { name: "", topic: "", type: "speaker" }])}>
                    Add speaker or musical number
                </button>
            </fieldset>

            <fieldset className="grid gap-4 sm:grid-cols-2">
                <legend className="text-lg font-semibold">Closing</legend>
                {field("closingHymnNumber", "Closing hymn number", "number")}
                {field("closingHymnTitle", "Closing hymn title")}
                {field("closingPrayer", "Closing prayer")}
            </fieldset>

            <p aria-live="polite" className="text-sm text-red-700">{state.message}</p>
            <div className="flex flex-wrap items-center gap-4">
                <button type="submit" disabled={isPending}
                    className="rounded-md bg-accent px-4 py-2 font-semibold text-background hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60">
                    {isPending ? "Saving..." : "Save meeting"}
                </button>
                <Link href="/meetings" className="font-semibold text-accent underline">Cancel</Link>
            </div>
        </form>
    );
}
