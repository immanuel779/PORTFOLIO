const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('projects').orderBy('createdAt', 'desc').get();
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new project (Auto-generates slug!)
router.post('/', async (req, res) => {
  const { title, description, category, technologies, image, githubUrl, liveUrl, featured } = req.body;
  
  // Generate slug from title if not provided
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  try {
    await db.collection('projects').add({
      title, slug, description, category, technologies, image, githubUrl, liveUrl, 
      featured: featured || false,
      createdAt: new Date().toISOString()
    });
    res.status(201).json({ message: 'Project added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;