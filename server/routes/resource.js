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

router.get('/:id', auth, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    // Returning under a payload wrapper just in case the client expects it based on user description
    res.status(200).json({ payload: resource });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resource' });
  }
});

module.exports = router;
