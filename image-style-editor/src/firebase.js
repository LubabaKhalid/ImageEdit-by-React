// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7WZ39ftI4ialRI13ydBGhTs1KTVUe46o",
  authDomain: "lubaba-editor.firebaseapp.com",
  projectId: "lubaba-editor",
  storageBucket: "lubaba-editor.appspot.com",  // ✅ Fix here: NOT `firebasestorage.app`
  messagingSenderId: "1055808583483",
  appId: "1:1055808583483:web:d8fe230cca44800633691e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
