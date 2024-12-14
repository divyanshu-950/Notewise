
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,GithubAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAYcdDiRmvGum32gUdetOYjCJ_Mnu1ELo",
  authDomain: "notewise-ec628.firebaseapp.com",
  projectId: "notewise-ec628",
  storageBucket: "notewise-ec628.firebasestorage.app",
  messagingSenderId: "704709617621",
  appId: "1:704709617621:web:0368c287a37b2158833f5c",
  measurementId: "G-GRW628CH35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const db = getFirestore();