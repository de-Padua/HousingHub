// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-MCpaQV487CEuJfUzBWoqJNrfARYfA2c",
  authDomain: "househub-a8883.firebaseapp.com",
  projectId: "househub-a8883",
  storageBucket: "househub-a8883.appspot.com",
  messagingSenderId: "3044476656",
  appId: "1:3044476656:web:b49f55721c760ab7f7a435"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
