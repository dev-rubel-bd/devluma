import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFolder, FiFileText, FiStar, FiMessageSquare, FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';
import { projectsAPI, blogsAPI, testimonialsAPI, contactAPI } from '../../services/api';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i=0) => ({ opacity: 1, y: 0, transition: { delay: i*0.08, duration: 0.5 } }) };

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, blogs: 0, testimonials: 0, messages: 0, unread: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      projectsAPI.getAll(),
      blogsAPI.getAll(),
      testimonialsAPI.getAll(),
      contactAPI.getAll(),
    ]).then(([p, b, t, m]) => {
      const msgs = m.value?.data || [];
      setStats({
        projects: p.value?.count || 0,
        blogs: b.value?.count || 0,
        testimonials: t.value?.count || 0,
        messages: msgs.length,
        unread: msgs.filter(x => !x.read).length,
      });
    }).finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Projects', value: stats.projects, icon: FiFolder, to: '/admin/projects', color: 'from-blue-500 to-cyan-500' },
    { label: 'Blog Posts', value: stats.blogs, icon: FiFileText, to: '/admin/blogs', color: 'from-purple-500 to-pink-500' },
    { label: 'Testimonials', value: stats.testimonials, icon: FiStar, to: '/admin/testimonials', color: 'from-emerald-500 to-teal-500' },
    { label: 'Messages', value: stats.messages, icon: FiMessageSquare, to: '/admin/messages', badge: stats.unread, color: 'from-orange-500 to-amber-500' },
  ];

  return (
    <AdminLayout title="Dashboard">
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-white">Welcome back 👋</h2>
        <p className="text-slate-500 mt-1">Here's an overview of your Devluma content.</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map(({ label, value, icon: Icon, to, badge, color }, i) => (
          <motion.div key={label} variants={fadeUp} initial="hidden" animate="visible" custom={i}>
            <Link to={to} className="glass-card p-5 block hover:border-purple-500/30 transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                  <Icon size={18} className="text-white" />
                </div>
                {badge > 0 && (
                  <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">{badge} new</span>
                )}
              </div>
              {loading ? (
                <div className="h-8 w-16 bg-white/10 rounded animate-pulse mb-1" />
              ) : (
                <div className="text-3xl font-display font-bold text-white">{value}</div>
              )}
              <div className="text-slate-500 text-sm mt-0.5 flex items-center gap-1 group-hover:text-white transition-colors">
                {label} <FiArrowRight size={12} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
        <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
          <FiTrendingUp className="text-purple-400" /> Quick Actions
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { to: '/admin/projects', label: 'Add New Project', icon: FiFolder },
            { to: '/admin/blogs', label: 'Write Blog Post', icon: FiFileText },
            { to: '/admin/testimonials', label: 'Add Testimonial', icon: FiStar },
          ].map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to}
              className="glass-card p-4 flex items-center gap-3 hover:border-purple-500/30 transition-colors group text-slate-400 hover:text-white"
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{label}</span>
              <FiArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </motion.div>
    </AdminLayout>
  );
}
