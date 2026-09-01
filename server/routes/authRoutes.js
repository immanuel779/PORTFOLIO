const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/firebase');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Look for the admin in Firestore
    const snapshot = await db.collection('admin_users').where('email', '==', email).get();
    
    if (snapshot.empty) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const admin = snapshot.docs[0].data();

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate Token
    const token = jwt.sign(
      { id: snapshot.docs[0].id, email: admin.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.json({
      token,
      admin: { id: snapshot.docs[0].id, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;