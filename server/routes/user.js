const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

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
