import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyE2AxXgOKh3bS-Ve_lY_7urymUIIDDEg",
  authDomain: "order-bc6e1.firebaseapp.com",
  projectId: "order-bc6e1",
  storageBucket: "order-bc6e1.appspot.com",
  messagingSenderId: "612357299067",
  appId: "1:612357299067:web:7ff489ccb79936972dbbde",
};

const app = initializeApp(firebaseConfig);

const dataBase = getFirestore(app);

const auth = getAuth(app);

export { dataBase, auth };
