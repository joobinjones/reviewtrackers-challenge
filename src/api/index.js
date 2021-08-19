// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from "firebase/app";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import reviews from "./reviews.json";

export const firebaseConfig = {
  apiKey: "AIzaSyDwGXV6Cm8zyz6VVk2t_TSBYkDl0r8MsKw",
  authDomain: "rt-challenge-api.firebaseapp.com",
  databaseURL: "https://rt-challenge-api-default-rtdb.firebaseio.com",
  projectId: "rt-challenge-api",
  storageBucket: "rt-challenge-api.appspot.com",
  messagingSenderId: "982666575821",
  appId: "1:982666575821:web:fdfce764b7e51239780e84",
  measurementId: "G-82TJ14Q7QG",
};
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();

export const updateReviews = async () => {
  const reviewsRef = doc(db, "reviews", "reviews");
  await updateDoc(reviewsRef, { reviews });
};
