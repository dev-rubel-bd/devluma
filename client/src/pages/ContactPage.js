import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';
import SEO from '../components/common/SEO';
import { contactService } from '../services/api';

const contactInfo = [
  { icon: FiMail, label: 'Email', value: 'devlumabd@gmail.com', href: 'mailto:devlumabd@gmail.com' },
  { icon: FiPhone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: FiMapPin, label: 'Location', value: 'Rangpur, Bangladesh', href: '#' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactService.submit(form);
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: '', email: '', subject: '', message: '', phone: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Contact" description="Get in touch with Devluma to start your next digital project." />

      <section className="min-h-screen pt-28 section-padding relative overflow-hidden">
        <div className="orb w-80 h-80 bg-blue-600 top-10 -right-20" />
        <div className="orb w-80 h-80 bg-purple-600 bottom-10 -left-20" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-blue-400 font-mono text-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-400" /> Get in Touch
            </span>
            <h1 className="heading-xl text-black mb-6">Let's Build Something <span className="gradient-text">Together</span></h1>
            <p className="text-slate-400 text-xl max-w-xl mx-auto">Tell us about your project and we'll get back to you within 24 hours with a custom proposal.</p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href}
                  className="glass rounded-2xl p-6 flex items-center gap-4 card-hover block">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                    <Icon size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-1">{label}</div>
                    <div className="text-black font-medium">{value}</div>
                  </div>
                </a>
              ))}

              {/* Response time card */}
              <div className="glass rounded-2xl p-6"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))' }}>
                <div className="text-black font-display font-semibold text-lg mb-2">⚡ Fast Response</div>
                <p className="text-slate-400 text-sm">We typically respond within 2-4 hours during business hours. For urgent projects, we're available 24/7.</p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-3">
              {submitted ? (
                <div className="glass rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="font-display font-semibold text-black text-2xl mb-3">Message Sent!</h3>
                  <p className="text-slate-400 mb-6">Thanks for reaching out. We'll get back to you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline text-sm">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required
                        placeholder="John Doe" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Email Address *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required
                        placeholder="john@company.com" className="input-field" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Phone (optional)</label>
                      <input name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+880 1760700289" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Subject</label>
                      <input name="subject" value={form.subject} onChange={handleChange}
                        placeholder="Project Inquiry" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required
                      rows={6} placeholder="Tell us about your project, timeline, and goals..."
                      className="input-field resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-black rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <FiSend size={16} />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
