// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-28514.firebaseapp.com",
  projectId: "mern-estate-28514",
  storageBucket: "mern-estate-28514.appspot.com",
  messagingSenderId: "521710825378",
  appId: "1:521710825378:web:d9d6fb52b972c1942accfb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);