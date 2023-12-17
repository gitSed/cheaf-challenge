import { QueryKey } from "@tanstack/react-query";

import { MetadataRequest } from "../domain/entities";
import { GalleryRepository } from "../domain/repositories";

function getImageByTag(repository: GalleryRepository) {
  return async ({ queryKey }: { queryKey: QueryKey }) => {
    const [_key, request] = queryKey;

    return await repository.getByTag(request as MetadataRequest);
  };
}

export default getImageByTag;
