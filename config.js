// Firebase configuration
try {
    window.FIREBASE_CONFIG = {
        apiKey: "AIzaSyDo_5A2lc-Qx6D6i7EC1lUxnX_j2BOuKjo",  // Firebase Web API key
        authDomain: "ethanshahbazdotcom.firebaseapp.com",
        projectId: "ethanshahbazdotcom",
        storageBucket: "ethanshahbazdotcom.firebasestorage.app",
        messagingSenderId: "1027880222115",
        appId: "1:1027880222115:web:3f8c75167d110cbeeeee16",
        measurementId: "G-NDF9C5NDHX"
    };
    console.log('Firebase config loaded successfully');
} catch (error) {
    console.error('Error loading Firebase config:', error);
} 