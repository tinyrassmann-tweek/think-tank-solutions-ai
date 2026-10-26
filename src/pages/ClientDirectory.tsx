import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import PortalLayout from '@/components/PortalLayout'
import ProviderCard from '@/components/ProviderCard'
import { providers, specialties } from '@/data/mock'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { Specialty } from '@/types'

export default function ClientDirectory() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<Specialty | 'All'>('All')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [favorites, setFavorites] = useLocalStorage<string[]>('tts-favorites', [])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const filtered = useMemo(() => providers.filter(p => p.status === 'Active' && (active === 'All' || p.specialties.includes(active)) && (!verifiedOnly || p.verified) && (!favoritesOnly || favorites.includes(p.id)) && `${p.name} ${p.studio} ${p.tagline}`.toLowerCase().includes(query.toLowerCase())).sort((a,b) => Number(!!b.sponsored) - Number(!!a.sponsored)), [query, active, verifiedOnly, favoritesOnly, favorites])
  const toggleFavorite = (id: string) => setFavorites(favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id])
  const clear = () => { setQuery(''); setActive('All'); setVerifiedOnly(false); setFavoritesOnly(false) }
  return <PortalLayout role="client" title="Find your Conductor" subtitle="Vetted AI expertise, arranged around your business."><div className="directory-toolbar"><label className="search-box"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, studio, or outcome…" aria-label="Search conductors"/>{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={16}/></button>}</label><button className="button outline compact mobile-filter" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={16}/>Filters</button></div><div className={filtersOpen ? 'filter-panel open' : 'filter-panel'}><div className="specialty-filter"><button className={active === 'All' ? 'active' : ''} onClick={() => setActive('All')}>All notes</button>{specialties.map(s => <button key={s} className={active === s ? 'active' : ''} onClick={() => setActive(s)}>{s}</button>)}</div><div className="filter-checks"><label><input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)}/>Verified only</label><label><input type="checkbox" checked={favoritesOnly} onChange={e => setFavoritesOnly(e.target.checked)}/>Saved Conductors</label></div></div><div className="results-line"><span><b>{filtered.length}</b> Conductors in harmony</span>{(active !== 'All' || query || verifiedOnly || favoritesOnly) && <button onClick={clear}>Clear all filters <X size={13}/></button>}</div>{filtered.length ? <div className="provider-grid">{filtered.map(p => <ProviderCard key={p.id} provider={p} favorite={favorites.includes(p.id)} onFavorite={() => toggleFavorite(p.id)}/>)}</div> : <div className="empty-state"><Search size={30}/><h2>No Conductors on this frequency</h2><p>Try a broader search or clear your filters to bring the full ensemble back.</p><button className="button primary" onClick={clear}>Reset directory</button></div>}<div className="client-help"><div><span className="mono-label">NOT SURE WHAT YOU NEED?</span><h2>Start with what hurts.</h2></div><Link className="button outline" to="/onboarding">Select your Discord</Link></div></PortalLayout>
}
