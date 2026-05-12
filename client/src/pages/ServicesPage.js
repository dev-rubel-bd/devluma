import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { RiCodeSSlashLine, RiSmartphoneLine, RiBarChartLine, RiSearchLine, RiPaletteLine, RiShieldCheckLine } from 'react-icons/ri';
import SEO from '../components/common/SEO';
import { SectionHeader } from '../components/common/UI';

const services = [
  {
    icon: RiCodeSSlashLine,
    title: 'Web Development',
    tagline: 'Pixel-perfect. Lightning-fast.',
    description: 'We build web applications that are visually stunning, technically sound, and optimized for conversion. From SPAs to complex enterprise platforms.',
    features: ['React / Next.js / Vue.js', 'Node.js & RESTful APIs', 'Database Design', 'Performance Optimization', 'Progressive Web Apps', 'CI/CD Deployment'],
    color: '#3b82f6',
  },
  {
    icon: RiSmartphoneLine,
    title: 'Mobile Development',
    tagline: 'Native performance. Cross-platform reach.',
    description: 'Beautiful mobile experiences that feel native on every device. We deliver apps that users love and that perform flawlessly in production.',
    features: ['React Native', 'Flutter', 'iOS & Android', 'App Store Optimization', 'Push Notifications', 'Offline Support'],
    color: '#8b5cf6',
  },
  {
    icon: RiBarChartLine,
    title: 'Digital Marketing',
    tagline: 'Data-driven growth.',
    description: 'Multi-channel campaigns that drive real results. We combine creativity with analytics to build strategies that actually move the needle.',
    features: ['PPC Advertising', 'Social Media Management', 'Email Automation', 'Conversion Rate Optimization', 'Analytics & Reporting', 'Growth Hacking'],
    color: '#f59e0b',
  },
  {
    icon: RiSearchLine,
    title: 'SEO Strategy',
    tagline: 'Rank higher. Grow faster.',
    description: 'Technical SEO, content strategy, and link building that deliver sustainable organic growth and keep you ahead of competitors.',
    features: ['Technical SEO Audit', 'Keyword Research', 'Content Strategy', 'Link Building', 'Local SEO', 'Core Web Vitals'],
    color: '#10b981',
  },
  {
    icon: RiPaletteLine,
    title: 'Brand & UI Design',
    tagline: 'First impressions that last.',
    description: 'Strategic design that communicates your brand\'s unique value and creates experiences users love to interact with.',
    features: ['Brand Identity', 'UI/UX Design', 'Design Systems', 'Prototype & Testing', 'Logo & Collateral', 'Motion Design'],
    color: '#ec4899',
  },
  {
    icon: RiShieldCheckLine,
    title: 'Consulting & Strategy',
    tagline: 'Navigate with confidence.',
    description: 'Technology consulting and digital strategy that aligns your digital investments with your business goals.',
    features: ['Digital Transformation', 'Technology Audit', 'Architecture Review', 'Team Training', 'Roadmap Planning', 'Fractional CTO'],
    color: '#06b6d4',
  },
];

export default function ServicesPage() {
  return (
    <>
      <SEO title="Services" description="Full-service digital agency offering web development, mobile apps, SEO, and digital marketing." keywords="web development, mobile apps, SEO, digital marketing, brand design" />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="orb w-72 h-72 bg-blue-600 top-0 left-0 opacity-10" />
        <div className="orb w-72 h-72 bg-purple-600 top-20 right-0 opacity-10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 text-blue-400 font-mono text-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-400" /> Our Services
            </span>
            <h1 className="heading-xl text-white mb-6">
              Everything You Need to <span className="gradient-text">Dominate Online</span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed">
              From concept to launch to growth — we've got every piece of your digital strategy covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(({ icon: Icon, title, tagline, description, features, color }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-8 card-hover group"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <Icon size={26} style={{ color }} />
                </div>
                <p className="font-mono text-xs mb-2" style={{ color }}>{tagline}</p>
                <h3 className="font-display font-semibold text-white text-xl mb-3 group-hover:text-blue-300 transition-colors">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{description}</p>
                <ul className="space-y-2">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-slate-300 text-sm">
                      <FiCheck size={14} style={{ color }} className="shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="heading-lg text-white mb-4">Not Sure Where to Start?</h2>
            <p className="text-slate-400 mb-8">Let's talk about your goals and figure out the best path forward together.</p>
            <Link to="/contact" className="btn-primary">
              Book a Free Consultation <FiArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
