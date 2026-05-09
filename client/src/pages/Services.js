import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiSmartphone, FiTrendingUp, FiSearch, FiCheckCircle, FiArrowRight, FiLayout } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } })
};

const services = [
  {
    icon: FiCode, color: 'from-blue-500 to-cyan-500', title: 'Web Development',
    desc: 'We build scalable, fast, and beautiful websites and web applications using the latest technologies.',
    features: ['React / Next.js / Vue', 'Node.js / Php backend', 'REST & GraphQL APIs', 'Database architecture', 'Performance optimization', 'Deployment & DevOps'],
    price: 'Starting at $2,500'
  },
  {
    icon: FiSmartphone, color: 'from-purple-500 to-pink-500', title: 'App Development',
    desc: 'Cross-platform and native mobile apps that deliver exceptional user experiences.',
    features: ['React Native / Flutter', 'iOS & Android', 'App Store deployment', 'Push notifications', 'Offline functionality', 'Analytics integration'],
    price: 'Starting at $500'
  },
   {
    icon: FiLayout, color: 'from-pink-500 to-rose-500', title: 'UI/UX Design',
    desc: 'Beautiful, intuitive designs that delight users and convert visitors into customers.',
    features: ['User research & personas', 'Wireframing & prototyping', 'Figma / Adobe XD design', 'Design system creation', 'Usability testing', 'Responsive & accessible UI'],
    price: 'Starting at $300'
  },
  {
    icon: FiTrendingUp, color: 'from-emerald-500 to-teal-500', title: 'Digital Marketing',
    desc: 'Data-driven marketing strategies that grow your brand and convert leads into customers.',
    features: ['Social media management', 'PPC advertising', 'Email campaigns', 'Content strategy', 'Analytics & reporting', 'Brand positioning'],
    price: 'Starting at $1,500/mo'
  },
  {
    icon: FiSearch, color: 'from-orange-500 to-amber-500', title: 'SEO Optimization',
    desc: 'Technical and content SEO that drives sustainable organic growth and real results.',
    features: ['Technical SEO audit', 'Keyword research', 'On-page optimization', 'Link building', 'Local SEO', 'Monthly reporting'],
    price: 'Starting at $800/mo'
  },
];

export default function Services() {
  return (
    <>
      <SEO title="Services" description="Web development, app development, digital marketing, and SEO services from Devluma." />
      <div className="pt-28 pb-20">
        {/* Hero */}
        <div className="relative text-center max-w-4xl mx-auto px-4 sm:px-6 mb-24">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
          <motion.span variants={fadeUp} initial="hidden" animate="visible"
            className="inline-block text-blue-400 font-mono text-sm uppercase tracking-widest mb-4"
          >
            What We Offer
          </motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="section-title text-black mb-6"
          >
            Services That Drive <span className="gradient-text">Real Results</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-xl text-slate-400 leading-relaxed"
          >
            End-to-end digital solutions tailored to your goals. We don't just deliver — we partner with you for growth.
          </motion.p>
        </div>

        {/* Service Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          {services.map(({ icon: Icon, color, title, desc, features, price }, i) => (
            <motion.div
              key={i}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              className="glass-card p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6`}>
                  <Icon size={26} className="text-white" />
                </div>
                <h2 className="font-display font-bold text-black text-2xl mb-4">{title}</h2>
                <p className="text-slate-400 leading-relaxed mb-6">{desc}</p>
                <div className="text-sm font-mono text-purple-400 mb-4">{price}</div>
                <Link to="/contact" className="btn-primary text-sm">
                  Get a Quote <FiArrowRight />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2.5 text-sm text-slate-400">
                    <FiCheckCircle className="text-green-400 shrink-0" size={15} />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center mt-24">
          <h2 className="section-title text-black mb-4">Not Sure Where to <span className="gradient-text">Start?</span></h2>
          <p className="text-slate-400 mb-8">Schedule a free 30-minute consultation and we'll map out the perfect solution for your business.</p>
          <Link to="/contact" className="btn-primary px-8 py-4">Book Free Consultation <FiArrowRight /></Link>
        </div>
      </div>
    </>
  );
}
