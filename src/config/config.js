
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {GoogleAuthProvider, getAuth} from "firebase/auth"


// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgTqWzQaCVyxiXTv4Dqel_265Y61B8YhA",
  authDomain: "bookley-4e5c8.firebaseapp.com",
  projectId: "bookley-4e5c8",
  storageBucket: "bookley-4e5c8.appspot.com",
  messagingSenderId: "422172897232",
  appId: "1:422172897232:web:0cabad97eb93e5022613d5",
  measurementId: "G-TVL2NNZDFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()
export{ db , auth, provider};

