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

  try {
    await User.deleteMany();
    await Project.deleteMany();
    await Blog.deleteMany();
    await Testimonial.deleteMany();

    const user = new User({
      name: 'Devluma Admin',
      email: 'admin@devluma.com',
      password: 'Admin@123'
    });
    await user.save();

    res.json({ success: true, message: '✅ Database seeded!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;