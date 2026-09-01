const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// GET all messages
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('messages').orderBy('createdAt', 'desc').get();
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a contact message
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  try {
    await db.collection('messages').add({
      name, email, phone, subject, message,
      status: 'unread',
      createdAt: new Date().toISOString()
    });
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT (Mark as Read)
router.put('/:id', async (req, res) => {
  try {
    await db.collection('messages').doc(req.params.id).update({ status: 'read' });
    res.json({ message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a message
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('messages').doc(req.params.id).delete();
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;