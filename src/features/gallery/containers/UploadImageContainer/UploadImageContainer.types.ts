import { GalleryImage } from "@/domain/gallery/domain/entities";
import { GalleryFetcher } from "@/domain/gallery/domain/fetchers";
import { GalleryRepository } from "@/domain/gallery/domain/repositories";

export interface UploadImageContainerProps {
  repository: GalleryRepository;
  fetcher: GalleryFetcher;
  imagesTag: string;
  onUserImagesLoaded: (images: Array<GalleryImage>) => void;
}
