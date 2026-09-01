const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { protect } = require('../middleware/authMiddleware');

// GET all blogs (Public)
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('blog_posts').orderBy('createdAt', 'desc').get();
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single blog by slug (Public)
router.get('/:slug', async (req, res) => {
  try {
    const snapshot = await db.collection('blog_posts').where('slug', '==', req.params.slug).limit(1).get();
    if (snapshot.empty) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    const post = snapshot.docs[0].data();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new blog (Protected)
router.post('/', protect, async (req, res) => {
  const { title, excerpt, content, category, image, author } = req.body;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  try {
    await db.collection('blog_posts').add({
      title, slug, excerpt, content, category, image, author: author || 'Oluwadamilare',
      published: true,
      createdAt: new Date().toISOString()
    });
    res.status(201).json({ message: 'Blog added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a blog (Protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    await db.collection('blog_posts').doc(req.params.id).delete();
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;