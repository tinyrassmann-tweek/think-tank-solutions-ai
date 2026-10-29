import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Brand from './Brand'

export default function PublicHeader() {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <Brand/>
    <button className="icon-button menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
    <nav className={open ? 'public-nav open' : 'public-nav'} aria-label="Main navigation">
      <Link to="/?section=method" onClick={() => setOpen(false)}>The Method</Link>
      <Link to="/client" onClick={() => setOpen(false)}>Find a Conductor</Link>
      <Link to="/open-score" onClick={() => setOpen(false)}>Open Score</Link>
      <NavLink to="/venture-studio" onClick={() => setOpen(false)}>Venture Studio</NavLink>
      <NavLink to="/conductor" onClick={() => setOpen(false)}>For Providers</NavLink>
    </nav>
    <Link className="button compact header-cta" to="/onboarding">Start your arrangement <ArrowUpRight size={15}/></Link>
  </header>
}
