const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// GET all certificates
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('certificates').orderBy('year', 'desc').get();
    const certificates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new certificate
router.post('/', async (req, res) => {
  const { title, issuer, year, link, image } = req.body;
  try {
    await db.collection('certificates').add({
      title,
      issuer,
      year,
      link,
      image: image || '', // Accept image URL from Cloudinary
      createdAt: new Date().toISOString()
    });
    res.status(201).json({ message: 'Certificate added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a certificate
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('certificates').doc(req.params.id).delete();
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;