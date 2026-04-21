require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/calmify';

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const resourceRoutes = require('./routes/resource');
const logRoutes = require('./routes/log');
const chatRoutes = require('./routes/chat');

app.use(cors({
  origin: ["http://localhost:5173", /\.vercel\.app$/]
}));
app.use(express.json());
app.use('/media', express.static(path.join(__dirname, 'public/media')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/chat', chatRoutes);

mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => res.send('Calmify API is running...'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Calmify API is running smoothly' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
