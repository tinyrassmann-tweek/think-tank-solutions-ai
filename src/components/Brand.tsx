import { Link } from 'react-router'

export function Mark({ small = false }: { small?: boolean }) {
  return <span className={small ? 'brand-mark small' : 'brand-mark'} aria-hidden="true"><i/><i/><i/><i/><i/></span>
}

export default function Brand({ to = '/' }: { to?: string }) {
  return <Link to={to} className="brand" aria-label="Think Tank Solutions AI home"><Mark/><span>THINK TANK<small>SOLUTIONS AI</small></span></Link>
}
