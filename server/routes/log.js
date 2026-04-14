const express = require('express');
const MoodLog = require('../models/MoodLog');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/daily', auth, async (req, res) => {
  try {
    const { score, entry, prompt } = req.body;
    
    // Find the current user and their last log for streak calculation
    const user = await User.findById(req.userId);
    const lastLog = await MoodLog.findOne({ user: req.userId }).sort({ date: -1 });
    
    let newStreak = user.currentStreak || 0;
    
    if (lastLog) {
      const lastDate = new Date(lastLog.date);
      const today = new Date();
      
      lastDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      
      const diffTime = Math.abs(today - lastDate);
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
      // If diffDays === 0, keep the existing streak
    } else {
      newStreak = 1; // First log
    }

    user.currentStreak = newStreak;
    await user.save();

    const newMoodLog = await MoodLog.create({
      user: req.userId,
      score,
      entry,
      prompt
    });
    
    res.status(201).json({ log: newMoodLog, currentStreak: newStreak });
  } catch (error) {
    console.error("Daily log error: ", error);
    res.status(500).json({ message: 'Failed to create mood log' });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const logs = await MoodLog.find({ user: req.userId })
      .sort({ date: -1 })
      .limit(30);
    
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch mood history' });
  }
});

module.exports = router;
