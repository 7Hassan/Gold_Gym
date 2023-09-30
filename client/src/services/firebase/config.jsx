
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBCA1gmPlS4haQNaNUGE0FzeQOwBqz5zLk",
  authDomain: "gold-gym-45055.firebaseapp.com",
  projectId: "gold-gym-45055",
  storageBucket: "gold-gym-45055.appspot.com",
  messagingSenderId: "283877876505",
  appId: "1:283877876505:web:cc980681f4fb2f70e5db88",
  measurementId: "G-JVJBZ08DZ1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);




