// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8-odPyyskkis894I2_DJStlURpSryrTo",
  authDomain: "worksync-by-imran.firebaseapp.com",
  projectId: "worksync-by-imran",
  storageBucket: "worksync-by-imran.firebasestorage.app",
  messagingSenderId: "812038818537",
  appId: "1:812038818537:web:a513c065c4b6aa2c317e78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;
