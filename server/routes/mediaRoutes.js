const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// GET all media
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('media').orderBy('createdAt', 'desc').get();
    res.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// POST new media
router.post('/', async (req, res) => {
  const { url } = req.body;
  try {
    await db.collection('media').add({ url, createdAt: new Date().toISOString() });
    res.status(201).json({ message: 'Media saved' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// DELETE media
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('media').doc(req.params.id).delete();
    res.json({ message: 'Media deleted' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

module.exports = router;