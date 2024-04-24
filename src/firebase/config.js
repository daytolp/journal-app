import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCldyhTmGcsjNjC6Ar0Oak2WOvdr1h4h0E",
  authDomain: "journal-app-b220b.firebaseapp.com",
  projectId: "journal-app-b220b",
  storageBucket: "journal-app-b220b.appspot.com",
  messagingSenderId: "751419241807",
  appId: "1:751419241807:web:ee03069f7225838b62013a"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
