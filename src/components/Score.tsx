import { Star } from 'lucide-react'
export default function Score({ value, count }: { value: number; count?: number }) {
  return <span className="score"><Star size={14} fill="currentColor"/><b>{value.toFixed(1)}</b>{count !== undefined && <span>({count})</span>}</span>
}
