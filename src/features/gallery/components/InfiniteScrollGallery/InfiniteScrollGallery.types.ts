import { GalleryImage } from "@/domain/gallery/domain/entities";

export interface InfiniteScrollGalleryProps {
  items: GalleryImage[];
  hasMore: boolean;
  onLoadMoreClick: () => void;
}
