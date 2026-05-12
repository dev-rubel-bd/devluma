import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProjects = lazy(() => import('./pages/admin/Projects'));
const AdminBlogs = lazy(() => import('./pages/admin/Blogs'));
const AdminTestimonials = lazy(() => import('./pages/admin/Testimonials'));
const AdminMessages = lazy(() => import('./pages/admin/Messages'));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

const PublicLayout = ({ children }) => (
  <div className="noise-bg min-h-screen">
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);

const AdminLayout = ({ children }) => (
  <div className="min-h-screen bg-dark-950">{children}</div>
);

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/admin/login" element={<AdminLayout><AdminLogin /></AdminLayout>} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute><AdminLayout><AdminProjects /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/blogs" element={<ProtectedRoute><AdminLayout><AdminBlogs /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/testimonials" element={<ProtectedRoute><AdminLayout><AdminTestimonials /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><AdminLayout><AdminMessages /></AdminLayout></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />

      {/* WhatsApp Live Chat Button */}
      <a href="https://wa.me/8801760700289" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 group">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg"
          style={{ backgroundColor: '#25D366' }}
        >
          <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ backgroundColor: '#25D366' }} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 fill-white">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.664 4.942 1.93 7.11L2 30l7.09-1.91A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.83-1.594l-.418-.248-4.33 1.166 1.15-4.227-.27-.435A11.5 11.5 0 1 1 16 27.5zm6.29-8.61c-.344-.172-2.04-1.006-2.356-1.12-.316-.114-.546-.172-.776.172-.23.344-.89 1.12-1.09 1.35-.2.23-.4.258-.744.086-.344-.172-1.452-.535-2.766-1.707-1.022-.912-1.712-2.038-1.912-2.382-.2-.344-.022-.53.15-.702.155-.154.344-.4.516-.6.172-.2.23-.344.344-.574.114-.23.057-.43-.029-.602-.086-.172-.776-1.87-1.063-2.56-.28-.672-.564-.58-.776-.59l-.66-.012c-.23 0-.6.086-.914.43s-1.2 1.172-1.2 2.858 1.228 3.316 1.4 3.546c.172.23 2.418 3.69 5.858 5.174.818.354 1.457.564 1.954.722.82.26 1.568.224 2.158.136.658-.098 2.04-.834 2.328-1.638.286-.804.286-1.494.2-1.638-.085-.144-.314-.23-.658-.4z"/>
          </svg>
        </motion.div>
        <span className="absolute right-16 bottom-3 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Chat with us 💬
        </span>
      </a>

    </AuthProvider>
  );
}