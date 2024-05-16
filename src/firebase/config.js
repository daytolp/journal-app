import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getEnviroments } from '../helpers/getEnviroments';

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID
} = getEnviroments();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//Desarrollo
// const firebaseConfig = {
//   apiKey: "AIzaSyCldyhTmGcsjNjC6Ar0Oak2WOvdr1h4h0E",
//   authDomain: "journal-app-b220b.firebaseapp.com",
//   projectId: "journal-app-b220b",
//   storageBucket: "journal-app-b220b.appspot.com",
//   messagingSenderId: "751419241807",
//   appId: "1:751419241807:web:ee03069f7225838b62013a"
// };


//Testing
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID
};
console.log(firebaseConfig);

//no reconoce este comando jest, pero vite silo reconoce y node
// console.log(import.meta.env)
//comando funciona en jest pero al correr la aplicacion VITe no lo reconoce
// console.log(process.env)



// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
