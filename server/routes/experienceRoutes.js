const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// GET all experiences
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('experiences').orderBy('start', 'desc').get();
    const experiences = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new experience
router.post('/', async (req, res) => {
  const { role, company, location, start, end, desc, tech } = req.body;
  try {
    await db.collection('experiences').add({
      role,
      company,
      location,
      start,
      end,
      desc,
      tech: tech || [],
      createdAt: new Date().toISOString()
    });
    res.status(201).json({ message: 'Experience added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE an experience
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('experiences').doc(req.params.id).delete();
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;