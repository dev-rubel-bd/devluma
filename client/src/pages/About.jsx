import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Target, Lightbulb, Users, Award } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";

const team = [
  { name: "Alex Rivera",    role: "CEO & Founder",       bio: "10+ years building digital products for Fortune 500 companies and fast-growing startups.",          initials: "AR", image: "/team/alex.jpg" },
  { name: "Priya Sharma",   role: "Head of Design",      bio: "Award-winning UI/UX designer specializing in SaaS products and conversion optimization.",           initials: "PS", image: "/team/priya.jpg" },
  { name: "Marcus Chen",    role: "Lead Developer",      bio: "Full-stack architect who has shipped products used by millions of users worldwide.",                  initials: "MC", image: "/team/marcus.jpg" },
  { name: "Elena Vasquez",  role: "Marketing Director",  bio: "Growth marketer with a track record of 10x ROI campaigns across diverse industries.",               initials: "EV", image: "/team/elena.jpg" },
];

const values = [
  { icon: Target,    title: "Results First",     desc: "Every decision we make is driven by measurable outcomes for our clients." },
  { icon: Lightbulb, title: "Creative Thinking", desc: "We bring fresh perspectives and innovative solutions to every challenge." },
  { icon: Users,     title: "True Partnership",  desc: "We work as an extension of your team, not just a vendor." },
  { icon: Award,     title: "Craft & Quality",   desc: "We take pride in the details that separate good from extraordinary." },
];

function TeamAvatar({ name, initials, image }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (image && !imgFailed) {
    return (
      <img
        src={image}
        alt={name}
        onError={() => setImgFailed(true)}
        className="w-20 h-20 rounded-2xl object-cover object-top mx-auto mb-5 group-hover:scale-110 transition-transform"
      />
    );
  }

  return (
    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center mx-auto mb-5 text-2xl font-semibold text-white group-hover:scale-110 transition-transform">
      {initials}
    </div>
  );
}

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us — Devluma Digital Agency</title>
      </Helmet>

      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-24">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
              Our Story
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-semibold font-display text-white mb-6 leading-tight"
            >
              Built for the <span className="gradient-text">Ambitious</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 leading-relaxed"
            >
              Founded in 2019, Devluma was built on a simple belief: great digital work should be accessible to every ambitious brand, not just the largest enterprises. We are a team of designers, developers, and strategists who genuinely love what we do.
            </motion.p>
          </div>

          {/* Values */}
          <SectionHeading badge="Our Values" title="What Drives" highlight="Us Forward" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-accent-600 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Team */}
          <SectionHeading badge="The Team" title="Meet the" highlight="Experts" subtitle="A passionate collective of specialists dedicated to your digital success." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, bio, initials, image }, i) => (
              <motion.div key={name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card text-center group"
              >
                <TeamAvatar name={name} initials={initials} image={image} />
                <h3 className="text-white font-semibold text-lg mb-1">{name}</h3>
                <p className="text-brand-400 text-sm font-medium mb-3">{role}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
