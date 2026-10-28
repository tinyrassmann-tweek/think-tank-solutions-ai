import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router'
import { ArrowLeft, BarChart3, Code2, LayoutDashboard, Settings, ShieldCheck, Star, Wrench } from 'lucide-react'
import Brand from './Brand'

export type PortalRole = 'client' | 'provider' | 'admin'
const nav = {
  client: [{ to: '/client', label: 'Directory', icon: LayoutDashboard }, { to: '/client/settings', label: 'Account & favorites', icon: Settings }],
  provider: [{ to: '/conductor', label: 'Podium', icon: BarChart3 }, { to: '/conductor/instruments', label: 'My Instruments', icon: Wrench }, { to: '/conductor/resonance', label: 'Resonance', icon: Star }, { to: '/conductor/tuning', label: 'Tuning', icon: Settings }],
  admin: [{ to: '/maestro', label: 'Overview', icon: ShieldCheck }, { to: '/maestro/directory', label: 'Directory', icon: LayoutDashboard }, { to: '/maestro/sponsored', label: 'Sponsored', icon: Star }, { to: '/maestro/reviews', label: 'Moderation', icon: Wrench }],
}
export default function PortalLayout({ role, children, title, subtitle, actions }: { role: PortalRole; children: ReactNode; title: string; subtitle: string; actions?: ReactNode }) {
  const roleName = role === 'client' ? 'THE AUDIENCE' : role === 'provider' ? 'THE FIRST CHAIR' : 'THE MAESTRO'
  return <div className="portal-shell"><aside className="portal-sidebar"><Brand/><span className="role-label">{roleName}</span><nav>{nav[role].map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/client' || to === '/conductor' || to === '/maestro'}><Icon size={17}/><span>{label}</span></NavLink>)}</nav><div className="sidebar-bottom"><Link to="/open-score"><Code2 size={17}/>Open Score</Link><Link to="/"><ArrowLeft size={17}/>Back to overture</Link><div className="user-chip"><span>{role === 'admin' ? 'TT' : role === 'provider' ? 'AM' : 'JD'}</span><div><b>{role === 'admin' ? 'Platform Admin' : role === 'provider' ? 'Ava Marin' : 'Jordan Davis'}</b><small>{role === 'admin' ? 'Full access' : role === 'provider' ? 'First Chair' : 'Client account'}</small></div></div></div></aside><main className="portal-main"><header className="portal-top"><div className="portal-atmosphere" aria-hidden="true"><img src="/visuals/symphony-sculpture.svg" alt="" loading="lazy" decoding="async"/></div><div><span className="live-dot">PLATFORM ONLINE</span><h1>{title}</h1><p>{subtitle}</p></div>{actions && <div className="portal-actions">{actions}</div>}</header>{children}</main></div>
}
