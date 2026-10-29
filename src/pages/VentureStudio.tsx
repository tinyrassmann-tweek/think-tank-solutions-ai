import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Command, Copy, Download, Moon, Network, ShieldCheck, Sparkles, Sun } from 'lucide-react'
import PublicHeader from '@/components/PublicHeader'
import Footer from '@/components/Footer'
import Modal from '@/components/Modal'
import TopologyCanvas from '@/components/TopologyCanvas'
import { artifacts, blueprintSections, caseStudies, ventures, type Artifact, type Venture } from '@/data/venture'

const sections = [
  ['sec-overview', '01 · Overview & Proof'],
  ['sec-finn', '02 · Products & Finn'],
  ['sec-ecosystem', '03 · 11-Venture Ecosystem'],
  ['sec-operations', '04 · System Architecture'],
  ['sec-storefront', '05 · Digital Storefront'],
  ['sec-diagnostic', '06 · Diagnostic & Booking'],
] as const

const failureModes = [
  ['FAIL-01', 'Audit & billing clawbacks', 'Disconnected notes and missing interval proof turn routine claims into reimbursement exposure.'],
  ['FAIL-02', 'Regulated-data leakage', 'Sensitive records move through public endpoints without a deliberate local-data partition.'],
  ['FAIL-03', 'Siloed tool bleed', 'CRM, scheduling, forms, inboxes, and billing lose context while high-intent leads stall.'],
  ['FAIL-04', 'Perpetual system rent', 'Recurring agency and software bills compound while the operator owns none of the underlying workflows.'],
]
const engineeredPasses = [
  ['PASS-01', 'Evidence-locked execution', 'Workflow promotion stays blocked until required logs, signatures, and milestones validate.'],
  ['PASS-02', 'Local + cloud hybrid', 'Sensitive data stays in a controlled local partition; approved non-sensitive tasks route outward.'],
  ['PASS-03', 'Human-approved actions', 'Agents draft follow-ups, cure notices, and dispatch packets. Operators make the final call.'],
  ['PASS-04', 'Ownership transfer path', 'Configured workflows, templates, and documentation transfer to client control at Month 12.'],
]
const skinPresets = {
  classroom: { name: 'Keystone Scholars Hub', title: 'ClassroomHub Education Portal', tag: 'Grades 6–8 · STEM & Parent Sync', modules: ['WeeklySyllabus', 'ParentCommLog', 'PrintableResources'] },
  tutor: { name: 'Meridian Private Tutoring', title: 'Private Tutor Landing System', tag: '1-on-1 Academic Mastery & Booking', modules: ['SubjectMatrix', 'SessionRates', 'ParentTestimonials'] },
  trades: { name: 'Philly Express Trade Hub', title: 'Local Auto & Home Trade Express', tag: 'Same-Day Diagnostics & Local Search', modules: ['EmergencyCallBar', 'ServicePriceTable', 'PhotoEstimateIntake'] },
  advisory: { name: 'Apex Operations Advisory', title: 'Executive Client Welcome Portal', tag: '90-Day AI Implementation Roadmap', modules: ['AuditBriefing', 'MilestoneTracker', 'VaultDownloads'] },
}

type Skin = keyof typeof skinPresets
type DiagnosticBrief = { org: string; name: string; slot: string; industry: string; size: string; failure: string }

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text)
  const area = document.createElement('textarea')
  area.value = text
  document.body.appendChild(area)
  area.select()
  document.execCommand('copy')
  area.remove()
}

export default function VentureStudio() {
  const [theme, setTheme] = useState<'navy' | 'ivory'>('navy')
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [canvasMode, setCanvasMode] = useState<'orchestration' | 'compliance' | 'ventures'>('orchestration')
  const [pulse, setPulse] = useState(0)
  const [caseId, setCaseId] = useState('genesis')
  const [platform, setPlatform] = useState<'finn' | 'clientflow' | 'siteforge'>('finn')
  const [skill, setSkill] = useState('Mobile Detailing & Fleet Pressure Washing')
  const [zip, setZip] = useState('19149')
  const [budget, setBudget] = useState('$250 – $1,500 · Rapid Launch')
  const [generated, setGenerated] = useState({ skill, zip, budget })
  const [copyStatus, setCopyStatus] = useState('Copy Plan Markdown')
  const [dispatchState, setDispatchState] = useState<'staged' | 'approved'>('staged')
  const [skin, setSkin] = useState<Skin>('classroom')
  const [bizName, setBizName] = useState(skinPresets.classroom.name)
  const [accent, setAccent] = useState('#D4AF37')
  const [ventureFilter, setVentureFilter] = useState('all')
  const [selectedVenture, setSelectedVenture] = useState<Venture | null>(null)
  const [team, setTeam] = useState(25)
  const [saas, setSaas] = useState(2400)
  const [tier, setTier] = useState(2997)
  const [storeFilter, setStoreFilter] = useState('all')
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null)
  const [slot, setSlot] = useState('Monday · 10:00 ET')
  const [brief, setBrief] = useState<DiagnosticBrief | null>(null)

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen(value => !value)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const activeCase = caseStudies.find(item => item.id === caseId) ?? caseStudies[0]
  const filteredVentures = ventureFilter === 'all' ? ventures : ventures.filter(item => item.category === ventureFilter)
  const filteredArtifacts = storeFilter === 'all' ? artifacts : artifacts.filter(item => item.category === storeFilter)
  const statusQuo = saas * 24
  const ownershipTotal = tier + 12 * 700
  const reclaimed = Math.max(0, statusQuo - ownershipTotal)
  const planMarkdown = useMemo(() => [
    `# ${generated.skill} — 11-Section Operating Blueprint`,
    `ZIP: ${generated.zip} · Budget: ${generated.budget}`,
    ...blueprintSections.map(([title, body], index) => `\n## ${String(index + 1).padStart(2, '0')} · ${title}\n${body} Calibrated for ${generated.skill} in ZIP ${generated.zip}.`),
  ].join('\n'), [generated])

  const jump = (id: string) => {
    setPaletteOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }
  const generatePlan = (event: FormEvent) => {
    event.preventDefault()
    setGenerated({ skill: skill.trim(), zip: zip.trim(), budget })
    setCopyStatus('Copy Plan Markdown')
  }
  const applyPreset = (nextSkill: string, nextZip: string, nextBudget: string) => {
    setSkill(nextSkill)
    setZip(nextZip)
    setBudget(nextBudget)
    setGenerated({ skill: nextSkill, zip: nextZip, budget: nextBudget })
  }
  const chooseSkin = (value: Skin) => {
    setSkin(value)
    setBizName(skinPresets[value].name)
  }
  const prepareDiagnostic = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setBrief({
      org: String(data.get('organization') ?? ''),
      name: String(data.get('operator') ?? ''),
      industry: String(data.get('industry') ?? ''),
      size: String(data.get('size') ?? ''),
      failure: String(data.get('failure') ?? ''),
      slot,
    })
  }
  const downloadBrief = () => {
    if (!brief) return
    const text = `TERRAFORM SOVEREIGN AI — DIAGNOSTIC BRIEF\n\nOrganization: ${brief.org}\nOperator: ${brief.name}\nOrganization size: ${brief.size}\nIndustry: ${brief.industry}\nPrimary failure mode: ${brief.failure}\nPreferred discovery window: ${brief.slot}\n\nRecommended track: Multi-Agent Operations OS + ClientFlow AI\nArchitecture: Tenant-isolated operations core with staged human-approved agent workflows.\n\nSTATUS: Brief prepared locally. No booking has been sent or confirmed.\nA Think Tank Solutions AI platform.`
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'terraform-diagnostic-brief.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  return <div className="studio-page" data-theme={theme}>
    <PublicHeader/>
    <main>
      <section className="studio-hero" id="sec-overview">
        <div className="studio-hero-copy">
          <div className="studio-signal"><span/>FAILURE-FIRST FRONTIER SYSTEMATIC THINKING · PHILADELPHIA & NATIONWIDE</div>
          <span className="studio-entity">ENTITY 01 // OPERATOR-GRADE BUILD STUDIO</span>
          <h1>We build operator-grade <em>AI operating systems</em> backward from failure.</h1>
          <p>Generic tools leave mission-critical operations stranded in fragmented workflows. Think Tank Solutions AI provisions audit-locked multi-agent systems and ownable digital infrastructure for 5–150 person organizations.</p>
          <div className="studio-hero-actions">
            <button className="button primary" onClick={() => jump('sec-diagnostic')}>Book a Build <ArrowRight size={17}/></button>
            <button className="button outline" onClick={() => { setPlatform('finn'); jump('sec-finn') }}>Launch Foundry Finn <Sparkles size={16}/></button>
          </div>
          <div className="studio-assurances"><span><ShieldCheck/>Failure-first design</span><span><Check/>12-month ownership path</span><span><Network/>Human-approved automation</span></div>
        </div>
        <div className="studio-hero-visual">
          <div className="topology-head"><span>LIVE TOPOLOGY // FAILURE-FIRST ENGINE</span><i>REFERENCE MODEL</i></div>
          <TopologyCanvas mode={canvasMode} pulse={pulse}/>
          <div className="topology-controls">
            <div>{(['orchestration', 'compliance', 'ventures'] as const).map(mode => <button key={mode} className={canvasMode === mode ? 'active' : ''} onClick={() => setCanvasMode(mode)}>{mode === 'orchestration' ? 'ORCHESTRATION' : mode === 'compliance' ? 'GENESIS 50-STD' : '11 VENTURES'}</button>)}</div>
            <button className="signal-button" onClick={() => setPulse(value => value + 1)}>Simulate Signal</button>
          </div>
          <div className="topology-telemetry" aria-live="polite"><span>[TELEMETRY]</span><p>{pulse ? `Signal ${String(pulse).padStart(2, '0')} routed through ${canvasMode} reference topology. No production system was called.` : 'Select a topology node or simulate a local signal to inspect the architecture.'}</p><b>LOCAL DEMO</b></div>
        </div>
        <div className="studio-stats">
          <div><b>50<span>+</span></b><small>NJ DDD standards codified</small></div>
          <div><b>31</b><small>agents in reference architecture</small></div>
          <div><b>11</b><small>operating portfolio ventures</small></div>
          <div><b>100<span>%</span></b><small>client IP ownership target @ Mo 12</small></div>
        </div>
      </section>

      <nav className="studio-jump" aria-label="Venture Studio sections">
        <div>{sections.map(([id, label]) => <button key={id} onClick={() => jump(id)}>{label}</button>)}</div>
        <button className="quick-jump" onClick={() => setPaletteOpen(true)}><Command size={13}/>QUICK JUMP <kbd>⌘K</kbd></button>
        <button className="theme-button" onClick={() => setTheme(value => value === 'navy' ? 'ivory' : 'navy')} aria-label={`Switch to ${theme === 'navy' ? 'ivory' : 'navy'} theme`}>{theme === 'navy' ? <Sun size={14}/> : <Moon size={14}/>} {theme === 'navy' ? 'IVORY' : 'NAVY'}</button>
      </nav>

      <section className="studio-section failure-section" id="sec-proof">
        <div className="studio-section-heading"><span>01 // FAILURE-FIRST SYSTEMATIC ENGINEERING</span><h2>Why SMB AI deployments fail—<br/><em>and how we engineer the opposite.</em></h2><p>We start at the audit, the missed 72-hour follow-up, or the billing clawback. Then we build deterministic guardrails backward.</p></div>
        <div className="failure-grid">
          <article><div className="failure-label">DOCUMENTED FAILURE MODES <b>HIGH EXPOSURE</b></div><h3>The operational discord</h3>{failureModes.map(([id, title, body]) => <div className="failure-row" key={id}><span>[{id}]</span><div><h4>{title}</h4><p>{body}</p></div></div>)}</article>
          <article className="pass-column"><div className="failure-label">DETERMINISTIC OS <b>EVIDENCE-LOCKED</b></div><h3>The orchestrated system</h3>{engineeredPasses.map(([id, title, body]) => <div className="failure-row" key={id}><span>[{id}]</span><div><h4>{title}</h4><p>{body}</p></div></div>)}</article>
        </div>
        <div className="case-studies">
          <div className="studio-subhead"><span>SHIPPED PROOF // SUPPLIED CASE STUDIES</span><h3>Verified deployments & operational benchmarks</h3></div>
          <div className="studio-tabs" role="tablist" aria-label="Case studies">{caseStudies.map(item => <button role="tab" aria-selected={caseId === item.id} className={caseId === item.id ? 'active' : ''} key={item.id} onClick={() => setCaseId(item.id)}>{item.tab}</button>)}</div>
          <div className="case-panel" role="tabpanel">
            <div><span className="case-badge">{activeCase.badge}</span><h3>{activeCase.title}</h3><div className="case-columns"><div><b>FAILURE MODE ADDRESSED</b><p>{activeCase.problem}</p></div><div><b>ENGINEERED ARCHITECTURE</b><p>{activeCase.solution}</p></div></div><div className="case-specs">{activeCase.specs.map(spec => <span key={spec}>✓ {spec}</span>)}</div></div>
            <aside><span>SUPPLIED PRODUCTION OUTCOME</span><b>{activeCase.metric}</b><p>{activeCase.metricSub}</p><button className="button outline" onClick={() => jump('sec-diagnostic')}>Scope similar architecture <ArrowRight size={14}/></button></aside>
          </div>
        </div>
      </section>

      <section className="studio-section" id="sec-finn">
        <div className="studio-section-heading"><span>02 // CORE PLATFORMS & INTERACTIVE SANDBOX</span><h2>Three flagship engines.<br/><em>Built for operators, not gurus.</em></h2></div>
        <div className="studio-tabs platform-tabs" role="tablist" aria-label="Platform sandbox">
          <button role="tab" aria-selected={platform === 'finn'} className={platform === 'finn' ? 'active' : ''} onClick={() => setPlatform('finn')}>Foundry Finn · Free Blueprint</button>
          <button role="tab" aria-selected={platform === 'clientflow'} className={platform === 'clientflow' ? 'active' : ''} onClick={() => setPlatform('clientflow')}>ClientFlow AI · Service CRM</button>
          <button role="tab" aria-selected={platform === 'siteforge'} className={platform === 'siteforge' ? 'active' : ''} onClick={() => setPlatform('siteforge')}>SiteForge · JSON Engine</button>
        </div>

        {platform === 'finn' && <div className="platform-layout" role="tabpanel">
          <form className="finn-form" onSubmit={generatePlan}>
            <span className="platform-kicker">FOUNDRY FINN // SUPER AGENT</span><h3>Generate an 11-section Business & AI Blueprint in three questions.</h3><p>Calibrate an operating plan to your trade, target ZIP, and startup budget. This interactive planning tool runs locally in your browser.</p>
            <label>1 · Your core skill, trade, or industry focus<input required value={skill} onChange={event => setSkill(event.target.value)} placeholder="e.g., HVAC Repair"/></label>
            <label>2 · Target ZIP code<input required inputMode="numeric" pattern="[0-9]{5}" maxLength={5} value={zip} onChange={event => setZip(event.target.value)} placeholder="19149"/></label>
            <label>3 · Startup budget tier<select value={budget} onChange={event => setBudget(event.target.value)}><option>$0 – $250 · Bootstrapped</option><option>$250 – $1,500 · Rapid Launch</option><option>$1,500 – $5,000 · Operator Scale</option></select></label>
            <div className="preset-row"><span>QUICK PRESETS</span><button type="button" onClick={() => applyPreset('Philly Auto & Collision Hub', '19136', '$250 – $1,500 · Rapid Launch')}>Philly Auto · 19136</button><button type="button" onClick={() => applyPreset('Atlantic City Adult Respite & Care', '08401', '$1,500 – $5,000 · Operator Scale')}>AC Respite Care · 08401</button><button type="button" onClick={() => applyPreset('AI Workflow Consultancy', '19103', '$0 – $250 · Bootstrapped')}>AI Agency · 19103</button></div>
            <button className="button primary full" type="submit">Compile localized blueprint <ArrowRight size={16}/></button>
          </form>
          <div className="blueprint-output" aria-live="polite"><div className="output-head"><span>LIVE OUTPUT // ZIP {generated.zip} CALIBRATED</span><button onClick={() => { void copyText(planMarkdown).then(() => { setCopyStatus('Copied ✓'); window.setTimeout(() => setCopyStatus('Copy Plan Markdown'), 1800) }) }}><Copy size={13}/>{copyStatus}</button></div><h3>{generated.skill} — 11-Part Operating Plan</h3><p className="output-budget">{generated.budget} · LOCAL PLANNING MODEL</p><div className="blueprint-sections">{blueprintSections.map(([title, body], index) => <details key={title} open={index === 0}><summary><span>{String(index + 1).padStart(2, '0')}</span>{title}<ChevronRight size={14}/></summary><p>{body} Calibrated for {generated.skill} in ZIP {generated.zip}.</p></details>)}</div><small>Prepared in-browser by Think Tank Solutions AI · Validate local market and regulatory assumptions before execution.</small></div>
        </div>}

        {platform === 'clientflow' && <div className="clientflow-panel" role="tabpanel">
          <div><span className="platform-kicker">ENTITY 06 // CLIENTFLOW AI</span><h3>One canonical client thread. AI stages the next action—you approve.</h3><p>A reference workflow for service firms tired of context leaking across CRM, scheduling, inboxes, and shared documents.</p><div className="client-thread"><div className="thread-head"><span>CLIENT THREAD // CURTIS</span><b>{dispatchState === 'staged' ? 'ACTION STAGED' : 'AUDIT LOGGED'}</b></div><p><time>10:14 AM</time>Intake form and funding scope logged to the client timeline.</p><p><time>72h trigger</time>No response on supplier SKU sheet; the action engine drafted a follow-up.</p><blockquote>“Hi Curtis — following up on the SKU intake. Your vendor funding milestone schedule is staged. Please confirm Thursday’s 11:00 AM review slot.”</blockquote><div className="thread-actions"><button className="button primary" disabled={dispatchState === 'approved'} onClick={() => setDispatchState('approved')}>{dispatchState === 'approved' ? '✓ Approved & Logged' : '✓ Approve & Dispatch (Simulation)'}</button><button className="button outline" onClick={() => setDispatchState('staged')}>Reset Simulation</button></div><small>{dispatchState === 'approved' ? 'Local simulation only. No message was sent.' : 'Awaiting human-in-the-loop approval.'}</small></div></div>
          <div className="build-tiers">{[[1497, 'LAUNCH', '5–15 users', 'Core workflows, unified intake, scheduling, and staged follow-up.'], [2997, 'GROWTH', '15–100 users', 'Multi-agent orchestration, knowledge vault, and ownership path.'], [5997, 'REGULATED OPS', '100–500 users', 'Dedicated isolation, local inference architecture, and white-label rights.']].map(([price, name, users, body]) => <article key={String(name)}><span>{name} // {users}</span><b>${Number(price).toLocaleString()}</b><p>{body}</p></article>)}<button className="button primary full" onClick={() => jump('sec-diagnostic')}>Scope a ClientFlow build <ArrowRight size={15}/></button></div>
        </div>}

        {platform === 'siteforge' && <div className="siteforge-panel" role="tabpanel">
          <div className="siteforge-controls"><span className="platform-kicker">ENTITY 11 // SITEFORGE ENGINE</span><h3>One engine, many skins. Governed by a single site-data.json file.</h3><p>Explore the five hard gates: no-code updates, AI-prompt editing, static delivery, zero required recurring builder fees, and full ownership.</p><label>Select system skin<select value={skin} onChange={event => chooseSkin(event.target.value as Skin)}>{Object.entries(skinPresets).map(([key, value]) => <option value={key} key={key}>{value.title}</option>)}</select></label><label>Business name<input value={bizName} onChange={event => setBizName(event.target.value)}/></label><label>Accent color<select value={accent} onChange={event => setAccent(event.target.value)}><option value="#D4AF37">Sovereign Gold · #D4AF37</option><option value="#526A5B">Sage Operations · #526A5B</option><option value="#35506D">Architectural Blue · #35506D</option><option value="#A3473C">Signal Terra · #A3473C</option></select></label><div className="gates">{['Zero code required', 'AI-prompt updatable', 'Instant static render', 'Zero builder lock-in', 'Full ownership'].map(gate => <span key={gate}>✓ {gate}</span>)}</div></div>
          <div className="siteforge-live"><div className="site-preview" style={{ '--preview-accent': accent } as React.CSSProperties}><span>{skinPresets[skin].tag}</span><h3>{bizName || 'Your Sovereign System'}</h3><p>{skinPresets[skin].title}</p><i/><button type="button" onClick={() => jump('sec-diagnostic')}>Scope this system →</button></div><pre>{JSON.stringify({ name: bizName, skin, accent, modules: skinPresets[skin].modules }, null, 2)}</pre><b>5/5 HARD GATES PASSED · LOCAL PREVIEW</b></div>
        </div>}
      </section>

      <section className="studio-section" id="sec-ecosystem">
        <div className="studio-section-heading"><span>03 // TINYHOLDINGS × ELEVEN VENTURES ARCHITECTURE</span><h2>One central intelligence core.<br/><em>Eleven specialized ventures.</em></h2><p>Think Tank Solutions AI is the central R&D and multi-agent operating hub across horizontal agent SaaS, vetted marketplaces, and regulated or community systems.</p></div>
        <div className="studio-tabs">{[['all', 'All 11 Ventures'], ['core-saas', 'AI Core & SaaS · 4'], ['marketplace', 'Vetted Marketplaces · 2'], ['regulated-community', 'Regulated & Legacy · 5']].map(([id, label]) => <button key={id} className={ventureFilter === id ? 'active' : ''} onClick={() => setVentureFilter(id)}>{label}</button>)}</div>
        <div className="venture-grid">{filteredVentures.map(venture => <article key={venture.num}><div className="venture-card-top"><span>ENTITY {venture.num}</span><b>{venture.status}</b></div><h3>{venture.name}</h3><small>{venture.kicker}</small><p>{venture.summary}</p><ul>{venture.highlights.map(item => <li key={item}>▸ {item}</li>)}</ul><div className="venture-card-bottom"><span>{venture.model}</span><button onClick={() => setSelectedVenture(venture)}>Inspect PRD <ArrowUpRight size={13}/></button></div></article>)}</div>
      </section>

      <section className="studio-section operations-section" id="sec-operations">
        <div className="studio-section-heading"><span>04 // SYSTEM OPERATIONS & MULTI-AGENT STACK</span><h2>Every tool has one job.<br/><em>Nothing redundant.</em></h2><p>A three-layer reference stack combines executive human oversight, autonomous agent workers, and controlled local inference.</p></div>
        <div className="architecture-layers">
          <article><span>LAYER 01 // DIRECTOR & STRATEGIC BRAIN</span><h3>Human-in-the-loop governance</h3><div><b>COO / DIRECTOR</b><p>Vision, architectural sign-off, compliance standards, and final override.</p></div><div><b>STRATEGIC BRAIN</b><p>Long-context PRD architecture, multi-entity specifications, and verification.</p></div><div><b>REAL-TIME INTEL</b><p>Live regulatory signals, market research, and competitor telemetry.</p></div></article>
          <article><span>LAYER 02 // ORCHESTRATION & AGENT TEAM</span><h3>Controlled autonomous operations</h3><div><b>BLAKE · COO ORCHESTRATOR</b><p>Persistent operating memory, morning briefs, and Mission Control coordination.</p></div><div><b>GENESIS HEALTHCARE AGENT</b><p>Interval evidence, compliance schedules, and cure-alert workflows.</p></div><div><b>PRODUCTION BAY</b><p>Verified deliverable packaging, prompt packs, and client proposals.</p></div></article>
          <article><span>LAYER 03 // CONTROLLED EXECUTION</span><h3>Evidence before action</h3><div><b>LOCAL DATA PARTITION</b><p>Sensitive records remain separated from public model endpoints.</p></div><div><b>HUMAN APPROVAL GATE</b><p>Consequential messages and workflow promotions require operator sign-off.</p></div><div><b>AUDIT TRAIL</b><p>Inputs, approvals, exceptions, and ownership artifacts remain inspectable.</p></div></article>
        </div>
        <div className="roi-calculator"><div><span>OWNERSHIP ECONOMICS CALCULATOR</span><h3>Stop paying perpetual system rent.</h3><p>Compare your current 24-month software and manual-admin spend with the supplied 12-month ownership model. Assumes $700/month orchestration support for 12 months, then no license fee in Year 2.</p><label>Team headcount: <b>{team} staff</b><input type="range" min="5" max="150" step="5" value={team} onChange={event => setTeam(Number(event.target.value))}/></label><label>Current monthly SaaS + admin bleed: <b>${saas.toLocaleString()} / mo</b><input type="range" min="500" max="10000" step="100" value={saas} onChange={event => setSaas(Number(event.target.value))}/></label><label>Think Tank build tier<select value={tier} onChange={event => setTier(Number(event.target.value))}><option value={1497}>Launch Build · $1,497 setup</option><option value={2997}>Growth OS Build · $2,997 setup</option><option value={5997}>Enterprise / Regulated Ops · $5,997 setup</option></select></label></div><div className="roi-results"><div><span>24-MO STATUS QUO · 0% EQUITY</span><b>${statusQuo.toLocaleString()}</b></div><div><span>12-MO OWNERSHIP TOTAL</span><b>${ownershipTotal.toLocaleString()}</b></div><div className="roi-saving"><span>NET 24-MONTH CAPITAL RECLAIMED</span><b>${reclaimed.toLocaleString()}</b></div><small>Planning estimate only. Team size is contextual and does not change the supplied pricing formula.</small><span>✓ IP & WORKFLOW TRANSFER TARGET AT MONTH 12</span><span>✓ SELF-HOST OR ZERO LICENSE LOCK-IN</span></div></div>
      </section>

      <section className="studio-section" id="sec-storefront">
        <div className="studio-section-heading"><span>05 // SYSTEM STOREFRONT & THINK TANK DIGITAL™</span><h2>Original SOPs, agent blueprints &<br/><em>operating systems for leaders.</em></h2><p>Explore the supplied artifact catalog. Checkout is not connected in this preview, so every item is available for inspection without a fake purchase flow.</p></div>
        <div className="studio-tabs">{[['all', 'All Artifacts · 8'], ['Agent Blueprint', 'Agent Blueprints'], ['System Standard', 'SiteForge Systems'], ['Operating System', 'Leadership OS & Canon']].map(([id, label]) => <button key={id} className={storeFilter === id ? 'active' : ''} onClick={() => setStoreFilter(id)}>{label}</button>)}</div>
        <div className="artifact-grid">{filteredArtifacts.map(artifact => <article key={artifact.sku}><div><span>{artifact.category.toUpperCase()}</span><b>{artifact.status}</b></div><small>{artifact.sku}</small><h3>{artifact.title}</h3><p><strong>Mitigates:</strong> {artifact.mitigates}</p><div className="artifact-bottom"><b>{artifact.price}</b><button onClick={() => setSelectedArtifact(artifact)}>Inspect artifact <ArrowUpRight size={13}/></button></div></article>)}</div>
      </section>

      <section className="studio-section diagnostic-section" id="sec-diagnostic">
        <div className="diagnostic-intro"><span>FLOW 01 // DIAGNOSTIC INTAKE & DISCOVERY</span><h2>Book a Build.<br/><em>Map your autonomous architecture.</em></h2><p>Prepare for a focused operator-to-operator working session. Complete the failure-mode diagnostic to generate an architecture brief and preferred discovery window.</p><div className="matcher"><span>LIVE ARCHITECTURAL MATCHER · READY</span><h3>Recommended Track: Multi-Agent Operations OS + ClientFlow AI</h3><p>A tenant-isolated operations core paired with staged human-approved agent workflows.</p><div><b>ISOLATION</b><b>12-MO OWNERSHIP</b><b>AUDIT-LOCKED</b></div></div><ol><li><b>01</b>Failure-mode audit and system scope—no high-pressure pitch.</li><li><b>02</b>Downloadable preparatory brief generated in your browser.</li><li><b>03</b>No slot is confirmed until a real scheduling connection exists.</li></ol></div>
        <div className="diagnostic-form-wrap">
          {!brief ? <form onSubmit={prepareDiagnostic} className="diagnostic-form"><div className="form-state"><span>LOCAL DIAGNOSTIC · INTAKE SCHEMA</span><b>STATE: DEFAULT</b></div><label>Organization Name *<input name="organization" required placeholder="Your organization"/></label><label>Operator / Executive Name *<input name="operator" required placeholder="Your name"/></label><label>Work Email *<input name="email" required type="email" placeholder="you@company.com"/></label><div className="form-two"><label>Organization Size<select name="size" defaultValue="16–50 Staff"><option>5–15 Staff</option><option>16–50 Staff</option><option>51–150 Staff</option><option>150+ Staff</option></select></label><label>Industry Sector<select name="industry" defaultValue="Agency / Consultancy"><option>Day Habilitation / Healthcare</option><option>Agency / Consultancy</option><option>Specialty Contractor / Trades</option><option>Education / Youth Program</option><option>Financial / Multi-Entity Ops</option></select></label></div><label>Primary Failure Mode to Eliminate<select name="failure" defaultValue="Compliance Audit & Interval Documentation"><option>Compliance Audit & Interval Documentation</option><option>Lead Leakage & Slow Follow-Ups</option><option>Fragmented Spreadsheets & Tool Sprawl</option><option>High SaaS / Agency Retainer Burn</option></select></label><label>Current Software Stack<input name="stack" placeholder="CRM, scheduling, billing, spreadsheets…"/></label><fieldset><legend>Preferred Architectural Discovery Window · ET</legend><div className="slot-picker">{['Monday · 10:00 ET', 'Monday · 14:30 ET', 'Tuesday · 11:00 ET', 'Wednesday · 15:00 ET'].map(item => <button type="button" key={item} className={slot === item ? 'active' : ''} onClick={() => setSlot(item)}>{item}</button>)}</div></fieldset><button className="button primary full" type="submit">Prepare Diagnostic Brief <ArrowRight size={16}/></button><small>Nothing is transmitted or booked. Your entries are used only to prepare the local brief.</small></form> : <div className="diagnostic-success" role="status"><span>✓ DIAGNOSTIC BRIEF PREPARED</span><h3>{brief.org}</h3><p>Recommended track: Multi-Agent Operations OS + ClientFlow AI, shaped around <b>{brief.failure.toLowerCase()}</b>.</p><dl><div><dt>Operator</dt><dd>{brief.name}</dd></div><div><dt>Preferred window</dt><dd>{brief.slot}</dd></div><div><dt>Organization</dt><dd>{brief.size} · {brief.industry}</dd></div></dl><div className="booking-notice"><b>Not booked yet.</b> This preview has no live scheduling backend. Download the brief for your discovery session; no data was transmitted.</div><button className="button primary full" onClick={downloadBrief}><Download size={16}/>Download Diagnostic Brief</button><button className="button outline full" onClick={() => setBrief(null)}>Edit Diagnostic</button></div>}
        </div>
      </section>
    </main>
    <Footer/>

    {paletteOpen && <Modal title="Quick Jump · Venture Studio" onClose={() => setPaletteOpen(false)}><div className="command-list">{sections.map(([id, label], index) => <button key={id} onClick={() => jump(id)}><span>0{index + 1}</span>{label.split('· ')[1]}<ArrowRight size={15}/></button>)}</div></Modal>}
    {selectedVenture && <Modal title={selectedVenture.name} onClose={() => setSelectedVenture(null)}><div className="venture-modal"><span>ENTITY {selectedVenture.num} // {selectedVenture.status}</span><h3>{selectedVenture.kicker}</h3><p>{selectedVenture.summary}</p><dl><div><dt>Operating model</dt><dd>{selectedVenture.model}</dd></div><div><dt>Portfolio class</dt><dd>{selectedVenture.category.replace('-', ' / ')}</dd></div></dl><ul>{selectedVenture.highlights.map(item => <li key={item}>✓ {item}</li>)}</ul><button className="button primary full" onClick={() => { setSelectedVenture(null); jump('sec-diagnostic') }}>Scope a related system <ArrowRight size={15}/></button></div></Modal>}
    {selectedArtifact && <Modal title={selectedArtifact.title} onClose={() => setSelectedArtifact(null)}><div className="artifact-modal"><span>{selectedArtifact.sku} · {selectedArtifact.status}</span><h3>{selectedArtifact.price}</h3><p><strong>Mitigates:</strong> {selectedArtifact.mitigates}</p><p><strong>Includes:</strong> {selectedArtifact.includes}</p><div className="booking-notice"><b>Catalog preview.</b> Checkout is not connected. No payment or delivery action will be simulated.</div><button className="button outline full" disabled>Checkout not connected</button></div></Modal>}
  </div>
}
