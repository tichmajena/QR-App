// import firebase from "firebase/app";
// import "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBQDvPmi5u-7MZv6TcJo3chOFlawVQvlG0",
//   authDomain: "akribosqrapp.firebaseapp.com",
//   projectId: "akribosqrapp",
//   storageBucket: "akribosqrapp.appspot.com",
//   messagingSenderId: "306489179040",
//   appId: "1:306489179040:web:7038302e39f2f8bc5b82c5",
//   measurementId: "G-PJZV4XHELT",
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
// export const googleProvider = new firebase.auth.GoogleAuthProvider();
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQDvPmi5u-7MZv6TcJo3chOFlawVQvlG0",
  authDomain: "akribosqrapp.firebaseapp.com",
  projectId: "akribosqrapp",
  storageBucket: "akribosqrapp.appspot.com",
  messagingSenderId: "306489179040",
  appId: "1:306489179040:web:7038302e39f2f8bc5b82c5",
  measurementId: "G-PJZV4XHELT",
};

const app = initializeApp(firebaseConfig, "CLIENT");
export let auth = getAuth(app);

setPersistence(auth, inMemoryPersistence);
