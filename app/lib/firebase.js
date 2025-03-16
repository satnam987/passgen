// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5MSx8Eb1YcDZnpLEmSMPudLBUMvrY9IM",
  authDomain: "passgen-5371c.firebaseapp.com",
  projectId: "passgen-5371c",
  storageBucket: "passgen-5371c.firebasestorage.app",
  messagingSenderId: "630522108250",
  appId: "1:630522108250:web:a956318a3696eb7304fb63",
  measurementId: "G-Q8FHNPBVHL"
};

console.log('Initializing Firebase app...');

// Controleer of Firebase al is geïnitialiseerd om dubbele initialisaties te voorkomen
let app;
let auth;
let db;

try {
  // Probeer Firebase te initialiseren
  app = initializeApp(firebaseConfig);
  console.log('Firebase app successfully initialized');
  
  // Auth initialiseren
  auth = getAuth(app);
  console.log('Firebase auth successfully initialized');
  
  // Firestore initialiseren
  db = getFirestore(app);
  console.log('Firestore successfully initialized');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

console.log('Firebase setup complete');

export { auth, db }; 