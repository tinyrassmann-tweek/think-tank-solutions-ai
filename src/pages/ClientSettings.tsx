import { useState } from 'react'
import { CalendarDays, Check, Heart, LogIn } from 'lucide-react'
import PortalLayout from '@/components/PortalLayout'
import ProviderCard from '@/components/ProviderCard'
import Toast from '@/components/Toast'
import { providers } from '@/data/mock'
import { useLocalStorage } from '@/hooks/useLocalStorage'
export default function ClientSettings() {
  const [favorites, setFavorites] = useLocalStorage<string[]>('tts-favorites', [])
  const [signedIn, setSignedIn] = useState(false), [toast, setToast] = useState('')
  const booking = (() => { try { return JSON.parse(localStorage.getItem('tts-last-booking') || 'null') } catch { return null } })()
  const saved = providers.filter(p => favorites.includes(p.id))
  return <PortalLayout role="client" title="Your account" subtitle="Keep your Conductors, bookings, and preferences in one place."><section className="settings-section"><div><span className="mono-label">ACCOUNT CONNECTION</span><h2>One identity. Every arrangement.</h2><p>Connect Google to sync your marketplace activity when production authentication is enabled.</p></div><button className="button outline" onClick={() => {setSignedIn(!signedIn);setToast(signedIn ? 'Demo Google account disconnected.' : 'Demo Google account connected.')}}>{signedIn ? <Check size={17}/> : <LogIn size={17}/>} {signedIn ? 'Google connected' : 'Continue with Google'}</button></section><section><div className="section-bar"><div><span className="mono-label"><Heart size={13}/>SAVED CONDUCTORS</span><h2>Your private ensemble</h2></div><span>{saved.length} saved</span></div>{saved.length ? <div className="provider-grid">{saved.map(p => <ProviderCard key={p.id} provider={p} favorite onFavorite={() => setFavorites(favorites.filter(f => f !== p.id))}/>)}</div> : <div className="empty-state compact"><Heart/><h3>No saved Conductors yet</h3><p>Use the heart on any directory profile to keep them close.</p></div>}</section><section><div className="section-bar"><div><span className="mono-label"><CalendarDays size={13}/>BOOKING HISTORY</span><h2>Your sessions</h2></div></div>{booking ? <div className="booking-history"><span className="status-pill active">CONFIRMED</span><div><b>Introductory session with {booking.provider}</b><p>{booking.date} at {booking.time} · 30 minutes</p></div><span>$95</span></div> : <div className="empty-state compact"><CalendarDays/><h3>Your first clear note awaits</h3><p>Book an introduction from any Conductor profile.</p></div>}</section>{toast && <Toast message={toast} onClose={() => setToast('')}/>}</PortalLayout>
}
