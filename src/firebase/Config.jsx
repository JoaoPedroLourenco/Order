import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyBHMEpJk8NGFPonIpIDGxB7yVPhnHd1U",
  authDomain: "order-c1d5c.firebaseapp.com",
  projectId: "order-c1d5c",
  storageBucket: "order-c1d5c.appspot.com",
  messagingSenderId: "904299728795",
  appId: "1:904299728795:web:2e7182e6c4f64ddc4d5b3e",
};

const app = initializeApp(firebaseConfig);

const dataBase = getFirestore(app);
const storage = getStorage(app);

const auth = getAuth(app);

export { dataBase, storage, auth, app };
