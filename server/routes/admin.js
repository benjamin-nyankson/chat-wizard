
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Chat = require('../models/Chat');
const { adminAuth } = require('../middleware/auth');

// Get all users (admin only)
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

// Get all chats (admin only)
router.get('/chats', adminAuth, async (req, res) => {
  try {
    const chats = await Chat.find()
      .populate('userId', 'email')
      .sort({ createdAt: -1 });
    
    // Format the response to match expected format in frontend
    const formattedChats = chats.map(chat => ({
      id: chat._id,
      title: chat.title || 'Untitled Chat',
      userId: chat.userId._id,
      userEmail: chat.userId.email,
      messageCount: chat.messages.length,
      createdAt: chat.createdAt
    }));
    
    res.json(formattedChats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch chats', error: error.message });
  }
});

module.exports = router;
