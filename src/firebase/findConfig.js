// findConfig.js
// This file initializes and exports the Firebase configuration specifically for Find Questions functionality.
// It uses a separate Firebase project optimized for posts/questions data.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration for Find Questions/Posts functionality
const findFirebaseConfig = {
  apiKey: "AIzaSyAdDjeHiulnbd2VcUi4h4Vo7DcZrKVqsMU",
  authDomain: "sit313-task-8-1d-b4710.firebaseapp.com",
  projectId: "sit313-task-8-1d-b4710",
  storageBucket: "sit313-task-8-1d-b4710.firebasestorage.app",
  messagingSenderId: "228515304155",
  appId: "1:228515304155:web:2b9826f5a72c9a79e072fe"
};

// Initialize Firebase for Find functionality
const findApp = initializeApp(findFirebaseConfig, 'findApp');

// Initialize Firestore Database for posts/questions
export const findDb = getFirestore(findApp);

export default findApp;