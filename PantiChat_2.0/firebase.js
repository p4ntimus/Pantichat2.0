// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAzFRIp6IYfAUGyZyiH3WVk3dxwO2KvQ-I",
  authDomain: "pantichat-2.firebaseapp.com",
  projectId: "pantichat-2",
  storageBucket: "pantichat-2.appspot.com",
  messagingSenderId: "456586664401",
  appId: "1:456586664401:web:a9995e6d40f22d901be8f0"
};

// Firebase starten
firebase.initializeApp(firebaseConfig);

// Firestore aktivieren
const db = firebase.firestore();
