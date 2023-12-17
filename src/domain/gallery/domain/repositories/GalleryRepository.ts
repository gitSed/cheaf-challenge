import { GalleryImage, MetadataRequest } from "../entities";

interface GalleryRepository {
  getByTag(request: MetadataRequest): Promise<Array<GalleryImage>>;
}

export default GalleryRepository;
