export type Specialty = 'Lead Capture' | 'Scheduling' | 'Follow-up' | 'Support Triage' | 'Reputation'

export interface Provider {
  id: string
  name: string
  studio: string
  location: string
  tagline: string
  score: number
  reviews: number
  specialties: Specialty[]
  rate: number
  verified: boolean
  sponsored?: boolean
  status: 'Active' | 'Pending' | 'Suspended'
  recovered: string
  response: string
  initials: string
}

export interface Instrument {
  id: number
  name: string
  agent: Specialty
  price: string
  active: boolean
}

export interface Review {
  id: number
  author: string
  provider: string
  score: number
  text: string
  status: 'Published' | 'Pending' | 'Flagged'
  response?: string
}
