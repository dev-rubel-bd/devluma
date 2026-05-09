import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import { testimonialsAPI } from '../../services/api';

const EMPTY = { name: '', role: '', company: '', review: '', avatar: '', rating: 5, featured: false };

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    testimonialsAPI.getAll().then(r => setItems(r.data || [])).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (item) => { setEditing(item._id); setForm(item); setModal(true); };
  const handle = e => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [e.target.name]: val }));
  };

  const save = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) { await testimonialsAPI.update(editing, form); toast.success('Updated'); }
      else { await testimonialsAPI.create(form); toast.success('Created'); }
      setModal(false); load();
    } catch (err) { toast.error(err.error || 'Save failed'); }
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try { await testimonialsAPI.delete(id); toast.success('Deleted'); load(); }
    catch (err) { toast.error(err.error || 'Delete failed'); }
  };

  return (
    <AdminLayout title="Testimonials">
      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-500 text-sm">{items.length} testimonials</p>
        <button onClick={openNew} className="btn-primary text-sm py-2 px-4"><FiPlus /> Add Testimonial</button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="glass-card h-20 animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <FiStar size={40} className="mx-auto mb-3 opacity-30" />
          <p>No testimonials yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div key={item._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i*0.04 }}
              className="glass-card p-4 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/30 to-orange-500/30 flex items-center justify-center text-white font-bold shrink-0">
                {item.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-white">{item.name}</span>
                  <span className="text-slate-500 text-xs">{item.role}{item.company ? ` · ${item.company}` : ''}</span>
                  {item.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">Featured</span>}
                </div>
                <div className="flex gap-0.5 my-1">
                  {[...Array(item.rating || 5)].map((_, j) => <FiStar key={j} size={11} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-slate-500 text-xs truncate">"{item.review}"</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(item)} className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"><FiEdit2 size={15} /></button>
                <button onClick={() => remove(item._id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors"><FiTrash2 size={15} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <h2 className="font-display font-semibold text-white">{editing ? 'Edit Testimonial' : 'New Testimonial'}</h2>
              <button onClick={() => setModal(false)} className="p-1.5 text-slate-500 hover:text-white"><FiX size={18} /></button>
            </div>
            <form onSubmit={save} className="p-5 space-y-4">
              {[['name','Name *'],['role','Role/Title'],['company','Company'],['avatar','Avatar URL']].map(([name,label]) => (
                <div key={name}>
                  <label className="text-slate-400 text-xs mb-1.5 block">{label}</label>
                  <input name={name} value={form[name]} onChange={handle} required={name === 'name'}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/60" />
                </div>
              ))}
              <div>
                <label className="text-slate-400 text-xs mb-1.5 block">Review *</label>
                <textarea name="review" value={form.review} onChange={handle} required rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/60 resize-none" />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1.5 block">Rating</label>
                <select name="rating" value={form.rating} onChange={handle}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none">
                  {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} ⭐</option>)}
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handle} className="accent-purple-500 w-4 h-4" />
                <span className="text-slate-400 text-sm">Feature on homepage</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="btn-outline flex-1 text-sm py-2.5">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 text-sm py-2.5 justify-center">{saving ? 'Saving...' : (editing ? 'Update' : 'Create')}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}
