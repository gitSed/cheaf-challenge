"use client";

import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { FirebaseContext } from ".";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const handleCreateUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential.user;
      })
      .catch(({ code, message }) => {
        console.error({ code, message });
        throw new Error(message);
      });
  };

  return (
    <FirebaseContext.Provider
      value={{
        createUserWithEmailAndPassword: handleCreateUserWithEmailAndPassword,
        firestoreDB: db,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export default FirebaseProvider;