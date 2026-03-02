// js/firebase.js

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvOAxFK0TXjdasM3nFX-3-PXtr48pgJgw",
    authDomain: "msrtc-bus-tracking-74767.firebaseapp.com",
    databaseURL: "https://msrtc-bus-tracking-74767-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "msrtc-bus-tracking-74767",
    storageBucket: "msrtc-bus-tracking-74767.appspot.com",
    messagingSenderId: "260023567503",
    appId: "1:260023567503:web:04d763811ba4a8a2495cfa"
};

// Initialize Firebase (safe init)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Realtime Database reference
const database = firebase.database();