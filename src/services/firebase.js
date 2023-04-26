import { initializeApp } from "firebase/app";
import { useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY,
  authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECID,
  storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAINGSENDERID,
  appId: import.meta.env.VITE_APP_APPID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBVbKwBHqeR5eEtvOl-gzfsvm5yqjjDl1M",
//   authDomain: "fb-libres.firebaseapp.com",
//   projectId: "fb-libres",
//   storageBucket: "fb-libres.appspot.com",
//   messagingSenderId: "646693414920",
//   appId: "1:646693414920:web:fee91edffa48b5ca0589bd",
// };

export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const githubAuthProvaider = new GithubAuthProvider();

export async function uploaFiles(file) {
  const storagteRef = ref(storage, crypto.randomUUID());
  await uploadBytes(storagteRef, file);
  const url = await getDownloadURL(storagteRef);
  return url;
}

export async function userExists(uid) {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  console.log(res);
  return res.exists();
}

export const saveArchivos = (data) => addDoc(collection(db, "libros"), data);

export async function traerDatos() {
  const querySnapshot = await getDocs(collection(db, "libros"));
  const docs = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs;
}

export async function dataUser() {
  const librosRef = collection(db, "libros");

  const q = query(
    librosRef,
    where("libros", "==", localStorage.getItem("userid"))
  );
  const querySnapshot = await getDocs(q);
  // console.log(q.firestore._authCredentials.currentUser.uid);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });

  return querySnapshot;
}

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleAuthProvider)
    .then((result) => result.user)
    .catch((error) => console.log(error));
};

export const logout = () => {
  return signOut(auth)
    .then(() => null)
    .catch((error) => console.log(error));
};
