// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_GPfATJV0dlH-yuY2VicaLcO41HnD6ho",
  authDomain: "lixe-b0484.firebaseapp.com",
  projectId: "lixe-b0484",
  storageBucket: "lixe-b0484.firebasestorage.app",
  messagingSenderId: "355376143658",
  appId: "1:355376143658:web:ecf99e972f7ff5f51d5253",
  measurementId: "G-FV91JW2B3T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);