// Dependencies
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const envData = {"TOMA CUIDADO BIXO"};

const firebaseConfig = envData;

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const database = getDatabase();

export { auth, database };
