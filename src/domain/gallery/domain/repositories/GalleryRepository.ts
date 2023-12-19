import { Gallery, MetadataRequest, UploadFileRequest } from "../entities";

interface GalleryRepository {
  getByTag(request: MetadataRequest): Promise<Gallery>;
  uploadFile(request: UploadFileRequest): Promise<void>;
}

export default GalleryRepository;
