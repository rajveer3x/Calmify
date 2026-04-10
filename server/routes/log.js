const express = require('express');
const MoodLog = require('../models/MoodLog');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/daily', auth, async (req, res) => {
  try {
    const { score, entry, prompt } = req.body;
    
    const newMoodLog = await MoodLog.create({
      user: req.userId,
      score,
      entry,
      prompt
    });
    
    res.status(201).json(newMoodLog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create mood log' });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const logs = await MoodLog.find({ user: req.userId })
      .sort({ date: 1 })
      .limit(30);
    
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch mood history' });
  }
});

module.exports = router;
