import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { LayoutDashboard, FolderKanban, FileText, MessageSquare, Star, LogOut, Zap, Plus, Trash2, Edit, X, Check, Mail, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { projectsAPI, blogsAPI, testimonialsAPI, contactAPI } from "../../services/api";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const nav = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
    { href: "/admin/blogs", label: "Blog Posts", icon: FileText },
    { href: "/admin/testimonials", label: "Testimonials", icon: Star },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  ];

  const handleLogout = () => { logout(); navigate("/admin/login"); toast.success("Logged out"); };

  return (
    <>
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/50 z-20 lg:hidden" />}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-dark-800 border-r border-brand-500/10 z-30 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex items-center gap-2 px-6 h-16 border-b border-dark-400">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold font-display gradient-text">Devluma</span>
          <span className="text-xs text-slate-600 ml-1">Admin</span>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link key={href} to={href} onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === href ? "bg-brand-500/15 text-brand-400 border border-brand-500/20" : "text-slate-700 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />{label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-dark-400 mt-auto absolute bottom-0 left-0 right-0">
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />Log Out
          </button>
        </div>
      </aside>
    </>
  );
}

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="glass rounded-2xl p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <div className="text-2xl font-bold font-display text-white">{value}</div>
        <div className="text-slate-400 text-sm">{label}</div>
      </div>
    </div>
  );
}

function DashboardHome() {
  const [stats, setStats] = useState({ projects: 0, blogs: 0, testimonials: 0, messages: 0 });
  const { user } = useAuth();

  useEffect(() => {
    Promise.all([projectsAPI.getAll(), blogsAPI.getAllAdmin(), testimonialsAPI.getAll(), contactAPI.getAll()])
      .then(([p, b, t, c]) => setStats({ projects: p.data.count, blogs: b.data.count, testimonials: t.data.count, messages: c.data.count }))
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display text-white">Welcome back, {user?.name?.split(" ")[0]} 👋</h1>
        <p className="text-slate-400 mt-1">Here is what is happening with your agency today.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Projects" value={stats.projects} icon={FolderKanban} color="from-blue-500 to-cyan-500" />
        <StatCard label="Blog Posts" value={stats.blogs} icon={FileText} color="from-purple-500 to-pink-500" />
        <StatCard label="Testimonials" value={stats.testimonials} icon={Star} color="from-yellow-500 to-orange-500" />
        <StatCard label="Messages" value={stats.messages} icon={MessageSquare} color="from-green-500 to-emerald-500" />
      </div>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-dark-700 border border-dark-400 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-dark-400">
          <h2 className="text-white font-bold text-lg">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
}

function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", category: "Web", tags: "", image: "", liveUrl: "", githubUrl: "" });

  const load = () => projectsAPI.getAll().then(({ data }) => { setProjects(data.data); setLoading(false); });
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm({ title: "", description: "", category: "Web", tags: "", image: "", liveUrl: "", githubUrl: "" }); setModal("create"); };
  const openEdit = (p) => { setForm({ ...p, tags: p.tags?.join(", ") }); setModal(p._id); };

  const save = async () => {
    const payload = { ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) };
    try {
      if (modal === "create") await projectsAPI.create(payload);
      else await projectsAPI.update(modal, payload);
      toast.success("Saved!"); setModal(null); load();
    } catch { toast.error("Error saving"); }
  };

  const del = async (id) => {
    if (!confirm("Delete this project?")) return;
    await projectsAPI.delete(id); toast.success("Deleted"); load();
  };

  const F = ({ label, field, ...props }) => (
    <div>
      <label className="block text-sm text-slate-300 mb-1">{label}</label>
      {props.as === "textarea"
        ? <textarea rows={3} value={form[field]} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} className="input-field resize-none" {...props} />
        : props.as === "select"
        ? <select value={form[field]} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} className="input-field">{props.children}</select>
        : <input value={form[field]} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} className="input-field" {...props} />
      }
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Projects</h1>
        <button onClick={openCreate} className="btn-primary text-sm py-2 flex items-center gap-2"><Plus className="w-4 h-4" />Add Project</button>
      </div>
      {loading ? <LoadingSpinner /> : (
        <div className="space-y-3">
          {projects.map(p => (
            <div key={p._id} className="glass rounded-xl p-4 flex items-center gap-4">
              {p.image && <img src={p.image} alt={p.title} className="w-14 h-10 rounded-lg object-cover flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">{p.title}</div>
                <div className="text-slate-500 text-xs">{p.category} · {p.tags?.slice(0, 3).join(", ")}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(p)} className="p-2 text-slate-400 hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                <button onClick={() => del(p._id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === "create" ? "Add Project" : "Edit Project"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <F label="Title" field="title" placeholder="Project name" />
            <F label="Description" field="description" as="textarea" placeholder="Project description..." />
            <F label="Category" field="category" as="select">
              {["Web","App","Marketing","SEO"].map(c => <option key={c}>{c}</option>)}
            </F>
            <F label="Tags (comma-separated)" field="tags" placeholder="React, Node.js, MongoDB" />
            <F label="Image URL" field="image" placeholder="https://..." />
            <F label="Live URL" field="liveUrl" placeholder="https://..." />
            <F label="GitHub URL" field="githubUrl" placeholder="https://github.com/..." />
            <div className="flex gap-3 pt-2">
              <button onClick={save} className="btn-primary flex-1 flex items-center justify-center gap-2"><Check className="w-4 h-4" />Save</button>
              <button onClick={() => setModal(null)} className="btn-ghost flex-1">Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function BlogsAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", excerpt: "", image: "", author: "Devluma Team", tags: "", published: true });

  const load = () => blogsAPI.getAllAdmin().then(({ data }) => { setBlogs(data.data); setLoading(false); });
  useEffect(() => { load(); }, []);

  const save = async () => {
    const payload = { ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) };
    try {
      if (modal === "create") await blogsAPI.create(payload);
      else await blogsAPI.update(modal, payload);
      toast.success("Saved!"); setModal(null); load();
    } catch { toast.error("Error saving"); }
  };

  const del = async (id) => { if (!confirm("Delete?")) return; await blogsAPI.delete(id); toast.success("Deleted"); load(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Blog Posts</h1>
        <button onClick={() => { setForm({ title: "", content: "", excerpt: "", image: "", author: "Devluma Team", tags: "", published: true }); setModal("create"); }} className="btn-primary text-sm py-2 flex items-center gap-2"><Plus className="w-4 h-4" />New Post</button>
      </div>
      {loading ? <LoadingSpinner /> : (
        <div className="space-y-3">
          {blogs.map(b => (
            <div key={b._id} className="glass rounded-xl p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-black font-medium truncate">{b.title}</div>
                <div className="text-slate-500 text-xs">{b.author} · {b.published ? "Published" : "Draft"}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setForm({ ...b, tags: b.tags?.join(", ") }); setModal(b._id); }} className="p-2 text-slate-400 hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                <button onClick={() => del(b._id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === "create" ? "New Post" : "Edit Post"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div><label className="block text-sm text-slate-600 mb-1">Title</label><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="input-field" /></div>
            <div><label className="block text-sm text-slate-600 mb-1">Excerpt</label><textarea rows={2} value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} className="input-field resize-none" /></div>
            <div><label className="block text-sm text-slate-600 mb-1">Content</label><textarea rows={6} value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} className="input-field resize-none" /></div>
            <div><label className="block text-sm text-slate-600 mb-1">Author</label><input value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} className="input-field" /></div>
            <div><label className="block text-sm text-slate-600 mb-1">Image URL</label><input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} className="input-field" /></div>
            <div><label className="block text-sm text-slate-600 mb-1">Tags</label><input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} placeholder="React, Design, SEO" className="input-field" /></div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={e => setForm(p => ({ ...p, published: e.target.checked }))} className="w-4 h-4 accent-brand-500" />
              <span className="text-sm text-slate-600">Published</span>
            </label>
            <div className="flex gap-3 pt-2">
              <button onClick={save} className="btn-primary flex-1 flex items-center justify-center gap-2"><Check className="w-4 h-4" />Save</button>
              <button onClick={() => setModal(null)} className="btn-ghost flex-1">Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: "", role: "", company: "", review: "", rating: 5 });

  const load = () => testimonialsAPI.getAll().then(({ data }) => { setTestimonials(data.data); setLoading(false); });
  useEffect(() => { load(); }, []);

  const save = async () => {
    try {
      if (modal === "create") await testimonialsAPI.create(form);
      else await testimonialsAPI.update(modal, form);
      toast.success("Saved!"); setModal(null); load();
    } catch { toast.error("Error"); }
  };

  const del = async (id) => { if (!confirm("Delete?")) return; await testimonialsAPI.delete(id); toast.success("Deleted"); load(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Testimonials</h1>
        <button onClick={() => { setForm({ name: "", role: "", company: "", review: "", rating: 5 }); setModal("create"); }} className="btn-primary text-sm py-2 flex items-center gap-2"><Plus className="w-4 h-4" />Add</button>
      </div>
      {loading ? <LoadingSpinner /> : (
        <div className="space-y-3">
          {testimonials.map(t => (
            <div key={t._id} className="glass rounded-xl p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{t.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium">{t.name} — {t.role} @ {t.company}</div>
                <div className="text-slate-400 text-sm mt-1 line-clamp-2">{t.review}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setForm(t); setModal(t._id); }} className="p-2 text-slate-400 hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                <button onClick={() => del(t._id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title={modal === "create" ? "Add Testimonial" : "Edit Testimonial"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div><label className="block text-sm text-slate-600 mb-1">Name</label><input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="input-field" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm text-slate-600 mb-1">Role</label><input value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} className="input-field" /></div>
              <div><label className="block text-sm text-slate-600 mb-1">Company</label><input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} className="input-field" /></div>
            </div>
            <div><label className="block text-sm text-slate-600 mb-1">Review</label><textarea rows={4} value={form.review} onChange={e => setForm(p => ({ ...p, review: e.target.value }))} className="input-field resize-none" /></div>
            <div><label className="block text-sm text-slate-600 mb-1">Rating (1-5)</label><input type="number" min={1} max={5} value={form.rating} onChange={e => setForm(p => ({ ...p, rating: Number(e.target.value) }))} className="input-field" /></div>
            <div className="flex gap-3 pt-2">
              <button onClick={save} className="btn-primary flex-1 flex items-center justify-center gap-2"><Check className="w-4 h-4" />Save</button>
              <button onClick={() => setModal(null)} className="btn-ghost flex-1">Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => contactAPI.getAll().then(({ data }) => { setMessages(data.data); setLoading(false); });
  useEffect(() => { load(); }, []);

  const markRead = async (id) => { await contactAPI.markRead(id); load(); };
  const del = async (id) => { if (!confirm("Delete?")) return; await contactAPI.delete(id); toast.success("Deleted"); load(); };

  return (
    <div>
      <h1 className="text-xl font-bold text-white mb-6">Messages</h1>
      {loading ? <LoadingSpinner /> : (
        <div className="space-y-3">
          {messages.map(m => (
            <div key={m._id} className={`glass rounded-xl p-5 transition-all ${!m.read ? "border-brand-500/20" : "opacity-70"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">{m.name[0]}</div>
                    <div>
                      <span className="text-white font-medium text-sm">{m.name}</span>
                      <span className="text-slate-500 text-xs ml-2">{m.email}</span>
                    </div>
                    {!m.read && <span className="px-2 py-0.5 text-xs rounded-full bg-brand-500/20 text-brand-400">New</span>}
                  </div>
                  {m.subject && <div className="text-slate-300 text-sm font-medium mb-1">{m.subject}</div>}
                  <div className="text-slate-400 text-sm leading-relaxed">{m.message}</div>
                  <div className="text-slate-600 text-xs mt-2">{new Date(m.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {!m.read && (
                    <button onClick={() => markRead(m._id)} className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors" title="Mark as read">
                      <Mail className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => del(m._id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
          {messages.length === 0 && <div className="text-center py-16 text-slate-500">No messages yet</div>}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Helmet><title>Admin Dashboard — Devluma</title></Helmet>
      <div className="min-h-screen bg-dark-900 flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <div className="flex-1 lg:ml-64">
          {/* Top bar */}
          <div className="sticky top-0 z-10 h-16 bg-dark-900/90 backdrop-blur border-b border-dark-400 flex items-center px-6 gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-slate-400 text-sm">Admin Dashboard</span>
          </div>

          <main className="p-6">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/projects" element={<ProjectsAdmin />} />
              <Route path="/blogs" element={<BlogsAdmin />} />
              <Route path="/testimonials" element={<TestimonialsAdmin />} />
              <Route path="/messages" element={<MessagesAdmin />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}
