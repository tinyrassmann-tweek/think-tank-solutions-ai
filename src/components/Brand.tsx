import { Link } from 'react-router'

export default function Brand({ to = '/' }: { to?: string }) {
  return <Link to={to} className="brand" aria-label="Think Tank Solutions AI home"><span className="brand-rule" aria-hidden="true"/><span>THINK TANK<small>SOLUTIONS AI</small></span></Link>
}
