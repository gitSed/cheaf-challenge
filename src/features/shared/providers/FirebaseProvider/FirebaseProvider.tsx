"use client";

import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import { FirebaseContext, AuthStatus } from ".";

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
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");

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

  const handleSignInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential.user;
      })
      .catch(({ code, message }) => {
        console.error({ code, message });
        throw new Error(message);
      });
  };

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    return await signInWithPopup(auth, provider)
      .then((result) => {
        return result.user;
      })
      .catch(({ code, message }) => {
        console.error({ code, message });
        throw new Error(message);
      });
  };

  const handleSignOut = async () => {
    return await signOut(auth)
      .then(() => {
        return null;
      })
      .catch(({ code, message }) => {
        console.error({ code, message });
        throw new Error(message);
      });
  };

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setAuthStatus("authenticated");
        } else {
          setAuthStatus("unauthenticated");
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        createUserWithEmailAndPassword: handleCreateUserWithEmailAndPassword,
        signInWithEmailAndPassword: handleSignInWithEmailAndPassword,
        signInWithGoogle: handleSignInWithGoogle,
        signOut: handleSignOut,
        authStatus,
        firestoreDB: db,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export default FirebaseProvider;
