const express = require('express');
const Resource = require('../models/Resource');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/recommended', auth, async (req, res) => {
  try {
    // In a real app we'd filter resources based on User's triggers.
    // For now we'll just return some matching the MockData structure.
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommend resources' });
  }
});

module.exports = router;
