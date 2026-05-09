import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import { RiCodeSSlashLine, RiSmartphoneLine, RiBarChartLine, RiSearchLine, RiStarFill } from 'react-icons/ri';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import SEO from '../components/common/SEO';
import { SectionHeader, CardSkeleton, Badge } from '../components/common/UI';
import { projectService, testimonialService } from '../services/api';

const services = [
  { icon: RiCodeSSlashLine, title: 'Web Development', desc: 'Scalable, performant web applications built with modern frameworks and best practices.', color: 'from-blue-500 to-cyan-500', tag: 'React • Node.js • Next.js' },
  { icon: RiSmartphoneLine, title: 'Mobile Apps', desc: 'Cross-platform mobile experiences with native performance and stunning interfaces.', color: 'from-purple-500 to-pink-500', tag: 'React Native • Flutter' },
  { icon: RiBarChartLine, title: 'Digital Marketing', desc: 'Data-driven campaigns that reach your audience and convert visitors into customers.', color: 'from-orange-500 to-red-500', tag: 'PPC • Social • Email' },
  { icon: RiSearchLine, title: 'SEO Strategy', desc: 'Dominate search rankings with technical SEO, content strategy, and link building.', color: 'from-emerald-500 to-teal-500', tag: 'On-page • Technical • Local' },
];

const stats = [
  { value: 150, label: 'Projects Delivered', suffix: '+' },
  { value: 98, label: 'Client Satisfaction', suffix: '%' },
  { value: 8, label: 'Years of Experience', suffix: '+' },
  { value: 40, label: 'Team Members', suffix: '+' },
];

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Orbs */}
      <div className="orb w-96 h-96 bg-blue-600 top-20 -left-20" />
      <div className="orb w-80 h-80 bg-purple-600 bottom-20 -right-20" />
      <div className="orb w-64 h-64 bg-cyan-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5" />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-300 font-mono">Available for new projects</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-xl text-white mb-6"
            >
              We Build{' '}
              <span className="gradient-text block">Digital Experiences</span>
              That Shine.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-xl leading-relaxed mb-8 max-w-lg"
            >
              Full-service digital agency crafting exceptional web & mobile products, 
              powered by cutting-edge technology and driven by results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/portfolio" className="btn-primary">
                View Our Work <FiArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline">
                <FiPlay size={14} /> Start a Project
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-emerald-500'].map((c, i) => (
                  <div key={i} className={`w-9 h-9 rounded-full ${c} flex items-center justify-center text-white text-xs font-bold border-2 border-dark-900`}>
                    {['A','B','C','D'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <RiStarFill key={i} size={12} className="text-yellow-400" />)}
                </div>
                <p className="text-slate-500 text-xs mt-0.5">Trusted by 100+ companies</p>
              </div>
            </motion.div>
          </div>

          {/* Right — animated visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="glass rounded-3xl p-8 glow-blue"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-slate-500 text-xs font-mono ml-2">devluma.app</span>
                </div>
                <div className="space-y-3">
                  {['const mission = "build great products";', 'const values = ["quality", "speed", "trust"];', 'const result = await deliver(excellence);'].map((line, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.2 }}
                      className="font-mono text-sm"
                    >
                      <span className="text-blue-400">{line.split(' ')[0]} </span>
                      <span className="text-slate-300">{line.split(' ').slice(1).join(' ')}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Floating badges */}
              {[
                { label: '✓ Delivered on Time', top: '10%', right: '-8%', delay: 0.8 },
                { label: '🚀 98% Satisfaction', bottom: '20%', left: '-10%', delay: 1 },
                { label: '⚡ Fast & Scalable', top: '55%', right: '-12%', delay: 1.2 },
              ].map(({ label, delay, ...pos }, i) => (
                <motion.div key={i}
                  style={{ position: 'absolute', ...pos }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay }}
                  className="glass px-4 py-2 rounded-xl text-sm text-white whitespace-nowrap shadow-lg"
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #020408)' }} />
    </section>
  );
}

function StatsSection() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  return (
    <section ref={ref} className="py-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass rounded-3xl p-10"
          style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.05), rgba(139,92,246,0.05))' }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label, suffix }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display font-extrabold text-4xl lg:text-5xl gradient-text mb-2">
                  {inView ? <CountUp end={value} duration={2.5} delay={i * 0.1} /> : '0'}{suffix}
                </div>
                <div className="text-slate-400 text-sm">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="What We Do"
          title="Services Built for Growth"
          subtitle="End-to-end digital solutions designed to elevate your brand and accelerate your business."
          center
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, title, desc, color, tag }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 card-hover group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br ${color} bg-opacity-20`}
                style={{ background: 'rgba(59,130,246,0.1)' }}>
                <div className={`bg-gradient-to-br ${color} bg-clip-text`}>
                  <Icon size={24} className="text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-3 group-hover:text-blue-300 transition-colors">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{desc}</p>
              <span className="font-mono text-xs text-slate-600">{tag}</span>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="btn-outline">
            All Services <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PortfolioPreview() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService.getAll({ featured: true, limit: 3 })
      .then(res => setProjects(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding" style={{ background: 'linear-gradient(180deg, transparent, rgba(13,22,40,0.5), transparent)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <SectionHeader badge="Featured Work" title="Projects We're Proud Of" />
          <Link to="/portfolio" className="hidden md:flex btn-outline text-sm">
            All Projects <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [...Array(3)].map((_, i) => <CardSkeleton key={i} />)
            : projects.map((project, i) => (
              <motion.div key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden card-hover group"
              >
                <div className="relative overflow-hidden h-48">
                  <img src={project.image} alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge color="blue">{project.category}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-white text-lg mb-2 group-hover:text-blue-300 transition-colors">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          }
        </div>
        <div className="text-center mt-8 md:hidden">
          <Link to="/portfolio" className="btn-outline">All Projects <FiArrowRight size={14} /></Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testimonialService.getAll()
      .then(res => setTestimonials(res.data.data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader badge="Testimonials" title="What Our Clients Say" center />
        <div className="grid md:grid-cols-3 gap-6">
          {loading
            ? [...Array(3)].map((_, i) => <CardSkeleton key={i} />)
            : testimonials.map((t, i) => (
              <motion.div key={t._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-7 card-hover"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating || 5)].map((_, j) => (
                    <RiStarFill key={j} size={14} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{t.name}</div>
                    <div className="text-slate-500 text-xs">{t.role}{t.company && `, ${t.company}`}</div>
                  </div>
                </div>
              </motion.div>
            ))
          }
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass rounded-3xl p-12 overflow-hidden"
        >
          <div className="orb w-64 h-64 bg-blue-500 top-0 left-0 opacity-10" />
          <div className="orb w-64 h-64 bg-purple-500 bottom-0 right-0 opacity-10" />
          <div className="relative z-10">
            <h2 className="heading-lg text-white mb-4">Ready to Build Something <span className="gradient-text">Extraordinary?</span></h2>
            <p className="text-slate-400 text-lg mb-8">Let's turn your vision into a reality that performs, scales, and impresses.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Start Your Project <FiArrowRight size={16} />
              </Link>
              <Link to="/portfolio" className="btn-outline">View Our Work</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <SEO />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <PortfolioPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
