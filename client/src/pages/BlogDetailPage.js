import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiEye, FiArrowLeft } from 'react-icons/fi';
import SEO from '../components/common/SEO';
import { Skeleton, Badge } from '../components/common/UI';
import { blogService } from '../services/api';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    blogService.getOne(id)
      .then(res => setBlog(res.data.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen pt-28 max-w-4xl mx-auto px-6 py-16">
      <Skeleton className="h-8 w-3/4 mb-4" />
      <Skeleton className="h-5 w-1/2 mb-8" />
      <Skeleton className="h-64 rounded-2xl mb-8" />
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
      </div>
    </div>
  );

  if (error || !blog) return (
    <div className="min-h-screen pt-28 flex items-center justify-center text-center">
      <div>
        <h2 className="text-white text-2xl mb-4">Post not found</h2>
        <Link to="/blog" className="btn-outline">Back to Blog</Link>
      </div>
    </div>
  );

  return (
    <>
      <SEO title={blog.title} description={blog.excerpt} image={blog.image} />
      <article className="min-h-screen pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
              <FiArrowLeft size={14} /> Back to Blog
            </Link>

            <div className="mb-6 flex items-center gap-3">
              <Badge color="blue">{blog.category}</Badge>
              <span className="text-slate-500 text-sm flex items-center gap-1"><FiClock size={12} /> {blog.readTime} min read</span>
              <span className="text-slate-500 text-sm flex items-center gap-1"><FiEye size={12} /> {blog.views} views</span>
            </div>

            <h1 className="heading-lg text-white mb-6">{blog.title}</h1>

            <div className="flex items-center gap-3 mb-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}>
                {blog.author?.name?.[0] || 'D'}
              </div>
              <div>
                <div className="text-white text-sm font-medium">{blog.author?.name || 'Devluma Team'}</div>
                <div className="text-slate-500 text-xs">{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden mb-10">
              <img src={blog.image} alt={blog.title} className="w-full h-64 md:h-80 object-cover" />
            </div>

            <div className="prose text-slate-300 leading-relaxed text-lg"
              style={{ lineHeight: '1.8' }}>
              {blog.content.split('\n').map((para, i) => (
                para.trim() ? <p key={i} className="mb-5 text-slate-300">{para}</p> : null
              ))}
            </div>

            {blog.tags?.length > 0 && (
              <div className="mt-10 pt-8 flex flex-wrap gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {blog.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
            )}
          </motion.div>
        </div>
      </article>
    </>
  );
}
