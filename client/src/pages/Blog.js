import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiTag, FiBookOpen } from 'react-icons/fi';
import SEO from '../components/common/SEO';
import { blogsAPI } from '../services/api';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i=0) => ({ opacity: 1, y: 0, transition: { delay: i*0.07, duration: 0.5 } }) };

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogsAPI.getAll({ published: true }).then(r => setPosts(r.data || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="Blog" description="Insights, tutorials, and digital trends from the Devluma team." />
      <div className="pt-28 pb-20">
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 mb-16">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-cyan-400 font-mono text-sm uppercase tracking-widest">Insights</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="section-title text-black mt-3 mb-4">
            The Devluma <span className="gradient-text">Blog</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-400 text-lg">
            Tutorials, case studies, and thoughts on the digital world.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="glass-card h-64 animate-pulse" />)}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <FiBookOpen size={48} className="mx-auto mb-4 opacity-30" />
              <p>No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.article
                  key={post._id}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  whileHover={{ y: -6 }}
                  className="glass-card overflow-hidden group cursor-pointer"
                >
                  <div className="h-44 bg-gradient-to-br from-blue-900/30 to-purple-900/30 relative overflow-hidden">
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiBookOpen size={40} className="text-slate-700" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    {post.tags?.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {post.tags.slice(0, 2).map(t => (
                          <span key={t} className="flex items-center gap-1 text-xs text-purple-400">
                            <FiTag size={10} />{t}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="font-display font-semibold text-black mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">{post.title}</h2>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <span className="flex items-center gap-1"><FiUser size={11} />{post.author}</span>
                      <span className="flex items-center gap-1"><FiCalendar size={11} />{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
