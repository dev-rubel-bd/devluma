const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Testimonial = require('../models/Testimonial');

router.get('/run', async (req, res) => {
  const secret = req.query.secret;
  if (secret !== process.env.SEED_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await Promise.all([User.deleteMany(), Project.deleteMany(), Blog.deleteMany(), Testimonial.deleteMany()]);

  await User.create({
    name: 'Devluma Admin',
    email: 'admin@devluma.com',
    password: 'Admin@123'
  });

  res.json({ success: true, message: '✅ Database seeded!' });
});

module.exports = router;