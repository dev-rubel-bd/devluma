import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { ArrowRight, Globe, Smartphone, TrendingUp, Search, Star, ChevronRight, Sparkles } from "lucide-react";
import { projectsAPI, testimonialsAPI } from "../services/api";
import SectionHeading from "../components/common/SectionHeading";
import LoadingSpinner from "../components/common/LoadingSpinner";

const services = [
  { icon: Globe, title: "Web Development", desc: "Blazing-fast, scalable web applications built with modern frameworks.", color: "from-blue-500 to-cyan-500" },
  { icon: Smartphone, title: "Mobile Apps", desc: "Cross-platform mobile experiences that delight users on every device.", color: "from-purple-500 to-pink-500" },
  { icon: TrendingUp, title: "Digital Marketing", desc: "Data-driven campaigns that grow your brand and maximize ROI.", color: "from-orange-500 to-red-500" },
  { icon: Search, title: "SEO Optimization", desc: "Rank higher, get found faster, and dominate your niche.", color: "from-green-500 to-emerald-500" },
];

const stats = [
  { value: "100+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "99%", label: "Client Satisfaction" },
];

function HeroParticle({ x, y, delay }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-brand-500"
      style={{ left: x, top: y }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
      transition={{ duration: 3, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [p, t] = await Promise.all([projectsAPI.getAll(), testimonialsAPI.getAll()]);
        setProjects(p.data.data.slice(0, 3));
        setTestimonials(t.data.data.slice(0, 3));
      } catch (e) {
        console.error(e);
      } finally { setLoading(false); }
    };
    fetch();
  }, []);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100 + "%", y: Math.random() * 100 + "%", delay: i * 0.3
  }));

  return (
    <>
      <Helmet>
        <title>Devluma — We Build Digital Experiences That Shine</title>
        <meta name="description" content="Devluma is a full-service digital agency building world-class websites, apps, and marketing campaigns." />
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        {particles.map((p, i) => <HeroParticle key={i} {...p} />)}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-sm font-medium mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Award-Winning Digital Agency
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium font-display leading-[1.05] mb-6"
          >
            We Build{" "}
            <span className="gradient-text glow-text">Digital</span>
            <br />
            <span className="gradient-text glow-text">Experiences</span>{" "}
            That Shine
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            From stunning websites to powerful mobile apps — we help ambitious brands dominate the digital landscape.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/contact" className="btn-primary text-base px-8 py-4 flex items-center gap-2 justify-center">
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/portfolio" className="btn-ghost text-base px-8 py-4 flex items-center gap-2 justify-center">
              View Our Work <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="glass rounded-2xl p-6 text-center">
                <div className="text-3xl font-semibold font-display gradient-text">{value}</div>
                <div className="text-sm text-slate-400 mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
        >
          <div className="w-5 h-8 border-2 border-slate-700 rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-brand-500 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Our Expertise" title="Services That" highlight="Drive Results" subtitle="We combine creativity with technical excellence to deliver digital solutions that move the needle." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Portfolio" title="Work That" highlight="Speaks Volumes" subtitle="A glimpse into projects we have built for ambitious clients around the world." />
          {loading ? <LoadingSpinner /> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {projects.map((project, i) => (
                <motion.div key={project._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="group glass rounded-2xl overflow-hidden hover:border-brand-500/30 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={project.image || "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80"} alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full bg-brand-500/80 text-white">{project.category}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-semibold mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-xs rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          <div className="text-center">
            <Link to="/portfolio" className="btn-ghost inline-flex items-center gap-2">View All Projects <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-900/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeading badge="Testimonials" title="What Our" highlight="Clients Say" />
          {loading ? <LoadingSpinner /> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div key={t._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="card"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating || 5 }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{t.review}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-semibold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{t.name}</div>
                      <div className="text-slate-500 text-xs">{t.role} {t.company && `@ ${t.company}`}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="relative glass rounded-3xl p-12 md:p-16 overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-brand-500 to-accent-500 rounded-full" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-600/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-600/20 rounded-full blur-3xl" />
            <h2 className="section-heading text-white mb-4 relative">
              Ready to Build Something <span className="gradient-text">Remarkable?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 relative">
              Let&apos;s turn your vision into a high-performing digital product.
            </p>
            <Link to="/contact" className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2">
              Let&apos;s Talk <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
