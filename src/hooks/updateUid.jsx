import { dataBase } from "../firebase/Config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import firebase from "firebase/compat/app";

export const addUidToDocuments = async () => {
  const userId = firebase.auth().currentUser.uid;
  const querySnapshot = await getDocs(collection(dataBase, "produtos"));

  querySnapshot.forEach(async (document) => {
    const docRef = doc(dataBase, "produtos", document.id);
    await updateDoc(docRef, { uid: userId });
    console.log(`Adicionado uid ao documento ${document.id}`);
  });
};
