const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load user profile' });
  }
});

router.post('/onboarding', auth, async (req, res) => {
  try {
    const { triggers } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.userId, 
      { triggers }, 
      { new: true }
    ).select('-password');
    
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save onboarding data' });
  }
});

module.exports = router;
