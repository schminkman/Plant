// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARtP3gkuDVFwF03gwksL0f3FvRFLsjeJI",
  authDomain: "species-tracker.firebaseapp.com",
  projectId: "species-tracker",
  storageBucket: "species-tracker.appspot.com",
  messagingSenderId: "209744624144",
  appId: "1:209744624144:web:a0be72aa596093665e2895",
  measurementId: "G-CW8XQH0G5B",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export default firebase;

export { auth };
