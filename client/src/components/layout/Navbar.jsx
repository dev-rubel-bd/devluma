import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-dark-900/90 backdrop-blur-xl border-b border-brand-500/10" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold font-display gradient-text">Devluma</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${location.pathname === link.href ? "text-brand-400 bg-brand-500/10" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
              >{link.label}</Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/admin/login" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Admin</Link>
            <Link to="/contact" className="btn-primary text-sm py-2.5">Get Started</Link>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-400 hover:text-white">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-800/95 backdrop-blur-xl border-b border-brand-500/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${location.pathname === link.href ? "text-brand-400 bg-brand-500/10" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                >{link.label}</Link>
              ))}
              <div className="pt-2"><Link to="/contact" className="btn-primary block text-center text-sm">Get Started</Link></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
