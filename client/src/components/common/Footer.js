import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTwitter, FiLinkedin, FiGithub, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const links = {
  Company: [
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Services' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/blog', label: 'Blog' },
  ],
  Services: [
    { to: '/services', label: 'Web Development' },
    { to: '/services', label: 'App Development' },
    { to: '/services', label: 'Digital Marketing' },
    { to: '/services', label: 'SEO Services' },
  ],
};

const socials = [
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FiGithub, href: '#', label: 'GitHub' },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
];

const contacts = [
  { icon: FiMail, text: 'devlumabd@gmail.com' },
  { icon: FiPhone, text: '+880 1760700289' },
  { icon: FiMapPin, text: 'Rangpur, Bangladesh' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-indigo-100 bg-indigo-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-9 h-9 rounded-xl overflow-hidden ring-2 ring-indigo-200 group-hover:ring-indigo-400 transition-all shadow-sm">
                <img src="/logo.png" alt="Devluma" className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-bold text-xl text-gray-900">
                dev<span className="gradient-text">luma</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              We build digital experiences that shine. Your vision, crafted to perfection.
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  className="w-9 h-9 rounded-lg bg-white border border-indigo-100 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-sm"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-display font-semibold text-indigo-800 mb-5 text-xs uppercase tracking-widest">
                {section}
              </h4>
              <ul className="space-y-3">
                {items.map(({ to, label }) => (
                  <li key={label}>
                    <Link to={to} className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-indigo-800 mb-5 text-xs uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-3">
              {contacts.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-sm text-gray-500">
                  <Icon size={14} className="text-indigo-500 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-indigo-100 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Devluma. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <button className="hover:text-indigo-600 transition-colors">Privacy Policy</button>
            <button className="hover:text-indigo-600 transition-colors">Terms of Service</button>
            <Link to="/admin/login" className="hover:text-indigo-600 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
