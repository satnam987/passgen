// app/lib/firebase.ts
// Simplified Firebase configuration
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

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

// Initialize Firebase only if it hasn't been initialized already
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  if (!getApps().length) {
    console.log("Initializing Firebase app...");
    app = initializeApp(firebaseConfig);
  } else {
    console.log("Firebase already initialized, reusing instance");
    app = getApps()[0];
  }
  
  auth = getAuth(app);
  db = getFirestore(app);
  console.log("Firebase services initialized successfully");
} catch (error) {
  console.error("CRITICAL: Firebase initialization failed:", error);
  // Create a minimal auth mock that satisfies the Auth interface
  auth = {
    currentUser: null,
    onAuthStateChanged: (observer: any) => { 
      observer(null); 
      return () => {}; 
    },
    signOut: async () => Promise.resolve(),
  } as Auth;
  
  db = {} as Firestore;
}

export { auth, db }; 