import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAXChOaH_HFl4m2dXZCFjxNRb3wA7PuW5Y",
    authDomain: "recycle-nation-52b17.firebaseapp.com",
    projectId: "recycle-nation-52b17",
    storageBucket: "recycle-nation-52b17.appspot.com",
    messagingSenderId: "890281707211",
    appId: "1:890281707211:web:704a7258478cbefabebd4e",
    measurementId: "G-R5TREGXGBZ"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;