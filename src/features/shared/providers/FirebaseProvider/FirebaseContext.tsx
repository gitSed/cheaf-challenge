"use client";

import { createContext } from "react";
import { Firestore } from "firebase/firestore";
import { User } from "firebase/auth";

interface IFirebaseContext {
  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<User | null>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<User | null>;
  firestoreDB: Firestore | null;
}

const FirebaseContext = createContext<IFirebaseContext>({
  createUserWithEmailAndPassword: async (email: string, password: string) =>
    null,
  signInWithEmailAndPassword: async (email: string, password: string) => null,
  firestoreDB: null,
});

export default FirebaseContext;
