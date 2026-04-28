const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { calculateAndUpdateStreak } = require('../utils/streak');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  try {
    let user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await calculateAndUpdateStreak(user);
    const userProfile = user.toObject();
    delete userProfile.password;

    res.status(200).json(userProfile);
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

router.get('/stats', auth, async (req, res) => {
  try {
    let user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user = await calculateAndUpdateStreak(user);
    
    const totalUsers = await User.countDocuments();
    const usersWithLowerStreak = await User.countDocuments({ currentStreak: { $lt: user.currentStreak } });
    
    let trackingBetterThanPercent = 0;
    if (totalUsers > 1) {
      trackingBetterThanPercent = Math.round((usersWithLowerStreak / totalUsers) * 100);
    } else if (totalUsers === 1 && user.currentStreak > 0) {
      // If it's the only user, give them some positive reinforcement if they have a streak
      trackingBetterThanPercent = 100;
    }
    
    res.status(200).json({ 
      currentStreak: user.currentStreak, 
      trackingBetterThanPercent 
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate stats' });
  }
});

module.exports = router;
