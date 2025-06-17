// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwsutwbOcbNJS7kTza5nVkDegO-elDgFQ",
  authDomain: "housemarket-2931e.firebaseapp.com",
  projectId: "housemarket-2931e",
  storageBucket: "housemarket-2931e.firebasestorage.app",
  messagingSenderId: "714444076657",
  appId: "1:714444076657:web:d9f08f4c5d857638848dd0",
  measurementId: "G-301FXGSV5K",
};

// Initialize Firebase
const firebaseAppInit = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseAppInit);
export const db = getFirestore();
export default firebaseAppInit;
