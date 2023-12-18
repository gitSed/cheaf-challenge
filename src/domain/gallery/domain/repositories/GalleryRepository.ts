import { Gallery, MetadataRequest } from "../entities";

interface GalleryRepository {
  getByTag(request: MetadataRequest): Promise<Gallery>;
}

export default GalleryRepository;
