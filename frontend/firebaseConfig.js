// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
    getAuth,
    PhoneAuthProvider,
    signInWithCredential
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCuPIv5QQ98D7zvWgtz86Or1RGXMF7k0t8",
    authDomain: "tuito-app-a29e3.firebaseapp.com",
    projectId: "tuito-app-a29e3",
    storageBucket: "tuito-app-a29e3.firebasestorage.app",
    messagingSenderId: "254225366531",
    appId: "1:254225366531:web:61dfe558c75c476082d836",
    measurementId: "G-YNPM1PRBZL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, PhoneAuthProvider, signInWithCredential, firebaseConfig };
