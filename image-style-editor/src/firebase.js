// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// ✅ Your actual Firebase config (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyD7WZ39ftI4ialRI13ydBGhTs1KTVUe46o",
  authDomain: "lubaba-editor.firebaseapp.com",
  projectId: "lubaba-editor",
  storageBucket: "lubaba-editor.appspot.com", // correct this key
  messagingSenderId: "1055808583483",
  appId: "1:1055808583483:web:d8fe230cca44800633691e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase modules
export const auth = getAuth(app);
export const storage = getStorage(app);
