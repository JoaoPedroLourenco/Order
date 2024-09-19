import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


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
const storage = getStorage(app)

const auth = getAuth(app);

export { dataBase,storage, auth };
