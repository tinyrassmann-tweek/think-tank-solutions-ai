export type CaseStudy = {
  id: string
  tab: string
  badge: string
  title: string
  metric: string
  metricSub: string
  problem: string
  solution: string
  specs: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'genesis', tab: 'Genesis AOS · 50 standards', badge: 'REGULATED HEALTHCARE & FACILITY OPS',
    title: 'Genesis Revitalization Group — autonomous compliance architecture',
    metric: '100%', metricSub: 'Evidence-locked claim integrity target across 50 NJ DDD standards',
    problem: 'Adult day habilitation facilities face reimbursement clawbacks when 15-minute DSP logs lack signatures, ISP goal alignment, or staffing-ratio verification.',
    solution: 'Genesis AOS pairs evidence-locked billing with a local inference partition. Claims cannot export until every required interval passes validation, backed by a five-business-day cure workflow.',
    specs: ['50 NJ DDD standards codified', '15-minute DSP logging', '5-day cure timer', 'Local regulated-data partition'],
  },
  {
    id: 'leadrouting', tab: 'Lead Routing · +22%', badge: 'LOCAL SERVICE AUTOMATION',
    title: 'Autonomous lead capture, qualification & three-attempt conversion',
    metric: '+22%', metricSub: 'Reported increase in booked appointments with sub-90-second first response',
    problem: 'Local operators lose high-intent inquiries to manual inbox triage, missed after-hours calls, and inconsistent follow-up.',
    solution: 'An intake pipeline combines instant qualification, calendar matching, and 5-minute / 24-hour / 72-hour follow-up with human-approved messaging.',
    specs: ['+22% booked consultations', '5m / 24h / 72h sequence', 'Automated CRM provisioning', 'Zero duplicate entry'],
  },
  {
    id: 'support', tab: 'Support Triage · −58%', badge: 'CUSTOM AI AGENT DEVELOPMENT',
    title: 'Policy-grounded customer support & triage agents',
    metric: '−58%', metricSub: 'Reported reduction in frontline support workload and escalations',
    problem: 'Small teams spend 15+ hours weekly answering repetitive policy, scheduling, and onboarding questions across fragmented channels.',
    solution: 'Boundary-enforced agents answer from verified SOPs, fee schedules, and escalation rules, then hand complex edge cases to people with full context.',
    specs: ['−58% support ticket load', 'Strict source guardrails', 'Full audit logging', 'Human escalation handoff'],
  },
  {
    id: 'docintel', tab: 'Document RAG · −80%', badge: 'RAG & INVENTORY INTELLIGENCE',
    title: 'Document intelligence and real-time inventory alerts',
    metric: '−80%', metricSub: 'Reported reduction in document processing time',
    problem: 'Compliance packets, vendor contracts, and multi-SKU thresholds require hours of manual cross-checking across spreadsheets.',
    solution: 'Hybrid retrieval-augmented document analysis pairs citation-backed extraction with low-stock monitors and supplier reorder drafts.',
    specs: ['−80% contract review time', '−75% inventory stockouts', 'Citation-backed extraction', 'Automated supplier drafts'],
  },
]

export type Venture = {
  num: string
  name: string
  kicker: string
  category: 'core-saas' | 'marketplace' | 'regulated-community'
  status: string
  model: string
  summary: string
  highlights: string[]
}

export const ventures: Venture[] = [
  { num: '01', name: 'Think Tank Solutions AI', kicker: 'The Mothership · Build Studio & Multi-Agent OS', category: 'core-saas', status: 'ACTIVE // MOTHERSHIP', model: 'Custom systems + 12-month ownership', summary: 'Operator-grade AI operating systems for 5–150 person service organizations, designed backward from documented industry failure modes.', highlights: ['Failure-first architecture', 'OpenClaw orchestration', 'Diagnostic intake & custom builds'] },
  { num: '02', name: 'Think Tank Digital™', kicker: 'Operating Systems for Leaders · Original Assets', category: 'core-saas', status: 'ACTIVE // STOREFRONT', model: 'Direct digital storefront', summary: 'Foundational Canon readers, leadership operating systems, and AI-Friendly System Standard™ websites packaged as ownable digital artifacts.', highlights: ['Source-verified original IP', 'Production Bay packaged', 'Premium quality, accessible pricing'] },
  { num: '03', name: 'TerraForm Sovereign AI', kicker: 'Vetted AI Conductors · Brand Symphony Method', category: 'marketplace', status: 'PRE-GA // PORTALS BUILT', model: 'Vetted services marketplace', summary: 'Two-sided marketplace connecting SMBs with exam-certified AI implementers through Audience, First Chair, Maestro, and Open Score portals.', highlights: ['Earned exam credentialing', 'Five-agent diagnostic', 'Milestone-based service workflows'] },
  { num: '04', name: 'TerraScape Oasis AI', kicker: 'Outdoor Architecture, Pools & Guaranteed Pricing', category: 'marketplace', status: 'INCUBATING // SPEC COMPLETE', model: 'Subscription + commission', summary: 'A high-trust regional marketplace matching properties with vetted landscaping, pool, and outdoor-living contractors.', highlights: ['AI visual yard scoping', 'Vetted local contractors', 'Transparent milestone quotes'] },
  { num: '05', name: 'Genesis Revitalization Group', kicker: 'Adult Day Habilitation & Emergency Respite', category: 'regulated-community', status: 'OPERATING // ATLANTIC CITY', model: 'Medicaid / DDD reimbursement', summary: 'Atlantic City adult day habilitation and emergency respite provider powered by the Genesis AOS compliance architecture.', highlights: ['15-minute DSP interval locks', 'Local regulated-data stack', 'Guardian transparency portal'] },
  { num: '06', name: 'ClientFlow AI', kicker: 'Service Operations & Action-Drafting CRM', category: 'core-saas', status: 'LAUNCH READY // TESTED', model: 'SaaS & custom build tiers', summary: 'Unifies intake, scheduling, communication, billing, and staged AI follow-up into one tenant-isolated client thread.', highlights: ['Staged AI action drafts', 'Tenant-isolated architecture', '12-month ownership path'] },
  { num: '07', name: 'My Ancestry Speaks', kicker: 'Encrypted Legacy Vault & Living Narratives', category: 'regulated-community', status: 'MVP IN BUILD // BETA', model: 'Subscription + legacy credits', summary: 'Transforms family archives and genealogy into dignified ancestral stories with strict grief-ethics and privacy guardrails.', highlights: ['First Encounter onboarding', 'Encrypted family vault', 'Gift-a-Legacy elder kits'] },
  { num: '08', name: 'TerraForm EduTainment AI', kicker: 'Failure-First Thinking for Youth & Families', category: 'regulated-community', status: 'CURRICULUM READY', model: 'Subscription + classroom licensing', summary: 'Interactive education and printable curricula for systems thinking, coding, and practical AI literacy.', highlights: ['Parent / teacher tracks', 'Interactive drills', 'Zero-slop youth pedagogy'] },
  { num: '09', name: 'SimuTrade Labs & Academy', kicker: 'Simulated Trading & Q-EVOLVE Analytics', category: 'regulated-community', status: 'QUANTIDE ACTIVE', model: 'Infrastructure subscription & licensing', summary: 'Risk-free simulated trading with multi-symbol backtesting and a curriculum designed around small-account decision discipline.', highlights: ['Multi-instrument validation', 'AI trading coach drills', 'Education & prop-firm ready'] },
  { num: '10', name: 'YourSpace / Privacy-Pod', kicker: 'Self-Hosted Sovereign Media & Family Cloud', category: 'regulated-community', status: 'ARCHITECTURE COMPLETE', model: 'Hardware + sovereign subscription', summary: 'A locally run media and archive server that removes algorithmic feeds and third-party cloud surveillance.', highlights: ['Local data sovereignty', 'Zero ad-tracking algorithms', 'Homelab & family ready'] },
  { num: '11', name: 'SiteForge', kicker: 'One Engine, Many Skins · System Standard™', category: 'core-saas', status: 'ENGINE LIVE // 5 GATES', model: 'Individual skins & reseller CLI', summary: 'Unified static web architecture governed by one site-data.json file and an AI personalization prompt pack.', highlights: ['Single configuration file', 'No build step for buyers', 'White-label reseller edition'] },
]

export type Artifact = {
  sku: string
  title: string
  category: 'Agent Blueprint' | 'System Standard' | 'Operating System'
  price: string
  status: string
  mitigates: string
  includes: string
}

export const artifacts: Artifact[] = [
  { sku: 'TTS-VC-N8N-08', title: 'VC & Executive Automation Pack · 8 n8n Workflows', category: 'Agent Blueprint', price: '$149', status: 'READY TO DEPLOY', mitigates: 'Manual deal sourcing, diligence bottlenecks, LP reporting delays, and scheduling friction.', includes: 'Eight importable workflows for sourcing, IC prep, diligence, LP communications, portfolio reporting, signatures, scheduling, and social.' },
  { sku: 'SYS-TUTOR-01', title: 'Tutor Landing Page · AI-Friendly System Standard™', category: 'System Standard', price: '$29', status: 'VERIFIED // LIVE DEMO', mitigates: 'Recurring website subscriptions and complex codebases for private educators.', includes: 'Eleven-section static architecture, site-data.json configurator, three resource packs, setup guide, and AI editing prompts.' },
  { sku: 'SYS-CLASSROOM-02', title: 'ClassroomHub & Parent Communication Center', category: 'System Standard', price: '$39', status: 'PRODUCTION BAY v6.0', mitigates: 'Fragmented parent emails, lost permission slips, and scattered classroom schedules.', includes: 'Static engine, single configuration file, parent communication logs, and commercial-safe license.' },
  { sku: 'TTD-YSL-OS-2026', title: 'Youth Sports Leadership Operating System™', category: 'Operating System', price: '$39', status: 'FLAGSHIP EDITION', mitigates: 'Chaotic coaching binders, untracked player development, and ad-hoc fundraising.', includes: 'Thirteen modules covering rosters, practice, lineups, sponsorship, and AI coaching prompts.' },
  { sku: 'FC-001-UNPULLABLE', title: 'FC-001: Unpullable · Canon Reader & Workbook', category: 'Operating System', price: '$19', status: 'MANUSCRIPT COMPLETE', mitigates: 'Recycled self-help filler and distraction-heavy work environments.', includes: 'Original manuscript plus a structured executive focus and discipline implementation workbook.' },
  { sku: 'TTD-AA-2027', title: 'Aisle & Anchor Wedding Operating System · 2027–2028', category: 'Operating System', price: '$49', status: 'BUNDLE READY', mitigates: 'Vendor overruns, timeline collisions, and guest-list spreadsheet chaos.', includes: 'Interactive planner, printable workbook, calendar system, and budget reconciliation engine.' },
  { sku: 'TTS-GENESIS-SOP', title: 'Regulated Facility 50-Standard Compliance Binder', category: 'Agent Blueprint', price: '$197', status: 'OPERATOR PROVEN', mitigates: 'Audit clawbacks, incomplete interval documentation, and safety-drill gaps.', includes: 'Seventeen compliance templates, five-day cure tracking SOPs, and local-inference prompt guardrails.' },
  { sku: 'TTD-PPD-FREE-001', title: 'When Philly PD Fails You · Civilian Rights Manual', category: 'Operating System', price: '$0 · Free', status: 'PUBLIC SERVICE', mitigates: 'Unanswered calls and unclear civilian escalation paths in Philadelphia.', includes: 'Interactive and printable field manual with escalation scripts and process guidance.' },
]

export const blueprintSections = [
  ['Executive Market Summary', 'Localized demand thesis, immediate service gaps, and a measurable first-90-day operating objective.'],
  ['ZIP Competitor Validation', 'A validation protocol for local operators, response times, review quality, and transparent pricing wedges.'],
  ['Three-Tier Revenue Model', 'Entry diagnostic, core recurring package, and commercial retainer with explicit scope boundaries.'],
  ['Target Customer Hubs', 'Neighborhood associations, property managers, community groups, and B2B partner corridors.'],
  ['10X Organic Channel Model', 'A zero-paid-ad launch across search, local directories, partner proof, and short-form demonstrations.'],
  ['Brand & Trust Positioning', 'Plainspoken identity built on turnaround windows, visual proof, and a fast sovereign web presence.'],
  ['14-Day Physical + Digital Sprint', 'Launch the site and profiles, then build direct partner relationships in the target service area.'],
  ['Zero-Bloat Tech Stack', 'Static web delivery, lean client operations, and automation selected only against a named failure mode.'],
  ['30-Minute Daily AI Playbook', 'Morning lead triage, staged follow-up, and a weekly reputation and operations review.'],
  ['State & Local Compliance Checklist', 'Entity registration, insurance, service agreements, record retention, and local regulatory checks.'],
  ['11-Day Ecosystem Escalator', 'Daily accountability milestones tied to launch assets, client operations, and measurable proof.'],
] as const
