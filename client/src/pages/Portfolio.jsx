import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ExternalLink, Github } from "lucide-react";
import { projectsAPI } from "../services/api";
import SectionHeading from "../components/common/SectionHeading";
import LoadingSpinner from "../components/common/LoadingSpinner";

const categories = ["All", "Web", "App", "Marketing", "SEO"];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [active, setActive] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectsAPI.getAll().then(({ data }) => {
      setProjects(data.data);
      setFiltered(data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(active === "All" ? projects : projects.filter(p => p.category === active));
  }, [active, projects]);

  return (
    <>
      <Helmet>
        <title>Portfolio — Devluma Digital Agency</title>
        <meta name="description" content="Browse our portfolio of web development, mobile apps, and digital marketing projects." />
      </Helmet>

      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Our Work" title="Projects We'" highlight="re Proud Of" subtitle="A curated selection of work that showcases our technical skill and creative vision." />

          {/* Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active === cat ? "bg-gradient-to-r from-brand-600 to-accent-600 text-white shadow-lg shadow-brand-500/25" : "glass text-slate-400 hover:text-white hover:border-brand-500/30"
                }`}
              >{cat}</button>
            ))}
          </div>

          {loading ? <LoadingSpinner /> : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map((project) => (
                  <motion.div key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group glass rounded-2xl overflow-hidden hover:border-brand-500/30 transition-all duration-300"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img src={project.image || "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80"}
                        alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer"
                            className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-brand-500 transition-colors">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noreferrer"
                            className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-brand-500 transition-colors">
                            <Github className="w-4 h-4 text-white" />
                          </a>
                        )}
                      </div>
                      <span className="absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full bg-brand-500/80 text-white">{project.category}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-white font-semibold text-lg mb-2">{project.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags?.slice(0, 4).map(tag => (
                          <span key={tag} className="px-2 py-0.5 text-xs rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-slate-500">No projects found in this category.</div>
          )}
        </div>
      </div>
    </>
  );
}
