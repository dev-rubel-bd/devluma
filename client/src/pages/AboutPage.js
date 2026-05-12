import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiZap, FiHeart } from 'react-icons/fi';
import SEO from '../components/common/SEO';
import { SectionHeader } from '../components/common/UI';

const team = [
                { name: 'Rubel Hasan',    role: 'CEO & Founder',                      gradient: 'from-blue-500 to-cyan-500',    image: '/client/public/team/rubel.jpg' },
                { name: 'Ziya Ul Haque',  role: 'CTO & Co-Founder',                   gradient: 'from-purple-500 to-pink-500',  image: '/team/ziya.jpg' },
                { name: 'Mia Santos',     role: 'Project Manager',                     gradient: 'from-rose-500 to-pink-500',    image: '/team/mia.jpg' },
                { name: 'Rakib Hossain', role: 'Senior UX/UI Designer',               gradient: 'from-emerald-500 to-teal-500', image: '/team/marcus.jpg' },
                { name: 'Jannatul Priya',    role: 'Marketing Director',                  gradient: 'from-orange-500 to-amber-500', image: '/team/priya.jpg' },
                { name: 'Md Mosur Alom',      role: 'Frontend Lead',                       gradient: 'from-blue-400 to-indigo-500',  image: '/team/tom.jpg' },
];


const values = [
  { icon: FiTarget, title: 'Precision', desc: 'We obsess over the details that make the difference between good and great.' },
  { icon: FiZap, title: 'Speed', desc: 'We move fast without sacrificing quality, keeping your projects on track.' },
  { icon: FiHeart, title: 'Partnership', desc: "We treat every client's goals as our own — your success is our success." },
];

export default function AboutPage() {
  return (
    <>
      <SEO title="About Us" description="Learn about Devluma — the digital agency behind 100+ successful products." />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="orb w-96 h-96 bg-blue-600 -top-20 -left-20" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
            <span className="inline-flex items-center gap-2 text-blue-400 font-mono text-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-400" /> About Devluma
            </span>
            <h1 className="heading-xl text-black mb-6">We're the Team Behind <span className="gradient-text">Your Digital Success</span></h1>
            <p className="text-slate-400 text-xl leading-relaxed max-w-3xl mx-auto">
              Founded in 2016, Devluma has grown from a small boutique studio into a full-service digital agency trusted by startups, scale-ups, and enterprise clients worldwide. We believe great digital products change businesses — and we're on a mission to build them.
            </p>
          </motion.div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  <Icon size={22} className="text-blue-400" />
                </div>
                <h3 className="font-display font-semibold text-black text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge="The Team" title="Meet the People Behind the Magic" center />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map(({ name, role, bio, gradient }, i) => (
              <motion.div key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-6 card-hover group text-center"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-4 text-black font-display font-semibold text-2xl group-hover:scale-105 transition-transform`}>
                  {name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-display font-semibold text-black text-lg mb-1">{name}</h3>
                <p className="text-blue-400 font-mono text-xs mb-3">{role}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
