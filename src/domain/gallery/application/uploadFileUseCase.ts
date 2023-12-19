import { UploadFileRequest } from "../domain/entities";
import { GalleryRepository } from "../domain/repositories";

function uploadFileUseCase(galleryRepository: GalleryRepository) {
  return async function (request: UploadFileRequest): Promise<void> {
    try {
      return await galleryRepository.uploadFile(request);
    } catch (err) {
      console.error(err);
      throw new Error("Error uploading file");
    }
  };
}

export default uploadFileUseCase;
