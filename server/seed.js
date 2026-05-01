require('dotenv').config();
const mongoose = require('mongoose');
const Resource = require('./models/Resource');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/calmify';

const seedData = [
  {
    title: 'Morning Mindfulness',
    description: 'Start your day with a clear mind and positive intentions with this visual journey.',
    mediaUrl: 'https://calmify-api.onrender.com/media/video1.mp4',
    type: 'VIDEO',
    category: 'MINDFULNESS',
    duration: '00:30'
  },
  {
    title: 'Deep Sleep Journey',
    description: 'A soothing video helping you drift off into deep sleep surrounded by gentle visuals.',
    mediaUrl: 'https://calmify-api.onrender.com/media/video2.mp4',
    type: 'VIDEO',
    category: 'SLEEP',
    duration: '00:06'
  },
  {
    title: 'Laser Focus',
    description: 'Dynamic visuals designed to help you maintain concentration for work or study.',
    mediaUrl: 'https://calmify-api.onrender.com/media/video3.mp4',
    type: 'VIDEO',
    category: 'FOCUS',
    duration: '00:06'
  },
  {
    title: 'Box Breathing Guide',
    description: 'Relax and reset with visual cues for the 4-4-4-4 box breathing technique.',
    mediaUrl: 'https://calmify-api.onrender.com/media/video4.mp4',
    type: 'VIDEO',
    category: 'BREATHING',
    duration: '00:08'
  },
  {
    title: 'Evening Wind Down',
    description: 'Relaxing ambient visuals to help you end your day peacefully.',
    mediaUrl: 'https://calmify-api.onrender.com/media/video5.mp4',
    type: 'VIDEO',
    category: 'MINDFULNESS',
    duration: '00:05'
  },
  {
    title: 'Ocean Waves',
    description: 'Calming sounds of the ocean waves to help you relax and fall into a deep sleep.',
    mediaUrl: 'https://calmify-api.onrender.com/media/audio1.mp3',
    type: 'AUDIO',
    category: 'SLEEP',
    duration: '02:46'
  },
  {
    title: 'Binaural Beats for Work',
    description: 'Specially tuned frequencies designed to enhance focus, productivity, and clarity of thought.',
    mediaUrl: 'https://calmify-api.onrender.com/media/audio2.mp3',
    type: 'AUDIO',
    category: 'FOCUS',
    duration: '03:23'
  },
  {
    title: 'Guided 4-7-8 Breathing',
    description: 'Calming audio guide for the 4-7-8 relaxing breath, perfect for reducing anxiety.',
    mediaUrl: 'https://calmify-api.onrender.com/media/audio3.mp3',
    type: 'AUDIO',
    category: 'BREATHING',
    duration: '03:58'
  },
  {
    title: 'Midday Meditation',
    description: 'A short mental reset to return to the present moment during a busy day.',
    mediaUrl: 'https://calmify-api.onrender.com/media/audio4.mp3',
    type: 'AUDIO',
    category: 'MINDFULNESS',
    duration: '02:49'
  },
  {
    title: 'Rainforest Rainfall',
    description: 'Nature\'s white noise - the gentle sound of rainfall for deep, restorative sleep.',
    mediaUrl: 'https://calmify-api.onrender.com/media/audio5.mp3',
    type: 'AUDIO',
    category: 'SLEEP',
    duration: '03:38'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding.');

    await Resource.deleteMany({});
    console.log('Cleared existing resources.');

    await Resource.insertMany(seedData);
    console.log('Successfully seeded 10 media resources.');

    mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
