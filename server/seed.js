import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Project from './models/Project.js';
import Blog from './models/Blog.js';
import Testimonial from './models/Testimonial.js';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/devluma');
  console.log('Connected to MongoDB');

  // Clear
  await Promise.all([User.deleteMany(), Project.deleteMany(), Blog.deleteMany(), Testimonial.deleteMany()]);

  // Admin user
  await User.create({ name: 'Devluma Admin', email: process.env.ADMIN_EMAIL || 'admin@devluma.com', password: process.env.ADMIN_PASSWORD || 'Admin@123' });

  // Projects
  await Project.insertMany([
    { title: 'NexaCommerce', description: 'A full-featured e-commerce platform with real-time inventory and AI-powered recommendations.', category: 'Web', tags: ['React', 'Node.js', 'MongoDB'], featured: true, image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80' },
    { title: 'FlowTask Mobile', description: 'Cross-platform task management app with team collaboration and smart scheduling.', category: 'App', tags: ['React Native', 'Firebase'], featured: true, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80' },
    { title: 'GrowthPulse SEO', description: 'SEO optimization campaign that tripled organic traffic in 6 months for a SaaS startup.', category: 'SEO', tags: ['SEO', 'Analytics', 'Content'], featured: false, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
    { title: 'BrandLaunch Campaign', description: 'Full digital marketing launch for a fintech brand reaching 2M+ users in 3 months.', category: 'Marketing', tags: ['Social Media', 'PPC', 'Email'], featured: true, image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80' },
    { title: 'MedConnect Portal', description: 'HIPAA-compliant telehealth portal connecting patients with doctors in real-time.', category: 'Web', tags: ['React', 'WebRTC', 'Node.js'], featured: false, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80' },
    { title: 'CryptoTrack App', description: 'Real-time cryptocurrency portfolio tracker with alerts and predictive analytics.', category: 'App', tags: ['Flutter', 'REST API'], featured: false, image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80' },
  ]);

  // Blogs
  await Blog.insertMany([
    { title: 'The Future of Web Development in 2025', excerpt: 'Explore the trends shaping the web development landscape this year and beyond.', content: 'Web development is evolving at an unprecedented pace. From AI-assisted coding to edge computing, the tools and techniques available to developers are transforming how we build digital experiences...', author: 'Alex Rivera', tags: ['Web Dev', 'Trends', '2025'], image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80' },
    { title: 'Why Your Business Needs a Mobile-First Strategy', excerpt: 'Mobile traffic now accounts for 60% of all web visits. Is your business ready?', content: 'The shift to mobile is not a trend — it is the reality of modern digital consumption. Businesses that fail to prioritize mobile experiences are leaving revenue on the table...', author: 'Priya Sharma', tags: ['Mobile', 'Strategy', 'UX'], image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80' },
    { title: 'Mastering SEO in the Age of AI Search', excerpt: 'How AI-powered search engines are changing the rules of SEO and what to do about it.', content: 'Google\'s AI Overviews, Perplexity, and ChatGPT search are reshaping how users discover information. Traditional keyword-stuffing is dead. What matters now is topical authority and structured data...', author: 'Marcus Chen', tags: ['SEO', 'AI', 'Google'], image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80' },
  ]);

  // Testimonials
  await Testimonial.insertMany([
    { name: 'Sarah Mitchell', role: 'CEO', company: 'TechVentures Inc.', review: 'Devluma transformed our online presence completely. Our conversion rate doubled within two months of launching the new site. Absolutely exceptional work.', rating: 5 },
    { name: 'James Okonkwo', role: 'Founder', company: 'GreenLeaf Organics', review: 'The team at Devluma delivered beyond our expectations. The mobile app they built for us has a 4.9 star rating on the App Store. Professional, creative, and reliable.', rating: 5 },
    { name: 'Elena Vasquez', role: 'Marketing Director', company: 'NovaBrand', review: 'Our SEO rankings skyrocketed after working with Devluma. We went from page 5 to the top 3 results for our primary keywords. ROI has been incredible.', rating: 5 },
    { name: 'David Park', role: 'CTO', company: 'FinanceFlow', review: 'Technically brilliant team. They tackled our complex fintech requirements with elegance and delivered a secure, scalable solution on time and on budget.', rating: 5 },
  ]);

  console.log('✅ Database seeded successfully!');
  console.log('📧 Admin email:', process.env.ADMIN_EMAIL || 'admin@devluma.com');
  console.log('🔑 Admin password:', process.env.ADMIN_PASSWORD || 'Admin@123');
  process.exit(0);
};

seed().catch((err) => { console.error(err); process.exit(1); });
