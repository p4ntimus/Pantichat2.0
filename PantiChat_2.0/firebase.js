import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCbe4dvCPu-ndp5acsryDoFwGMpj7-1ESg",
  authDomain: "panti-chat.firebaseapp.com",
  projectId: "panti-chat",
  storageBucket: "panti-chat.firebasestorage.app",
  messagingSenderId: "912194314362",
  appId: "1:912194314362:web:094473e28ad20afca7dbc3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
