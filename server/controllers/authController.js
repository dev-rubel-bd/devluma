const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

exports.seedAdmin = async (req, res) => {
  try {
    await User.deleteMany();

    const admin = new User({
      name: 'Devluma Admin',
      email: 'admin@devluma.com',
      password: 'admin123456',
      role: 'admin'
    });
    await admin.save();

    res.status(201).json({ message: 'Admin created', email: admin.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.debugLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: 'admin@devluma.com' });
    if (!user) return res.json({ error: 'User not found' });

    const isMatch = await bcrypt.compare('admin123456', user.password);

    res.json({
      userFound: true,
      email: user.email,
      passwordMatch: isMatch
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};