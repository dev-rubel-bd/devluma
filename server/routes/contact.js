const express = require('express');
const router = express.Router();
const { createContact, getContacts, markRead, deleteContact } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/auth');
const { validateContact } = require('../middleware/validate');

router.post('/', validateContact, createContact);
router.get('/', protect, adminOnly, getContacts);
router.put('/:id/read', protect, adminOnly, markRead);
router.delete('/:id', protect, adminOnly, deleteContact);
module.exports = router;
