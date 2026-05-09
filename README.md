# 🌟 Devluma — Digital Agency MERN App

> **We Build Digital Experiences That Shine**

A full-stack MERN (MongoDB, Express, React, Node) agency website with admin dashboard, JWT auth, and a dark-theme SaaS UI.

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo>
cd devluma
npm run install:all
```

### 2. Configure Environment
```bash
# Server
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and JWT secret
```

### 3. Seed Admin Account
```bash
# Start server first, then run:
curl -X POST http://localhost:5000/api/auth/seed
# Creates: admin@devluma.com / admin123456
```

### 4. Run Development
```bash
npm run dev
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000
```

---

## 📁 Folder Structure

```
devluma/
├── client/                    # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── common/        # Navbar, Footer, SEO, Spinner
│       │   └── admin/         # AdminLayout
│       ├── context/           # AuthContext (JWT)
│       ├── pages/
│       │   ├── Home.js
│       │   ├── Services.js
│       │   ├── Portfolio.js
│       │   ├── About.js
│       │   ├── Blog.js
│       │   ├── Contact.js
│       │   └── admin/
│       │       ├── Login.js
│       │       ├── Dashboard.js
│       │       ├── Projects.js
│       │       ├── Blogs.js
│       │       ├── Testimonials.js
│       │       └── Messages.js
│       └── services/          # Axios API calls
│
└── server/                    # Node/Express backend
    ├── controllers/           # Business logic
    ├── middleware/            # Auth, validation
    ├── models/                # Mongoose schemas
    ├── routes/                # Express routes
    └── index.js               # Entry point
```

---

## 🔐 Admin Dashboard

| Route | Description |
|---|---|
| `/admin/login` | JWT login |
| `/admin` | Dashboard overview |
| `/admin/projects` | CRUD projects |
| `/admin/blogs` | CRUD blog posts |
| `/admin/testimonials` | CRUD testimonials |
| `/admin/messages` | View contact messages |

**Default credentials** (after seeding):
- Email: `admin@devluma.com`
- Password: `admin123456`

---

## 🌐 API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | No | Admin login |
| GET | `/api/auth/me` | Yes | Get current user |
| POST | `/api/auth/seed` | No | Create first admin |
| GET | `/api/projects` | No | List projects |
| POST | `/api/projects` | Admin | Create project |
| PUT | `/api/projects/:id` | Admin | Update project |
| DELETE | `/api/projects/:id` | Admin | Delete project |
| GET | `/api/blogs` | No | List blogs |
| POST | `/api/blogs` | Admin | Create blog |
| PUT | `/api/blogs/:id` | Admin | Update blog |
| DELETE | `/api/blogs/:id` | Admin | Delete blog |
| GET | `/api/testimonials` | No | List testimonials |
| POST | `/api/testimonials` | Admin | Create testimonial |
| PUT | `/api/testimonials/:id` | Admin | Update testimonial |
| DELETE | `/api/testimonials/:id` | Admin | Delete testimonial |
| POST | `/api/contact` | No | Submit contact form |
| GET | `/api/contact` | Admin | View all messages |
| PUT | `/api/contact/:id/read` | Admin | Mark as read |
| DELETE | `/api/contact/:id` | Admin | Delete message |

---

## 🎨 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Tailwind CSS, Framer Motion |
| Routing | React Router v6 |
| State | Context API + useState |
| HTTP | Axios |
| SEO | React Helmet Async |
| Notifications | React Hot Toast |
| Icons | React Icons (Feather) |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT + bcryptjs |
| Security | Helmet, CORS, Rate Limiting |

---

## 🚢 Deployment

### Frontend → Vercel
```bash
cd client
npm run build
# Push to GitHub → Import in Vercel
# Set REACT_APP_API_URL to your Render backend URL
```

### Backend → Render
```bash
# Push server/ to GitHub
# Create Web Service on Render
# Set environment variables in Render dashboard:
# MONGO_URI, JWT_SECRET, CLIENT_URL, NODE_ENV=production
```

### Database → MongoDB Atlas
1. Create cluster at mongodb.com
2. Get connection string
3. Set as MONGO_URI in your env

---

## ✨ Features

- ✅ Dark theme with blue/purple glowing accents
- ✅ Fully responsive (mobile-first)
- ✅ Smooth Framer Motion animations
- ✅ JWT authentication with persistent sessions
- ✅ Protected admin routes
- ✅ Full CRUD for Projects, Blogs, Testimonials
- ✅ Contact form with MongoDB storage
- ✅ SEO meta tags on every page
- ✅ Rate limiting & security headers
- ✅ Error handling middleware
- ✅ Toast notifications
- ✅ Portfolio category filtering
- ✅ Lazy-loaded pages
- ✅ Code splitting
- ✅ Clean folder structure
