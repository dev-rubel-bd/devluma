import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGrid, FiFolder, FiFileText, FiMessageSquare, FiStar, FiLogOut, FiMenu, FiHome } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FiFolder },
  { to: '/admin/blogs', label: 'Blog Posts', icon: FiFileText },
  { to: '/admin/testimonials', label: 'Testimonials', icon: FiStar },
  { to: '/admin/messages', label: 'Messages', icon: FiMessageSquare },
];

export default function AdminLayout({ children, title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/');
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-white/5 flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">D</div>
        <span className="font-display font-bold text-white">dev<span className="gradient-text">luma</span></span>
        <span className="text-xs text-slate-600 ml-1">admin</span>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-purple-500/20' : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <Icon size={17} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.[0] || 'A'}
          </div>
          <div>
            <div className="text-white text-xs font-medium">{user?.name}</div>
            <div className="text-slate-600 text-xs">{user?.role}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <NavLink to="/" className="flex-1 flex items-center justify-center gap-2 text-xs text-slate-500 hover:text-white py-2 rounded-lg hover:bg-white/5 transition-colors">
            <FiHome size={14} /> Site
          </NavLink>
          <button onClick={handleLogout} className="flex-1 flex items-center justify-center gap-2 text-xs text-slate-500 hover:text-red-400 py-2 rounded-lg hover:bg-red-500/5 transition-colors">
            <FiLogOut size={14} /> Logout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-dark-950">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 border-r border-white/5 bg-dark-900/80 backdrop-blur-xl fixed h-full z-30">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden" />
            <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 h-full w-60 border-r border-white/5 bg-dark-900 z-50 md:hidden"
            >
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 md:ml-60">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-dark-950/90 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-slate-400 hover:text-white">
              <FiMenu size={20} />
            </button>
            <h1 className="font-display font-semibold text-white text-lg">{title}</h1>
          </div>
        </header>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
