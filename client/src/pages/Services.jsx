import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Globe, Smartphone, TrendingUp, Search, Code, Palette, BarChart3, Shield } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";

const services = [
  {
    icon: Globe, title: "Web Development", color: "from-blue-500 to-cyan-500",
    desc: "We craft blazing-fast, scalable web applications using React, Next.js, Vue, and Node.js. From simple landing pages to complex enterprise platforms.",
    features: ["Custom Web Apps", "E-commerce Solutions", "API Development", "Performance Optimization", "Progressive Web Apps"]
  },
  {
    icon: Smartphone, title: "Mobile App Development", color: "from-purple-500 to-pink-500",
    desc: "Native and cross-platform mobile apps built with React Native and Flutter that deliver seamless user experiences across iOS and Android.",
    features: ["iOS & Android Apps", "Cross-Platform Development", "App Store Optimization", "Push Notifications", "Offline Support"]
  },
  {
    icon: TrendingUp, title: "Digital Marketing", color: "from-orange-500 to-red-500",
    desc: "Data-driven digital marketing strategies that build brand awareness, drive traffic, and maximize your return on investment.",
    features: ["Social Media Marketing", "PPC Advertising", "Email Campaigns", "Content Strategy", "Analytics & Reporting"]
  },
  {
    icon: Search, title: "SEO Optimization", color: "from-green-500 to-emerald-500",
    desc: "Dominate search rankings with our comprehensive SEO services. We combine technical expertise with content strategy for lasting results.",
    features: ["Technical SEO Audits", "Keyword Research", "Link Building", "Local SEO", "Schema Markup"]
  },
  {
    icon: Code, title: "Backend Development", color: "from-indigo-500 to-violet-500",
    desc: "Robust, secure backend systems built with Node.js, Python, or Go. REST APIs, GraphQL, microservices, and cloud infrastructure.",
    features: ["REST & GraphQL APIs", "Microservices", "Database Design", "Cloud Deployment", "CI/CD Pipelines"]
  },
  {
    icon: Palette, title: "UI/UX Design", color: "from-pink-500 to-rose-500",
    desc: "Beautiful, intuitive interfaces designed with users in mind. From wireframes to pixel-perfect designs that convert visitors into customers.",
    features: ["User Research", "Wireframing & Prototyping", "Design Systems", "Usability Testing", "Brand Identity"]
  },
  {
    icon: BarChart3, title: "Analytics & Insights", color: "from-yellow-500 to-orange-500",
    desc: "Turn your data into actionable insights. We set up tracking, build dashboards, and help you make data-driven decisions.",
    features: ["Google Analytics 4", "Custom Dashboards", "Conversion Tracking", "A/B Testing", "Business Intelligence"]
  },
  {
    icon: Shield, title: "Security & Compliance", color: "from-teal-500 to-cyan-500",
    desc: "Protect your digital assets with enterprise-grade security audits, penetration testing, and compliance consulting.",
    features: ["Security Audits", "Penetration Testing", "GDPR Compliance", "SSL & Security Headers", "Data Protection"]
  },
];

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services — Devluma Digital Agency</title>
        <meta name="description" content="Full-service digital agency offering web development, mobile apps, SEO, and digital marketing." />
      </Helmet>

      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="What We Do" title="Full-Stack Digital" highlight="Services" subtitle="From concept to launch — we handle every layer of your digital presence with precision and craft." />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {services.map(({ icon: Icon, title, desc, color, features }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5">{desc}</p>
                    <ul className="space-y-2">
                      {features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
