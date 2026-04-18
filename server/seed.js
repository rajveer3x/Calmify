require('dotenv').config();
const mongoose = require('mongoose');
const Resource = require('./models/Resource');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/calmify';

const seedData = [
  {
    title: 'Morning Mindfulness',
    description: 'Start your day with a clear mind and positive intentions with this visual journey.',
    mediaUrl: 'http://localhost:5000/media/video1.mp4',
    type: 'VIDEO',
    category: 'MINDFULNESS',
    duration: '05:00'
  },
  {
    title: 'Deep Sleep Journey',
    description: 'A soothing video helping you drift off into deep sleep surrounded by gentle visuals.',
    mediaUrl: 'http://localhost:5000/media/video2.mp4',
    type: 'VIDEO',
    category: 'SLEEP',
    duration: '10:00'
  },
  {
    title: 'Laser Focus',
    description: 'Dynamic visuals designed to help you maintain concentration for work or study.',
    mediaUrl: 'http://localhost:5000/media/video3.mp4',
    type: 'VIDEO',
    category: 'FOCUS',
    duration: '15:00'
  },
  {
    title: 'Box Breathing Guide',
    description: 'Relax and reset with visual cues for the 4-4-4-4 box breathing technique.',
    mediaUrl: 'http://localhost:5000/media/video4.mp4',
    type: 'VIDEO',
    category: 'BREATHING',
    duration: '03:00'
  },
  {
    title: 'Evening Wind Down',
    description: 'Relaxing ambient visuals to help you end your day peacefully.',
    mediaUrl: 'http://localhost:5000/media/video5.mp4',
    type: 'VIDEO',
    category: 'MINDFULNESS',
    duration: '10:00'
  },
  {
    title: 'Ocean Waves',
    description: 'Calming sounds of the ocean waves to help you relax and fall into a deep sleep.',
    mediaUrl: 'http://localhost:5000/media/audio1.mp3',
    type: 'AUDIO',
    category: 'SLEEP',
    duration: '30:00'
  },
  {
    title: 'Binaural Beats for Work',
    description: 'Specially tuned frequencies designed to enhance focus, productivity, and clarity of thought.',
    mediaUrl: 'http://localhost:5000/media/audio2.mp3',
    type: 'AUDIO',
    category: 'FOCUS',
    duration: '45:00'
  },
  {
    title: 'Guided 4-7-8 Breathing',
    description: 'Calming audio guide for the 4-7-8 relaxing breath, perfect for reducing anxiety.',
    mediaUrl: 'http://localhost:5000/media/audio3.mp3',
    type: 'AUDIO',
    category: 'BREATHING',
    duration: '05:00'
  },
  {
    title: 'Midday Meditation',
    description: 'A short mental reset to return to the present moment during a busy day.',
    mediaUrl: 'http://localhost:5000/media/audio4.mp3',
    type: 'AUDIO',
    category: 'MINDFULNESS',
    duration: '10:00'
  },
  {
    title: 'Rainforest Rainfall',
    description: 'Nature\'s white noise - the gentle sound of rainfall for deep, restorative sleep.',
    mediaUrl: 'http://localhost:5000/media/audio5.mp3',
    type: 'AUDIO',
    category: 'SLEEP',
    duration: '60:00'
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
