import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiPhone, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import SEO from '../components/common/SEO';
import { contactAPI } from '../services/api';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i=0) => ({ opacity: 1, y: 0, transition: { delay: i*0.1, duration: 0.5 } }) };

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.send(form);
      setSent(true);
      toast.success('Message sent! We\'ll be in touch soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const info = [
    { icon: FiMail, label: 'Email', value: 'devlumabd@gmail.com' },
    { icon: FiPhone, label: 'Phone', value: '+880 1760700289' },
    { icon: FiMapPin, label: 'Location', value: 'Rangpur, Bangladesh' },
  ];

  return (
    <>
      <SEO title="Contact" description="Get in touch with Devluma. Start your project today." />
      <div className="pt-28 pb-20">
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 mb-16">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-pink-400 font-mono text-sm uppercase tracking-widest">Contact</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="section-title text-black mt-3 mb-4">
            Let's Build <span className="gradient-text">Together</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-400 text-lg">
            Have a project in mind? We'd love to hear about it.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-5 gap-8">
          {/* Info */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-2 space-y-5">
            {info.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass-card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-slate-500 text-xs uppercase tracking-widest mb-0.5">{label}</div>
                  <div className="text-black font-medium">{value}</div>
                </div>
              </div>
            ))}
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-black mb-2">Response Time</h3>
              <p className="text-slate-500 text-sm">We typically respond within 24 hours. For urgent inquiries, call us directly.</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} className="md:col-span-3">
            {sent ? (
              <div className="glass-card p-10 flex flex-col items-center justify-center text-center min-h-64">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                  <FiCheckCircle size={56} className="text-green-400 mx-auto mb-4" />
                </motion.div>
                <h3 className="font-display font-bold text-black text-2xl mb-2">Message Sent!</h3>
                <p className="text-slate-400 mb-6">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="btn-outline text-sm">Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="glass-card p-8 space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  {[['name', 'Your Name', 'text'], ['email', 'Email Address', 'email']].map(([name, ph, type]) => (
                    <div key={name} className="space-y-1.5">
                      <label className="text-slate-600 text-sm capitalize">{name}</label>
                      <input
                        type={type} name={name} value={form[name]} onChange={handle}
                        placeholder={ph} required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-black text-sm placeholder-slate-300 focus:outline-none focus:border-purple-500/60 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600 text-sm">Subject</label>
                  <input
                    type="text" name="subject" value={form.subject} onChange={handle}
                    placeholder="Write subject..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-black text-sm placeholder-slate-300 focus:outline-none focus:border-purple-500/60 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600 text-sm">Message</label>
                  <textarea
                    name="message" value={form.message} onChange={handle}
                    placeholder="Tell us about your project..."
                    required rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-black text-sm placeholder-slate-300 focus:outline-none focus:border-purple-500/60 transition-colors resize-none"
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="inline-block w-4 h-4 border-2 border-white/30 border-t-black rounded-full" />
                      Sending...
                    </span>
                  ) : (
                    <><FiSend /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
