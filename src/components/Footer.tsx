import { Link } from 'react-router'
import Brand from './Brand'
export default function Footer() {
  return <footer className="site-footer"><div><Brand/><p>The sovereign marketplace for applied AI.</p></div><div className="footer-links"><div><b>PLATFORM</b><Link to="/client">Audience</Link><Link to="/conductor">First Chair</Link><Link to="/maestro">Maestro</Link></div><div><b>ECOSYSTEM</b><Link to="/venture-studio">Venture Studio</Link><Link to="/open-score">Open Score</Link><a href="mailto:conductors@thinktanksolutions.ai">Certification</a><a href="mailto:legal@thinktanksolutions.ai">Methodology & IP</a></div></div><div className="footer-bottom"><span>© 2026 TerraForm Sovereign AI · Think Tank Solutions AI platform</span><span>Brand Symphony Arrangement Method™</span><span>Less noise. More harmony.</span></div></footer>
}
