import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Calendar, User, Tag } from "lucide-react";
import { blogsAPI } from "../services/api";
import SectionHeading from "../components/common/SectionHeading";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogsAPI.getAll().then(({ data }) => {
      setBlogs(data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog — Devluma Digital Agency</title>
        <meta name="description" content="Insights, tutorials, and industry trends from the Devluma team." />
      </Helmet>

      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Our Blog" title="Insights &" highlight="Expertise" subtitle="Stay ahead of the curve with our latest articles on web development, design, and digital strategy." />

          {loading ? <LoadingSpinner /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, i) => (
                <motion.article key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group glass rounded-2xl overflow-hidden hover:border-brand-500/30 transition-all duration-300"
                >
                  {blog.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img src={blog.image} alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="flex items-center gap-1 px-2 py-0.5 text-xs rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                          <Tag className="w-3 h-3" />{tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-white font-semibold text-lg mb-3 leading-snug group-hover:text-brand-400 transition-colors">{blog.title}</h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">{blog.excerpt || blog.content.slice(0, 120) + "..."}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-dark-400 pt-4">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{blog.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {!loading && blogs.length === 0 && (
            <div className="text-center py-20 text-slate-500">No blog posts yet. Check back soon!</div>
          )}
        </div>
      </div>
    </>
  );
}
