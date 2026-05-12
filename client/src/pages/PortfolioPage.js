import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import SEO from '../components/common/SEO';
import { SectionHeader, CardSkeleton, Badge } from '../components/common/UI';
import { projectService } from '../services/api';

const categories = ['All', 'Web', 'App', 'Marketing', 'SEO', 'Design'];

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService.getAll()
      .then(res => {
        setProjects(res.data.data);
        setFiltered(res.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (cat) => {
    setActiveCategory(cat);
    setFiltered(cat === 'All' ? projects : projects.filter(p => p.category === cat));
  };

  return (
    <>
      <SEO title="Portfolio" description="Explore our portfolio of web, mobile, and digital marketing projects." />
      <div className="min-h-screen pt-28 section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            badge="Our Work"
            title="Projects That Make an Impact"
            subtitle="A curated showcase of digital products and campaigns we've built for ambitious clients."
            center
          />

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map(cat => (
              <button key={cat} onClick={() => handleFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'text-white glow-blue'
                    : 'text-slate-400 hover:text-white'
                }`}
                style={{
                  background: activeCategory === cat ? 'linear-gradient(135deg, #3b82f6, #7c3aed)' : 'rgba(255,255,255,0.04)',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? 'transparent' : 'rgba(255,255,255,0.08)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? [...Array(6)].map((_, i) => <CardSkeleton key={i} />)
              : (
                <AnimatePresence mode="popLayout">
                  {filtered.map((project, i) => (
                    <motion.div key={project._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="glass rounded-2xl overflow-hidden card-hover group"
                    >
                      <div className="relative overflow-hidden h-52">
                        <img src={project.image} alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <Badge color="blue">{project.category}</Badge>
                          {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer"
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                              style={{ background: 'rgba(255,255,255,0.1)' }}>
                              <FiExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="p-6">
                        {project.client && <div className="text-blue-400 font-mono text-xs mb-2">{project.client}</div>}
                        <h3 className="font-display font-semibold text-white text-xl mb-3 group-hover:text-blue-300 transition-colors">{project.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags?.slice(0, 4).map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )
            }
          </div>

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
