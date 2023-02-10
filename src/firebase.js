import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdnV6yn41gtBHf6vNxlZiJW-oLJpdMB_I",
    authDomain: "crud-d7c1e.firebaseapp.com",
    projectId: "crud-d7c1e",
    storageBucket: "crud-d7c1e.appspot.com",
    messagingSenderId: "526571836071",
    appId: "1:526571836071:web:7bf40260076ad6efc1c182"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  const auth = firebase.auth()

  export {db, auth}