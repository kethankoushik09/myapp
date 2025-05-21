// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgJMACbOjSMHXx_W60qi44VS7qdA9tS-I",
  authDomain: "enable-authentication-96748.firebaseapp.com",
  projectId: "enable-authentication-96748",
  storageBucket: "enable-authentication-96748.firebasestorage.app",
  messagingSenderId: "510764091860",
  appId: "1:510764091860:web:4d5472199c49825fde2e41",
  measurementId: "G-Q27DZKXR7H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
