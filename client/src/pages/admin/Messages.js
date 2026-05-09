import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiTrash2, FiCheck, FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import { contactAPI } from '../../services/api';

export default function AdminMessages() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = () => {
    setLoading(true);
    contactAPI.getAll().then(r => setItems(r.data || [])).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    try { await contactAPI.markRead(id); load(); }
    catch (err) { toast.error('Failed to mark read'); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try { await contactAPI.delete(id); setSelected(null); toast.success('Deleted'); load(); }
    catch (err) { toast.error(err.error || 'Delete failed'); }
  };

  const unread = items.filter(m => !m.read).length;

  return (
    <AdminLayout title="Messages">
      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-500 text-sm">{items.length} messages{unread > 0 ? ` · ${unread} unread` : ''}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* List */}
        <div className="space-y-2">
          {loading ? (
            [...Array(5)].map((_, i) => <div key={i} className="glass-card h-16 animate-pulse" />)
          ) : items.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <FiMessageSquare size={40} className="mx-auto mb-3 opacity-30" />
              <p>No messages yet.</p>
            </div>
          ) : (
            items.map((item, i) => (
              <motion.div key={item._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i*0.04 }}
                onClick={() => { setSelected(item); if (!item.read) markRead(item._id); }}
                className={`glass-card p-4 cursor-pointer transition-all ${selected?._id === item._id ? 'border-purple-500/40' : ''} ${!item.read ? 'border-blue-500/20' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!item.read ? 'bg-blue-400' : 'bg-transparent'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-medium text-sm ${!item.read ? 'text-white' : 'text-slate-300'}`}>{item.name}</span>
                      <span className="text-slate-600 text-xs shrink-0">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5 truncate">{item.subject || item.message}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Detail */}
        <div>
          {selected ? (
            <motion.div key={selected._id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 sticky top-24">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display font-semibold text-white">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-blue-400 text-sm hover:underline flex items-center gap-1 mt-1">
                    <FiMail size={12} /> {selected.email}
                  </a>
                </div>
                <div className="flex gap-2">
                  {!selected.read && (
                    <button onClick={() => markRead(selected._id)} className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors">
                      <FiCheck size={15} />
                    </button>
                  )}
                  <button onClick={() => remove(selected._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
              {selected.subject && <p className="text-slate-400 text-sm font-medium mb-3">{selected.subject}</p>}
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              <p className="text-slate-600 text-xs mt-4">{new Date(selected.createdAt).toLocaleString()}</p>
            </motion.div>
          ) : (
            <div className="glass-card p-10 flex flex-col items-center justify-center text-center min-h-48 text-slate-600">
              <FiMessageSquare size={32} className="mb-3 opacity-30" />
              <p className="text-sm">Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
