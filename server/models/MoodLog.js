const mongoose = require('mongoose');

const moodLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  prompt: {
    type: String,
    default: 'What is one thing that brought you peace today, no matter how small?',
  },
  entry: {
    type: String,
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('MoodLog', moodLogSchema);
