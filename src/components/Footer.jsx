import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#3C1E00] border-t border-white/6">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Wordmark */}
          <div className="text-white/50">
            <Link to="/">
              <span className="font-serif text-xl italic text-gold">Wilder Moms</span>
            </Link>
          </div>

          {/* Center: Links */}
          <nav className="flex items-center gap-8">
            <Link 
              to="/wilder-trails/location"
              className="text-white/30 hover:text-gold transition-colors font-sans text-sm"
            >
              Wilder Trails
            </Link>
            <Link 
              to="/basecamp"
              className="text-white/30 hover:text-gold transition-colors font-sans text-sm"
            >
              Base Camp
            </Link>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/30 hover:text-gold transition-colors font-sans text-sm"
            >
              Instagram
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/30 hover:text-gold transition-colors font-sans text-sm"
            >
              TikTok
            </a>
            <a 
              href="#contact"
              className="text-white/30 hover:text-gold transition-colors font-sans text-sm"
            >
              Contact
            </a>
            <a 
              href="#privacy"
              className="text-white/30 hover:text-gold transition-colors font-sans text-sm"
            >
              Privacy
            </a>
          </nav>

          {/* Right: Copyright */}
          <div className="text-white/20 font-sans text-sm">
            © 2025 Wilder Moms · Est. 2025
          </div>
        </div>
      </div>
    </footer>
  )
}
