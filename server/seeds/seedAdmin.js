// Use the new modular import for Firebase Admin
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const bcrypt = require('bcryptjs');
const serviceAccount = require('../serviceAccountKey.json');

const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore(app);

const seedAdmin = async () => {
  const email = 'admin@opeyemi.com';
  const password = 'Admin12345!'; 
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const snapshot = await db.collection('admin_users').where('email', '==', email).get();
    if (!snapshot.empty) {
      console.log('Admin already exists!');
      process.exit();
    }

    await db.collection('admin_users').add({
      email: email,
      password_hash: hashedPassword,
      createdAt: new Date().toISOString()
    });

    console.log('Admin created!');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();