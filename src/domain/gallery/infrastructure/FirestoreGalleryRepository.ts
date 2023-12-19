import { Firestore, addDoc, collection } from "firebase/firestore";

import { GalleryRepository } from "../domain/repositories";
import {
  Gallery,
  MetadataRequest,
  UploadFileRequest,
} from "../domain/entities";

class FirestoreGalleryRepository implements GalleryRepository {
  constructor(private readonly firestoreDB: Firestore | null) {}

  getByTag(request: MetadataRequest): Promise<Gallery> {
    throw new Error("Method not implemented.");
  }

  async uploadFile(request: UploadFileRequest): Promise<void> {
    try {
      if (!this.firestoreDB) {
        console.error("Firestore is not defined");
        throw new Error("Firstore is not defined");
      }

      await addDoc(collection(this.firestoreDB, "images"), {
        fileName: request.fileName,
        file: await this.fileToBase64(request.file),
      });

      return;
    } catch (err) {
      console.error(err);
      throw new Error("Error uploading file");
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result as string);

      reader.onerror = (error) => reject(error);
    });
  }
}

export default FirestoreGalleryRepository;
