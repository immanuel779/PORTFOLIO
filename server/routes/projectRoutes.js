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

// POST a new project
router.post('/', async (req, res) => {
  const { title, description, category, technologies, image, githubUrl, liveUrl, featured } = req.body;
  try {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
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

// PUT (UPDATE) a project
router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, technologies, image, githubUrl, liveUrl, featured } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    await db.collection('projects').doc(req.params.id).update({
      title, slug, description, category, technologies, image, githubUrl, liveUrl,
      featured: featured || false
    });
    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a project
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('projects').doc(req.params.id).delete();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;