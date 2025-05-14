
const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const { auth } = require('../middleware/auth');
const { getGeminiResponse } = require('../ai/gemini');

// Get user's chats
router.get('/', auth, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id })
      .select('id title messages createdAt')
      .sort({ createdAt: -1 });
    
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch chats', error: error.message });
  }
});

// Create a new chat or send message to existing chat
router.post('/', auth, async (req, res) => {
  try {
    const { message, chatId } = req.body;
    console.log('Received message:', message);
    console.log('Chat ID:', chatId);
    let chat;
    
    if (chatId) {
      // Add message to existing chat
      chat = await Chat.findOne({ _id: chatId, userId: req.user._id });
      
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }
      
      chat.messages.push({
        content: message,
        role: 'user'
      });
      
      // Generate AI response (simplified for now)
      // const aiResponse = `This is a sample response to: "${message}"`;
      const aiResponse = await getGeminiResponse(message, chat.messages);
      
      chat.messages.push({
        content: aiResponse,
        role: 'assistant'
      });
      
      await chat.save();
      
      res.status(201).json({ message: aiResponse,chatId: chat._id });
    } else {
      // Create new chat
      chat = new Chat({
        userId: req.user._id,
        title: message.substring(0, 30),
        messages: [
          {
            content: message,
            role: 'user'
          }
        ]
      });
      
      // Generate AI response (simplified for now)
      // const aiResponse = `This is a sample response to: "${message}"`;
      const aiResponse = await getGeminiResponse(message,[{
        content: message,
        role: 'user'
      }]);
      
      chat.messages.push({
        content: aiResponse,
        role: 'assistant'
      });
      
      await chat.save();
      
      res.status(201).json({ 
        chatId: chat._id,
        message: aiResponse,
      });
    }
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ message: 'Failed to process message', error: error.message });
  }
});

// Delete chat
router.delete('/:chatId', auth, async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({ 
      _id: req.params.chatId, 
      userId: req.user._id 
    });
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete chat', error: error.message });
  }
});

module.exports = router;
