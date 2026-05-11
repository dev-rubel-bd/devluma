const express = require('express');
const router = express.Router();
const { login, getMe, seedAdmin } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const { login, getMe, seedAdmin, debugLogin } = require('../controllers/authController');
router.get('/debug', debugLogin);

router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/seed', seedAdmin); // Only for initial setup
router.get('/seed', seedAdmin);
module.exports = router;
