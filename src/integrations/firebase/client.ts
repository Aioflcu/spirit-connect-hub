// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0lmURf7yvJHk0xU_jABF79n5us6Flczs",
  authDomain: "jesus-discipleship-ministry.firebaseapp.com",
  projectId: "jesus-discipleship-ministry",
  storageBucket: "jesus-discipleship-ministry.firebasestorage.app",
  messagingSenderId: "951115597326",
  appId: "1:951115597326:web:056c94ce417f1f9a5dde5f",
  measurementId: "G-6KBJNR4K0H"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Analytics (only in production)
let analytics;
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;