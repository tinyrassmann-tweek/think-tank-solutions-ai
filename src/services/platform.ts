// Integration seams for production services. UI currently uses typed mock adapters.
export const platformServices = {
  auth: { provider: 'google', mode: 'demo' },
  payments: { provider: 'stripe', mode: 'demo' },
  database: { provider: 'supabase', mode: 'mock' },
} as const

export async function demoLatency(ms = 450) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}
