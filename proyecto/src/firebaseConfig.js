// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW37ci81srotxAzSD8jT2L23c7BaJQtjY",
  authDomain: "yigi-api.firebaseapp.com",
  projectId: "yigi-api",
  storageBucket: "yigi-api.firebasestorage.app",
  messagingSenderId: "948742619184",
  appId: "1:948742619184:web:b89d04354a87c6a51d2df5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ ¡Esto es necesario!
export { auth, db };