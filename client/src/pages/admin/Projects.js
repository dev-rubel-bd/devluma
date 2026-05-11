import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiFolder } from 'react-icons/fi';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import { projectsAPI } from '../../services/api';

const EMPTY = { title: '', description: '', image: '', category: 'Web', technologies: '', liveUrl: '', githubUrl: '', featured: false };

export default function AdminProjects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    projectsAPI.getAll().then(r => setItems(r.data || [])).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (item) => { setEditing(item._id); setForm({ ...item, technologies: item.technologies?.join(', ') || '' }); setModal(true); };

  const handle = e => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [e.target.name]: val }));
  };

  const save = async e => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      if (editing) { await projectsAPI.update(editing, payload); toast.success('Project updated'); }
      else { await projectsAPI.create(payload); toast.success('Project created'); }
      setModal(false); load();
    } catch (err) { toast.error(err.error || 'Save failed'); }
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try { await projectsAPI.delete(id); toast.success('Deleted'); load(); }
    catch (err) { toast.error(err.error || 'Delete failed'); }
  };

  return (
    <AdminLayout title="Projects">
      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-500 text-sm">{items.length} projects</p>
        <button onClick={openNew} className="btn-primary text-sm py-2 px-4"><FiPlus /> Add Project</button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="glass-card h-16 animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <FiFolder size={40} className="mx-auto mb-3 opacity-30" />
          <p>No projects yet. Add your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div key={item._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i*0.04 }}
              className="glass-card p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center shrink-0">
                <FiFolder size={18} className="text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-black truncate">{item.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">{item.category}</span>
                  {item.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-lime-100/30 text-lime-600">Featured</span>}
                </div>
                <p className="text-slate-600 text-xs truncate mt-0.5">{item.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(item)} className="p-2 text-slate-700 hover:text-yellow-500 hover:bg-white/5 rounded-lg transition-colors">
                  <FiEdit2 size={15} />
                </button>
                <button onClick={() => remove(item._id)} className="p-2 text-slate-700 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors">
                  <FiTrash2 size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <h2 className="font-display font-semibold text-black">{editing ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={() => setModal(false)} className="p-1.5 text-slate-700 hover:text-red-600"><FiX size={18} /></button>
            </div>
            <form onSubmit={save} className="p-5 space-y-4">
              {[['title', 'Title *'], ['image', 'Image URL'], ['liveUrl', 'Live URL'], ['githubUrl', 'GitHub URL']].map(([name, label]) => (
                <div key={name}>
                  <label className="text-slate-700 text-xs mb-1.5 block">{label}</label>
                  <input name={name} value={form[name]} onChange={handle} required={name === 'title'}
                    className="w-full bg-white/5 border border-white/50 rounded-xl px-3 py-2.5 text-black text-sm focus:outline-none focus:border-purple-500/60 transition-colors" />
                </div>
              ))}
              <div>
                <label className="text-slate-700 text-xs mb-1.5 block">Category</label>
                <select name="category" value={form.category} onChange={handle}
                  className="w-full bg-dark-800 border border-white/5 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500/60"
                >
                  {['Web', 'App', 'Marketing', 'SEO'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-slate-700 text-xs mb-1.5 block">Description *</label>
                <textarea name="description" value={form.description} onChange={handle} required rows={3}
                  className="w-full bg-white/5 border border-white/85 rounded-xl px-3 py-2.5 text-black text-sm focus:outline-none focus:border-purple-500/60 resize-none" />
              </div>
              <div>
                <label className="text-slate-700 text-xs mb-1.5 block">Technologies (comma-separated)</label>
                <input name="technologies" value={form.technologies} onChange={handle} placeholder="React, Node.js, MongoDB"
                  className="w-full bg-white/5 border border-white/40 rounded-xl px-3 py-2.5 text-black text-sm focus:outline-none focus:border-purple-500/60" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handle} className="accent-purple-500 w-4 h-4" />
                <span className="text-slate-700 text-sm">Featured project</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="btn-outline flex-1 text-sm py-2.5">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 text-sm py-2.5 justify-center">
                  {saving ? 'Saving...' : (editing ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}
