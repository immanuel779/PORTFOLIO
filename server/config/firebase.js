const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

let serviceAccount;

// If running on Render, use the Environment Variable
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // If running locally, use the local file
  serviceAccount = require('../serviceAccountKey.json');
}

const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore(app);

module.exports = { db };