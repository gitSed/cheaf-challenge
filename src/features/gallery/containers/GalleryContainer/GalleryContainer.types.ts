import { GalleryFetcher } from "@/domain/gallery/domain/fetchers";
import { GalleryRepository } from "@/domain/gallery/domain/repositories";

export interface GalleryContainerProps {
  repository: GalleryRepository;
  fetcher: GalleryFetcher;
}
