const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// GET settings
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('settings').limit(1).get();
    if (snapshot.empty) {
      return res.json({});
    }
    res.json(snapshot.docs[0].data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT / Save settings
router.put('/', async (req, res) => {
  try {
    const data = req.body;
    const snapshot = await db.collection('settings').limit(1).get();

    if (snapshot.empty) {
      await db.collection('settings').add({ ...data });
    } else {
      await db.collection('settings').doc(snapshot.docs[0].id).update({ ...data });
    }

    res.json({ message: 'Settings saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;