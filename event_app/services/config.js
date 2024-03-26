// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBk-Qj14BOHQy-fOBEXWyXdfg9QKsgh9HE",
  authDomain: "eventapp-837e5.firebaseapp.com",
  projectId: "eventapp-837e5",
  storageBucket: "eventapp-837e5.appspot.com",
  messagingSenderId: "653947782926",
  appId: "1:653947782926:web:ea4b755017a8ce48cdf95f",
  measurementId: "G-RSSXDQD72G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);