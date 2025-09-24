// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// This file initializes the Firebase app and exports the main Firebase services used in the app.

// Firebase configuration object, values are loaded from environment variables for security.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // Firebase API key for authentication
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,  // Domain for Firebase Auth
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,  // Project ID for Firebase
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, // Storage bucket for Firestore
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, // Sender ID for messaging
  appId: process.env.REACT_APP_FIREBASE_APP_ID, // App ID for Firebase project
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID // Measurement ID for Analytics
};

// Initialize the Firebase app instance
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication instance for user sign-in/sign-up
export const auth = getAuth(app);

// Export Firestore instance for storing user data
export const db = getFirestore(app);

// Export Analytics instance (optional, for usage tracking)
export const analytics = getAnalytics(app);

// Export the initialized app (not commonly used directly)
export default app;