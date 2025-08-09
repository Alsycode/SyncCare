// backend/routes/chat.js
const express = require('express');
const Chat = require('../models/Chat');
const User = require('../models/User');
const auth = require('../middleware/auth');
const isDoctor = require('../middleware/isDoctor');
const router = express.Router();

// Get Chat History for Patient or Doctor
router.get('/history/:otherUserId', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const otherUserId = req.params.otherUserId;
    const messages = await Chat.find({
      $or: [
        { patientId: userId, doctorId: otherUserId },
        { patientId: otherUserId, doctorId: userId },
      ],
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;