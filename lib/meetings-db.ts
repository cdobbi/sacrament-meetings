import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10']
  },
  {
    id: 2,
    date: '2026-10-04',
    meetingType: 'general',
    presiding: 'Stake Presidency',
    conducting: 'Stake Presidency',
    announcements: ['General conference broadcast'],
    openingHymn: { number: 1, title: 'The Morning Breaks' },
    openingPrayer: 'To be announced',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'To be announced'
  },
  {
    id: 3,
    date: '2026-10-18',
    meetingType: 'stake',
    presiding: 'Stake President',
    conducting: 'Stake Presidency',
    announcements: ['Stake conference'],
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Sister Taylor',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
    speakers: [{ name: 'Stake Presidency', topic: 'Following Jesus Christ', type: 'speaker' }],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Brother Martin'
  },
  {
    id: 4,
    date: '2026-10-25',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    announcements: ['Ward service project next Saturday'],
    openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of ward callings' }],
    stakeBusiness: false,
    sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
    speakers: [
      { name: 'Sister Brown', topic: 'Serving one another', type: 'speaker' },
      { name: 'Ward Choir', topic: 'A musical selection', type: 'musical-number' }
    ],
    closingHymn: { number: 98, title: 'I Need Thee Every Hour' },
    closingPrayer: 'Brother Davis'
  },
  {
    id: 5,
    date: '2026-11-01',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    announcements: ['Ward temple night this month'],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
    speakers: [{ name: 'Ward members', topic: 'Testimonies', type: 'speaker' }],
    closingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
    closingPrayer: 'Brother Davis'
  },
  {
    id: 6,
    date: '2026-11-08',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    announcements: ['Ward service project this month'],
    openingHymn: { number: 6, title: 'Redeemer of Israel' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Ward Choir', topic: 'A musical selection', type: 'musical-number' },
      { name: 'Brother Davis', topic: 'Serving with love', type: 'speaker' }
    ],
    closingHymn: { number: 134, title: 'I Believe in Christ' },
    closingPrayer: 'Sister Taylor'
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return [...meetings].sort((a, b) => b.date.localeCompare(a.date));
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}