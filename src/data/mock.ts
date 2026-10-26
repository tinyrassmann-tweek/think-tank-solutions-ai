import type { Instrument, Provider, Review } from '@/types'

export const specialties = ['Lead Capture', 'Scheduling', 'Follow-up', 'Support Triage', 'Reputation'] as const

export const providers: Provider[] = [
  { id: 'ava-marin', name: 'Ava Marin', studio: 'Northstar Automation', location: 'Austin, TX', tagline: 'Turns missed calls into booked revenue—without adding headcount.', score: 4.9, reviews: 87, specialties: ['Lead Capture', 'Follow-up', 'Scheduling'], rate: 2400, verified: true, sponsored: true, status: 'Active', recovered: '$1.8M', response: '< 2 hrs', initials: 'AM' },
  { id: 'julian-cross', name: 'Julian Cross', studio: 'Signal & Service', location: 'Brooklyn, NY', tagline: 'Customer support systems that sound human and never drop the thread.', score: 4.8, reviews: 64, specialties: ['Support Triage', 'Reputation'], rate: 1800, verified: true, status: 'Active', recovered: '$940K', response: '< 4 hrs', initials: 'JC' },
  { id: 'mira-sato', name: 'Mira Sato', studio: 'Quiet Machine Co.', location: 'Portland, OR', tagline: 'Calm, precise follow-up sequences for considered purchases.', score: 5.0, reviews: 42, specialties: ['Follow-up', 'Lead Capture'], rate: 2100, verified: true, status: 'Active', recovered: '$1.2M', response: '< 1 hr', initials: 'MS' },
  { id: 'theo-brooks', name: 'Theo Brooks', studio: 'Afterhours AI', location: 'Chicago, IL', tagline: 'Your best receptionist, on every channel, around the clock.', score: 4.7, reviews: 39, specialties: ['Scheduling', 'Lead Capture', 'Support Triage'], rate: 1450, verified: true, status: 'Active', recovered: '$680K', response: '< 3 hrs', initials: 'TB' },
  { id: 'lena-ortiz', name: 'Lena Ortiz', studio: 'Good Measure Labs', location: 'Miami, FL', tagline: 'Reputation engines that turn delighted customers into durable growth.', score: 4.9, reviews: 51, specialties: ['Reputation', 'Follow-up'], rate: 1950, verified: true, status: 'Active', recovered: '$820K', response: '< 2 hrs', initials: 'LO' },
  { id: 'eli-ward', name: 'Eli Ward', studio: 'Common Thread AI', location: 'Denver, CO', tagline: 'Practical AI operations for teams who need less noise, not more software.', score: 4.6, reviews: 18, specialties: ['Support Triage', 'Scheduling'], rate: 1200, verified: false, status: 'Pending', recovered: '$310K', response: '< 6 hrs', initials: 'EW' },
]

export const initialInstruments: Instrument[] = [
  { id: 1, name: '24/7 Missed Call Recovery', agent: 'Lead Capture', price: '$1,800 setup', active: true },
  { id: 2, name: 'Intelligent Calendar Concierge', agent: 'Scheduling', price: '$950 setup', active: true },
  { id: 3, name: 'No-Show Revival Sequence', agent: 'Follow-up', price: '$650 / month', active: false },
]

export const initialReviews: Review[] = [
  { id: 1, author: 'Harbor Dental', provider: 'Northstar Automation', score: 5, text: 'We recovered 31 bookings in the first month. The system paid for itself before week two.', status: 'Published' },
  { id: 2, author: 'Mason & Pine', provider: 'Northstar Automation', score: 5, text: 'Ava understood our client experience before touching the automation. Thoughtful and precise.', status: 'Pending' },
  { id: 3, author: 'Anonymous', provider: 'Signal & Service', score: 1, text: 'External promotion! Visit this external link for a special deal.', status: 'Flagged' },
]

export const contributors = [
  { rank: 1, name: 'mira-builds', prs: 18, points: 2840, status: 'Fee-Free · 12 mo' },
  { rank: 2, name: 'open-conductor', prs: 14, points: 2210, status: 'Fee-Free · 9 mo' },
  { rank: 3, name: 'stacksmith', prs: 11, points: 1760, status: 'Fee-Free · 6 mo' },
  { rank: 4, name: 'tiny-fixes', prs: 8, points: 980, status: 'Fee-Free · 3 mo' },
]
