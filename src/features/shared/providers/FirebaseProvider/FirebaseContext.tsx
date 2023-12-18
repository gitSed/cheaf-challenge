"use client";

import { createContext } from "react";
import { Firestore } from "firebase/firestore";
import { User } from "firebase/auth";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface IFirebaseContext {
  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<User | null>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<User | null>;
  signInWithGoogle: () => Promise<User | null>;
  signOut: () => Promise<void | null>;
  authStatus: AuthStatus;
  firestoreDB: Firestore | null;
}

const FirebaseContext = createContext<IFirebaseContext>({
  createUserWithEmailAndPassword: async (email: string, password: string) =>
    null,
  signInWithEmailAndPassword: async (email: string, password: string) => null,
  signInWithGoogle: async () => null,
  signOut: async () => {},
  authStatus: "loading",
  firestoreDB: null,
});

export default FirebaseContext;
