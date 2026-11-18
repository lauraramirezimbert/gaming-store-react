import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlt3jEWlyiDcXQuxggvd3i9W9-GromESo",
  authDomain: "gaming-store1.firebaseapp.com",
  projectId: "gaming-store1",
  storageBucket: "gaming-store1.firebasestorage.app",
  messagingSenderId: "487182630298",
  appId: "1:487182630298:web:779b9bacd24317eacd8e23",
  measurementId: "G-1D5R9YCS9F"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);