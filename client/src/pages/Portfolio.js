import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiExternalLink, FiGithub } from 'react-icons/fi';
import SEO from '../components/common/SEO';
import { projectsAPI } from '../services/api';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i=0) => ({ opacity: 1, y: 0, transition: { delay: i*0.05, duration: 0.5, ease: 'easeOut' } }) };
const categories = ['All', 'Web', 'App', 'Marketing', 'SEO'];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [active, setActive] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectsAPI.getAll()
      .then(r => { setProjects(r.data || []); setFiltered(r.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(active === 'All' ? projects : projects.filter(p => p.category === active));
  }, [active, projects]);

  return (
    <>
      <SEO title="Portfolio" description="Explore our portfolio of web, app, and marketing projects." />
      <div className="pt-28 pb-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 mb-16">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-purple-400 font-mono text-sm uppercase tracking-widest">Portfolio</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="section-title text-black mt-3 mb-4">
            Our <span className="gradient-text">Work</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg">
            Projects we're proud of. Every pixel crafted with purpose.
          </motion.p>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-2 px-4 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-black'
                  : 'glass-card text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card h-72 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <FiCode size={48} className="mx-auto mb-4 opacity-30" />
              <p>No projects found{active !== 'All' ? ` in ${active}` : ''}.</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p, i) => (
                  <motion.div
                    key={p._id} layout
                    variants={fadeUp} initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.9 }} custom={i}
                    whileHover={{ y: -6 }}
                    className="glass-card overflow-hidden group"
                  >
                    <div className="h-52 bg-gradient-to-br from-blue-900/30 to-purple-900/30 relative overflow-hidden">
                      {p.image ? (
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiCode size={48} className="text-slate-700" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 gap-2">
                        {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 glass-card rounded-lg flex items-center justify-center text-white hover:text-blue-400"><FiExternalLink size={16} /></a>}
                        {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 glass-card rounded-lg flex items-center justify-center text-white hover:text-purple-400"><FiGithub size={16} /></a>}
                      </div>
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/20">
                        {p.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-semibold text-black mb-2">{p.title}</h3>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4">{p.description}</p>
                      {p.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {p.technologies.slice(0, 4).map(t => (
                            <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-slate-400">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
}
