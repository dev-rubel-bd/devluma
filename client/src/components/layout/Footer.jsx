import { Link } from "react-router-dom";
import { Zap, Twitter, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-brand-500/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold font-display gradient-text">Devluma</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              We craft digital experiences that captivate, convert, and endure. Your vision, our expertise.
            </p>
            <div className="flex gap-4 mt-6">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-brand-400 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {["Web Development","Mobile Apps","SEO Optimization","Digital Marketing","UI/UX Design"].map((s) => (
                <li key={s}><Link to="/services" className="hover:text-brand-400 transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {[["About","/about"],["Portfolio","/portfolio"],["Blog","/blog"],["Contact","/contact"]].map(([label,href]) => (
                <li key={label}><Link to={href} className="hover:text-brand-400 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-dark-400 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Devluma. All rights reserved.</p>
          <p>Built with passion &amp; precision ✦</p>
        </div>
      </div>
    </footer>
  );
}
