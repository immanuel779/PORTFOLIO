const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// GET all subscribers
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('subscribers').orderBy('createdAt', 'desc').get();
    const subscribers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new subscriber
router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  try {
    const snapshot = await db.collection('subscribers').where('email', '==', email).get();
    if (!snapshot.empty) return res.status(200).json({ message: 'Email already subscribed!' });
    await db.collection('subscribers').add({ email, createdAt: new Date().toISOString() });
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a subscriber
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('subscribers').doc(req.params.id).delete();
    res.json({ message: 'Subscriber deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;