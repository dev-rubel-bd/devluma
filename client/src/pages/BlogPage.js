import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiEye, FiArrowRight } from 'react-icons/fi';
import SEO from '../components/common/SEO';
import { SectionHeader, CardSkeleton, Badge } from '../components/common/UI';
import { blogService } from '../services/api';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Development', 'Design', 'Marketing', 'SEO', 'Business', 'Tech'];

  useEffect(() => {
    const params = activeCategory !== 'All' ? { category: activeCategory } : {};
    blogService.getAll(params)
      .then(res => setBlogs(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleCategory = (cat) => {
    setLoading(true);
    setActiveCategory(cat);
  };

  return (
    <>
      <SEO title="Blog" description="Insights on web development, design, digital marketing and SEO from the Devluma team." />
      <div className="min-h-screen pt-28 section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge="Insights" title="The Devluma Blog" subtitle="Practical advice on development, design, SEO and growth from our team of experts." center />

          {/* Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map(cat => (
              <button key={cat} onClick={() => handleCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat ? 'text-white' : 'text-slate-400 hover:text-white'
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? [...Array(6)].map((_, i) => <CardSkeleton key={i} />)
              : blogs.map((blog, i) => (
                <motion.div key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-2xl overflow-hidden card-hover group"
                >
                  <div className="relative overflow-hidden h-48">
                    <img src={blog.image} alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4"><Badge color="blue">{blog.category}</Badge></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-slate-500 text-xs mb-3">
                      <span className="flex items-center gap-1"><FiClock size={12} /> {blog.readTime} min read</span>
                      <span className="flex items-center gap-1"><FiEye size={12} /> {blog.views} views</span>
                    </div>
                    <h3 className="font-display font-semibold text-white text-lg mb-3 leading-snug group-hover:text-blue-300 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{blog.excerpt}</p>
                    <Link to={`/blog/${blog._id}`}
                      className="inline-flex items-center gap-2 text-blue-400 text-sm hover:text-blue-300 transition-colors">
                      Read more <FiArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))
            }
          </div>

          {!loading && blogs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500">No posts found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
