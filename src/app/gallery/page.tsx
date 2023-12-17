"use client";

import { GalleryContainer } from "@/features/gallery/containers";
import {
  ImgurGalleryRepository,
  ReactQueryGalleryFetcher,
} from "@/domain/gallery/infrastructure";

function GalleryPage() {
  const apiUrl = process.env.NEXT_PUBLIC_IMGUR_API as string;
  const clientId = process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID as string;

  const galleryRepository = new ImgurGalleryRepository(apiUrl, clientId);
  const galleryFetcher = new ReactQueryGalleryFetcher();

  return (
    <GalleryContainer repository={galleryRepository} fetcher={galleryFetcher} />
  );
}

export default GalleryPage;
