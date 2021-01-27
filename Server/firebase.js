// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB8QgWYTmJFiaD2_yG9uWZcBjgA1M6-8OY",
    authDomain: "watsapp-clone-56bc7.firebaseapp.com",
    projectId: "watsapp-clone-56bc7",
    storageBucket: "watsapp-clone-56bc7.appspot.com",
    messagingSenderId: "133910234523",
    appId: "1:133910234523:web:04cf93d8ccd6f6c1a40d3e",
    measurementId: "G-Y7MC4K7CW2"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;