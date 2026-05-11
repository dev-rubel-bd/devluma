const express = require('express');
const router = express.Router();
const { login, getMe, seedAdmin, debugLogin } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/seed', seedAdmin);
router.get('/debug', debugLogin);

module.exports = router;