"use client";

import { GalleryContainer } from "@/features/gallery/containers";
import { useFirebase } from "@/features/shared/hooks";
import {
  FirestoreGalleryRepository,
  ImgurGalleryRepository,
  ReactQueryGalleryFetcher,
} from "@/domain/gallery/infrastructure";

function GalleryPage() {
  const { firestoreDB } = useFirebase();

  const apiUrl = process.env.NEXT_PUBLIC_IMGUR_API as string;
  const clientId = process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID as string;

  const firestoreRepository = new FirestoreGalleryRepository(firestoreDB);
  const imgurRepository = new ImgurGalleryRepository(apiUrl, clientId);
  const galleryFetcher = new ReactQueryGalleryFetcher();

  return (
    <GalleryContainer
      repositories={{
        firestoreRepository,
        imgurRepository,
      }}
      fetcher={galleryFetcher}
    />
  );
}

export default GalleryPage;
