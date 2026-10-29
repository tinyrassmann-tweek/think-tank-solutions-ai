import { Link } from 'react-router'

export default function Brand({ to = '/' }: { to?: string }) {
  return <Link to={to} className="brand" aria-label="TerraForm Sovereign AI home"><img className="brand-emblem" src="/brand/terraform-emblem.svg" alt="" width="44" height="44"/><span>TERRAFORM<small>SOVEREIGN AI</small></span></Link>
}
