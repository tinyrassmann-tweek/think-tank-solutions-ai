import { Link } from 'react-router'
import Brand from '@/components/Brand'
export default function NotFound(){return <main className="not-found"><Brand/><span>404 / LOST NOTE</span><h1>This movement<br/><em>doesn’t exist.</em></h1><p>Let’s return to the beginning of the score.</p><Link className="button primary" to="/">Back to the Overture</Link></main>}
