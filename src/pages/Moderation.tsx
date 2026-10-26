import { useState } from 'react'
import { Flag, ShieldCheck } from 'lucide-react'
import PortalLayout from '@/components/PortalLayout'
import Score from '@/components/Score'
import Toast from '@/components/Toast'
import { initialReviews } from '@/data/mock'
export default function Moderation() {
  const [reviews, setReviews] = useState(initialReviews), [toast, setToast] = useState('')
  const moderate = (id:number,status:'Published'|'Flagged') => {setReviews(reviews.map(r=>r.id===id?{...r,status}:r));setToast(status==='Published'?'Resonance approved and published.':'Review flagged and withheld from profiles.')}
  return <PortalLayout role="admin" title="Review Moderator" subtitle="Keep Resonance credible, human, and free from manipulation."><div className="moderation-list">{reviews.map(r=><article key={r.id}><div className="review-top"><div><b>{r.author}</b><span>reviewing {r.provider}</span></div><span className={r.status==='Published'?'status-pill active':r.status==='Flagged'?'status-pill flagged':'status-pill pending'}>{r.status.toUpperCase()}</span></div><Score value={r.score}/><p>“{r.text}”</p><div className="moderation-actions"><button className="button outline compact" onClick={()=>moderate(r.id,'Published')}><ShieldCheck size={15}/>Approve</button><button className="button danger compact" onClick={()=>moderate(r.id,'Flagged')}><Flag size={15}/>Flag as spam</button></div></article>)}</div>{toast && <Toast message={toast} onClose={() => setToast('')}/>}</PortalLayout>
}
