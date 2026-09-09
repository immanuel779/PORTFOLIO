const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/firebase');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const snapshot = await db.collection('admin_users').where('email', '==', email).get();
    if (snapshot.empty) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const admin = snapshot.docs[0].data();
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

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
// POST /api/auth/change-password
router.post('/change-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { db } = require('../config/firebase');

  try {
    // Find admin
    const snapshot = await db.collection('admin_users').limit(1).get();
    const adminDoc = snapshot.docs[0];
    const admin = adminDoc.data();

    // Verify current password
    const bcrypt = require('bcryptjs');
    const isMatch = await bcrypt.compare(currentPassword, admin.password_hash);
    if (!isMatch) return res.status(401).json({ message: 'Current password is wrong' });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update in database
    await db.collection('admin_users').doc(adminDoc.id).update({ password_hash: hashedPassword });
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;