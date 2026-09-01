const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// GET settings (Public or Admin, but we'll keep it public so the frontend can load it)
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('settings').limit(1).get();
    if (snapshot.empty) {
      return res.json({}); // Return empty object if no settings saved yet
    }
    res.json(snapshot.docs[0].data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT / Save settings (Admin only - but since we haven't implemented security middleware here yet, it's just a standard route)
router.put('/', async (req, res) => {
  try {
    const data = req.body;
    const snapshot = await db.collection('settings').limit(1).get();

    if (snapshot.empty) {
      // If no settings exist, create a new document
      await db.collection('settings').add({ ...data });
    } else {
      // If settings exist, update the existing document
      await db.collection('settings').doc(snapshot.docs[0].id).update({ ...data });
    }

    res.json({ message: 'Settings saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;