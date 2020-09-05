// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAq-xoGrA9R_4mADvkEB0o6091_dDtaPkc",
    authDomain: "expo-app-4aba1.firebaseapp.com",
    databaseURL: "https://expo-app-4aba1.firebaseio.com",
    projectId: "expo-app-4aba1",
    storageBucket: "expo-app-4aba1.appspot.com",
    messagingSenderId: "955343116626",
    appId: "1:955343116626:web:c267a0f0127674b713828b",
    measurementId: "G-WZXCYSLXKC"
};

// In /utils/firebase.js
// We should import firebase from this module instead of the default package.
import * as firebase from 'firebase'  // Should not be used elsewhere in the project
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp(firebaseConfig)
export default firebase;