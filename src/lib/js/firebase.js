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
import { browser } from "$app/env";

import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBQDvPmi5u-7MZv6TcJo3chOFlawVQvlG0",
  authDomain: "akribosqrapp.firebaseapp.com",
  projectId: "akribosqrapp",
  storageBucket: "akribosqrapp.appspot.com",
  messagingSenderId: "306489179040",
  appId: "1:306489179040:web:7038302e39f2f8bc5b82c5",
  measurementId: "G-PJZV4XHELT",
};

// const firebaseApp =
//   getApps().length === 0 ? initializeApp(firebaseConfig, "CLIENT") : getApp();
const firebaseApp = initializeApp(firebaseConfig);

export let auth = getAuth(firebaseApp);

setPersistence(auth, inMemoryPersistence);

export const db = firebaseApp && getFirestore();
