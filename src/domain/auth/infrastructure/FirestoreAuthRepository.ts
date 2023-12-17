import { collection, addDoc, Firestore } from "firebase/firestore";

import { AuthRepository } from "../domain/repositories";
import { SaveUserInfoRequest, User } from "../domain/entities";

class FirestoreAuthRepository implements AuthRepository {
  constructor(private readonly firestoreDB: Firestore | null) {}

  async saveUserInfo(request: SaveUserInfoRequest): Promise<User> {
    try {
      if (!this.firestoreDB) {
        console.error("Firestore is not defined");
        throw new Error("Firstore is not defined");
      }

      await addDoc(collection(this.firestoreDB, "users"), {
        id: request.uid,
        email: request.lead.email,
        name: request.lead.name,
        password: request.lead.password,
      });

      return { ...request.lead, id: request.uid };
    } catch (err) {
      console.error(err);
      throw new Error("Error saving user info");
    }
  }
}

export default FirestoreAuthRepository;
