// Dependencies
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

console.log("envData");

/*
REACT_APP_API_KEY="AIzaSyBXkse2VupCATNEkzSaigRYWHsklFZz_A4"
REACT_APP_AUTHDOMAIN="letmeask-f5b3c.firebaseapp.com"
REACT_APP_PROJECT_ID="letmeask-f5b3c"
REACT_APP_STORAGE_BUCKET="letmeask-f5b3c.appspot.com"
REACT_APP_MESSAGING_SENDER_ID="1023281800946"
REACT_APP_APP_ID="1:1023281800946:web:c0ca6e91a0baf3626a526b"*/

/*
const envData = {
  apiKey: "AIzaSyBXkse2VupCATNEkzSaigRYWHsklFZz_A4",
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
*/

// Your web app's Firebase configuration
const envData = {
  apiKey: "AIzaSyBXkse2VupCATNEkzSaigRYWHsklFZz_A4",
  authDomain: "letmeask-f5b3c.firebaseapp.com",
  projectId: "letmeask-f5b3c",
  storageBucket: "letmeask-f5b3c.appspot.com",
  messagingSenderId: "1023281800946",
  appId: "1:1023281800946:web:c0ca6e91a0baf3626a526b",
};

console.log(envData);

const firebaseConfig = envData;

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const database = getDatabase();

export { auth, database };
