// Dependencies
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const envData = {
  apiKey: "AIzaSyBXkse2VupCATNEkzSaigRYWHsklFZz_A4",
  authDomain: "letmeask-f5b3c.firebaseapp.com",
  projectId: "letmeask-f5b3c",
  storageBucket: "letmeask-f5b3c.appspot.com",
  messagingSenderId: "1023281800946",
  appId: "1:1023281800946:web:c0ca6e91a0baf3626a526b",
};

const firebaseConfig = envData;

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const database = getDatabase();

export { auth, database };
