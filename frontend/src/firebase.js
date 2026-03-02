// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApT472C58rbHGbemYSUQYapIpV5rOEYuI",
  authDomain: "hoth-330a2.firebaseapp.com",
  projectId: "hoth-330a2",
  storageBucket: "hoth-330a2.firebasestorage.app",
  messagingSenderId: "922786002710",
  appId: "1:922786002710:web:223d83d7f26760deb0c237",
  measurementId: "G-EQ7Z37X1P8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);