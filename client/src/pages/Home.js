import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiCode, FiSmartphone, FiTrendingUp, FiSearch,
  FiStar, FiCheck, FiZap, FiShield, FiGlobe, FiLayout
} from 'react-icons/fi';
import SEO from '../components/common/SEO';
import { projectsAPI, testimonialsAPI } from '../services/api';
import { FiHeart, FiTarget, FiUsers } from 'react-icons/fi';


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  })
};

const services = [
  { icon: FiCode,       title: 'Web Development',  desc: 'Blazing-fast, pixel-perfect websites built with modern frameworks.', color: 'from-[#1e1b72] to-[#4f46e5]' },
  { icon: FiSmartphone, title: 'App Development',   desc: 'Native & cross-platform apps users love, on every device.',          color: 'from-[#312e81] to-[#6366f1]' },
  { icon: FiLayout,     title: 'UI/UX Design',      desc: 'Beautiful, intuitive designs that delight users and drive conversions.', color: 'from-[#be185d] to-[#f43f5e]' },
  { icon: FiTrendingUp, title: 'Digital Marketing', desc: 'Data-driven campaigns that convert visitors into loyal customers.',   color: 'from-[#1e1b72] to-[#4338ca]' },
  { icon: FiSearch,     title: 'SEO Optimization',  desc: 'Technical SEO that drives real, sustainable organic growth.',        color: 'from-[#2d2a9e] to-[#818cf8]' },
  
];

const stats = [
  { value: '100+', label: 'Projects Shipped' },
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '5+',   label: 'Years Experience' },
  { value: '10+',  label: 'Team Members' },
];

const features = [
  { icon: FiZap,    title: 'Lightning Fast',   desc: 'Optimized for speed and performance from day one.' },
  { icon: FiShield, title: 'Secure by Design', desc: 'Security baked in at every layer of your product.' },
  { icon: FiGlobe,  title: 'Global Reach',     desc: 'Built to scale across regions, devices, and languages.' },
];

export default function Home() {
  const [projects, setProjects]         = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    projectsAPI.getAll({ featured: true }).then(r => setProjects(r.data?.slice(0, 3) || [])).catch(() => {});
    testimonialsAPI.getAll({ featured: true }).then(r => setTestimonials(r.data?.slice(0, 3) || [])).catch(() => {});
  }, []);

  return (
    <>
      <SEO title="Digital Agency" description="Devluma — We build digital experiences that shine." />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white grid-bg">
        {/* Soft ambient blobs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-100/60 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-50/80 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {/* Big logo in hero */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-indigo-200/50 blur-xl" />
              {/* <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-indigo-200 shadow-2xl shadow-indigo-200/60">
                <img src="/logo.png" alt="Devluma" className="w-full h-full object-cover" />
              </div> */}
            </div>
          </motion.div>

          {/* Pill */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 text-sm text-indigo-600 font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Crafting the future of digital — since 2021
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="section-title text-gray-900 mb-10 mt-5 max-w-3xl mx-auto"
          >
            We Build Digital{' '}
            <span className="gradient-text">Experiences</span>
            <br />
            That Truly{' '}
            <span className="relative inline-block">
              Shine
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M0 6 Q100 0 200 6" stroke="url(#u1)" strokeWidth="2.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="u1" x1="0" y1="0" x2="200" y2="0">
                    <stop stopColor="#1e1b72" /><stop offset="1" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            From concept to launch, we craft high-performance digital products that captivate audiences and drive measurable results.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/portfolio" className="btn-primary text-base px-8 py-4">View Our Work <FiArrowRight /></Link>
            <Link to="/contact" className="btn-outline text-base px-8 py-4">Start a Project</Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-20"
          >
            {stats.map(({ value, label }, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }}
                className="bg-white border border-indigo-100 rounded-2xl p-4 text-center shadow-sm shadow-indigo-50"
              >
                <div className="gradient-text font-display font-bold text-3xl">{value}</div>
                <div className="text-gray-400 text-xs mt-1">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-28 px-4 sm:px-6 bg-indigo-50/40 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="badge-navy">What We Do</span>
            <h2 className="section-title text-gray-900 mt-4">Services Built for <span className="gradient-text">Growth</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                whileHover={{ y: -8 }}
                className="bg-white border border-indigo-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:shadow-indigo-100/60 transition-all cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-md`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-display font-semibold text-gray-900 text-lg mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="flex items-start gap-4 p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1e1b72] to-[#4f46e5] flex items-center justify-center shrink-0 shadow-md">
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
            {/* ── ABOUT ── */}
      <section className="py-28 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Intro */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="badge-navy">About Us</span>
            <h2 className="section-title text-gray-900 mt-4 mb-4">
              We Are <span className="gradient-text">Devluma</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              A team of designers, engineers, and strategists obsessed with building digital
              products that make an impact. Founded in 2016, we've helped 100+ businesses thrive online.
            </p>
          </motion.div>

          {/* Values */}
          <div className="mb-20">
            <motion.h3 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="section-title text-gray-900 text-center mb-12"
            >
              Our <span className="gradient-text">Values</span>
            </motion.h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: FiHeart,  title: 'Client-First',   desc: 'Every decision is made with your success in mind. Your goals are our goals.' },
                { icon: FiZap,   title: 'Speed & Quality', desc: 'We ship fast without cutting corners. Velocity and excellence, together.' },
                { icon: FiTarget, title: 'Results Driven',  desc: 'Measurable outcomes, not just deliverables. We track what matters.' },
                { icon: FiUsers,  title: 'Collaboration',   desc: "You're a partner, not a client. We build alongside you, not just for you." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e1b72] to-[#4f46e5] flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <motion.h3 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="section-title text-gray-900 text-center mb-3"
            >
              Meet the <span className="gradient-text">Team</span>
            </motion.h3>
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
              className="text-gray-400 text-center mb-12"
            >
              The humans behind the magic.
            </motion.p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Rubel Hasan',    role: 'CEO & Founder',                      gradient: 'from-blue-500 to-cyan-500',    image: '/team/rubel.jpg' },
                { name: 'Ziya Ul Haque',  role: 'CTO & Co-Founder',                   gradient: 'from-purple-500 to-pink-500',  image: '/team/ziya.jpg' },
                { name: 'Mia Santos',     role: 'Project Manager',                     gradient: 'from-rose-500 to-pink-500',    image: '/team/mia.jpg' },
                { name: 'Rakib Hossain', role: 'Senior UX/UI Designer',               gradient: 'from-emerald-500 to-teal-500', image: '' },
                { name: 'Jannatul Priya',    role: 'Marketing Director',                  gradient: 'from-orange-500 to-amber-500', image: '' },
                { name: 'Md Mosur Alom',      role: 'Frontend Lead',                       gradient: 'from-blue-400 to-indigo-500',  image: '/team/tom.jpg' },
               ].map(({ name, role, gradient, image }, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  whileHover={{ y: -6 }}
                  className="bg-gradient-to-br from-[#4742cb] to-[#231e85] border border-indigo-900 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-40 h-40 mt-5  rounded-2xl mx-auto mb-4 overflow-hidden">
                  {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                      ) : (
                 <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-2xl font-display`}>
                 {name[0]}
                 </div>
                     )}
                    </div>
                  <h3 className="font-display font-semibold text-white text-lg">{name}</h3>
                  <p className="text-gray-300 text-sm mt-1">{role}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
      {/* ── PORTFOLIO PREVIEW ── */}
      {projects.length > 0 && (
        <section className="py-28 px-4 sm:px-6 bg-indigo-50/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="badge-navy">Our Work</span>
                <h2 className="section-title text-gray-900 mt-3">Featured <span className="gradient-text">Projects</span></h2>
              </div>
              <Link to="/portfolio" className="btn-outline hidden md:flex">View All <FiArrowRight /></Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <motion.div key={p._id} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  whileHover={{ y: -6 }}
                  className="bg-white border border-indigo-100 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg hover:shadow-indigo-100/50 transition-all"
                >
                  <div className="h-48 bg-gradient-to-br from-indigo-100 to-indigo-50 relative">
                    {p.image
                      ? <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      : <div className="w-full h-full flex items-center justify-center"><FiCode size={40} className="text-indigo-300" /></div>
                    }
                    <span className="absolute top-3 left-3 badge-navy">{p.category}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-gray-900 mb-2">{p.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{p.description}</p>
                    {p.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {p.technologies.slice(0, 3).map(t => (
                          <span key={t} className="text-xs px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ── */}
      {testimonials.length > 0 && (
        <section className="py-28 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
              <span className="badge-navy">Testimonials</span>
              <h2 className="section-title text-gray-900 mt-4">What Clients <span className="gradient-text">Say</span></h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div key={t._id} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating || 5)].map((_, j) => (
                      <FiStar key={j} className="text-indigo-500 fill-indigo-500" size={14} />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">"{t.review}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e1b72] to-[#6366f1] flex items-center justify-center text-white font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{t.name}</div>
                      <div className="text-gray-400 text-xs">{t.role}{t.company ? ` · ${t.company}` : ''}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-28 px-4 sm:px-6 bg-indigo-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-white border border-indigo-100 rounded-3xl p-12 relative overflow-hidden shadow-xl shadow-indigo-100/40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 to-white pointer-events-none rounded-3xl" />
            <div className="relative">
              <div className="flex justify-center mb-6">
                {/* <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-indigo-200 shadow-lg shadow-indigo-200/50">
                  <img src="/logo.png" alt="Devluma" className="w-full h-full object-cover" />
                </div> */}
              </div>
              <h2 className="section-title text-gray-900 mb-4">
                Ready to Build Something <span className="gradient-text">Extraordinary?</span>
              </h2>
              <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
                Let's turn your vision into a digital product that stands out.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                {['Free consultation', 'No commitment', 'Fast turnaround'].map(item => (
                  <span key={item} className="flex items-center gap-2 text-sm text-gray-500">
                    <FiCheck className="text-indigo-500" size={14} /> {item}
                  </span>
                ))}
              </div>
              <Link to="/contact" className="btn-primary text-base px-10 py-4">
                Start Your Project <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
