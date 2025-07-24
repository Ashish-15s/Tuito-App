// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
    getAuth,
    PhoneAuthProvider,
    signInWithCredential
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyXXXXXX-XXXXXX-XXXXXX-XXXXXX",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-app-id",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "123456789000",
    appId: "1:123456789000:web:xxxxxxxxxxxxxxxxxxxxxx",
    measurementId: "G-XXXXXXXXXX"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, PhoneAuthProvider, signInWithCredential, firebaseConfig };
