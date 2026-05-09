import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50/50 grid-bg flex items-center justify-center px-4">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-100/60 rounded-full blur-[100px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="w-full max-w-sm relative"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-indigo-200 shadow-xl shadow-indigo-100/60">
              <img src="/logo.png" alt="Devluma" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="font-display font-bold text-2xl text-gray-900">Admin Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to manage <span className="text-indigo-600 font-medium">Devluma</span></p>
        </div>

        <form onSubmit={submit} className="bg-white border border-indigo-100 rounded-2xl p-8 space-y-4 shadow-lg shadow-indigo-100/30">
          <div>
            <label className="text-gray-600 text-sm block mb-2 font-medium">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400" size={16} />
              <input type="email" name="email" value={form.email} onChange={handle} required
                placeholder="admin@devluma.com"
                className="w-full bg-indigo-50/50 border border-indigo-100 rounded-xl pl-10 pr-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="text-gray-600 text-sm block mb-2 font-medium">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400" size={16} />
              <input type={showPw ? 'text' : 'password'} name="password" value={form.password} onChange={handle} required
                placeholder="••••••••"
                className="w-full bg-indigo-50/50 border border-indigo-100 rounded-xl pl-10 pr-10 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors"
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors">
                {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 mt-2">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">admin@devluma.com / admin123456</p>
      </motion.div>
    </div>
  );
}
