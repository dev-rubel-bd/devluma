import React from 'react';
import { motion } from 'framer-motion';

// Section Header
export function SectionHeader({ badge, title, subtitle, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${center ? 'text-center' : ''}`}
    >
      {badge && (
        <div className={`inline-flex items-center gap-2 mb-4 ${center ? 'mx-auto' : ''}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span className="text-blue-400 text-sm font-mono font-medium tracking-wider uppercase">{badge}</span>
        </div>
      )}
      <h2 className="heading-lg text-white mb-4">{title}</h2>
      {subtitle && <p className="text-slate-400 text-lg max-w-2xl leading-relaxed" style={{ marginLeft: center ? 'auto' : undefined, marginRight: center ? 'auto' : undefined }}>{subtitle}</p>}
    </motion.div>
  );
}

// Loading Skeleton
export function Skeleton({ className = '' }) {
  return <div className={`skeleton rounded-lg ${className}`} />;
}

// Card Skeleton
export function CardSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <Skeleton className="h-48 rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Empty state
export function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-slate-600"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        {Icon && <Icon size={28} />}
      </div>
      <h3 className="text-black font-semibold mb-2">{title}</h3>
      <p className="text-black text-sm max-w-xs">{description}</p>
    </div>
  );
}

// Badge
export function Badge({ children, color = 'blue' }) {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
}

// Stat Card
export function StatCard({ value, label, suffix = '' }) {
  return (
    <div className="text-center">
      <div className="heading-lg gradient-text mb-1">{value}{suffix}</div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  );
}

// Modal
export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl glass-strong rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{ zIndex: 10 }}
      >
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <h3 className="font-display font-semibold text-xl text-white">{title}</h3>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-black hover:text-blue-600 hover:bg-white/5 transition-colors">
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
}
