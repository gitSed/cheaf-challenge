"use client";

import { createContext } from "react";
import {
  DocumentData,
  Firestore,
  QuerySnapshot,
  Unsubscribe,
  WhereFilterOp,
} from "firebase/firestore";
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
  subscribeToCollectionChanges: (
    path: string,
    condition: [string, WhereFilterOp, string],
    callbackFn: (
      querySnapshot: QuerySnapshot<DocumentData, DocumentData>
    ) => void
  ) => Unsubscribe;
  authStatus: AuthStatus;
  firestoreDB: Firestore | null;
}

const FirebaseContext = createContext<IFirebaseContext>({
  createUserWithEmailAndPassword: async (email: string, password: string) =>
    null,
  signInWithEmailAndPassword: async (email: string, password: string) => null,
  signInWithGoogle: async () => null,
  signOut: async () => {},
  subscribeToCollectionChanges: () => () => {},
  authStatus: "loading",
  firestoreDB: null,
});

export default FirebaseContext;
