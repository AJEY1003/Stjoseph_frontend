// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCzOsAg3QjoY3NKZzmw5mpcxFS-pjMs7sY",
  authDomain: "resume-parser-41bda.firebaseapp.com",
  projectId: "resume-parser-41bda",
  storageBucket: "resume-parser-41bda.firebasestorage.app",
  messagingSenderId: "53344284599",
  appId: "1:53344284599:web:c34195b4ad18ba1357c232",
  measurementId: "G-3YBPS2C4QX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { auth,app };