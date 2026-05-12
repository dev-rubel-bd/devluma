import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiZap, FiTarget, FiUsers } from 'react-icons/fi';
import SEO from '../components/common/SEO';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }) };

const teamMembers = [
  { name: 'Rubel Hasan',    role: 'CEO & Founder',          gradient: 'from-blue-500 to-cyan-500',    image: '/team/rubel.jpg' },
  { name: 'Ziya Ul Haque',  role: 'CTO & Co-Founder',       gradient: 'from-purple-500 to-pink-500',  image: '/team/ziya.jpg' },
  { name: 'Mia Santos',     role: 'Project Manager',         gradient: 'from-rose-500 to-pink-500',    image: '/team/mia.jpg' },
  { name: 'Rakib Hossain',  role: 'Senior UX/UI Designer',  gradient: 'from-emerald-500 to-teal-500', image: '/team/marcus.jpg' },
  { name: 'Jannatul Priya', role: 'Marketing Director',      gradient: 'from-orange-500 to-amber-500', image: '/team/priya.jpg' },
  { name: 'Md Mosur Alom',  role: 'Frontend Lead',           gradient: 'from-blue-400 to-indigo-500',  image: '/team/tom.jpg' },
];

function TeamCard({ name, role, gradient, image, i }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
      whileHover={{ y: -6 }}
      className="bg-gradient-to-br from-[#4742cb] to-[#231e85] border border-indigo-900 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all"
    >
      <div className="w-40 h-40 mt-5 rounded-2xl mx-auto mb-4 overflow-hidden">
        {!imgFailed ? (
          <img
            src={image}
            alt={name}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-semibold text-2xl font-display`}>
            {name[0]}
          </div>
        )}
      </div>
      <h3 className="font-display font-semibold text-white text-lg">{name}</h3>
      <p className="text-gray-300 text-sm mt-1">{role}</p>
    </motion.div>
  );
}

export default function About() {
  return (
    <>
      <SEO title="About" description="Learn about Devluma — our mission, team, and values." />

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
                { icon: FiHeart,  title: 'Client-First',    desc: 'Every decision is made with your success in mind. Your goals are our goals.' },
                { icon: FiZap,    title: 'Speed & Quality', desc: 'We ship fast without cutting corners. Velocity and excellence, together.' },
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
              {teamMembers.map(({ name, role, gradient, image }, i) => (
                <TeamCard key={i} name={name} role={role} gradient={gradient} image={image} i={i} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}