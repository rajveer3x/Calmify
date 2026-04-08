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

module.exports = router;
