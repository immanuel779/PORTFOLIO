const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// GET all skills
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('skills').orderBy('createdAt', 'desc').get();
    const skills = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new skill
router.post('/', async (req, res) => {
  const { name, level } = req.body;
  try {
    await db.collection('skills').add({
      name,
      level,
      createdAt: new Date().toISOString()
    });
    res.status(201).json({ message: 'Skill added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a skill
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('skills').doc(req.params.id).delete();
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;