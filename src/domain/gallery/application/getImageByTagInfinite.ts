import { QueryKey } from "@tanstack/react-query";

import { GalleryRepository } from "../domain/repositories";
import { MetadataRequest } from "../domain/entities";

function getImageByTagInfinite(repository: GalleryRepository) {
  return async ({
    pageParam,
    queryKey,
  }: {
    pageParam: number | unknown;
    queryKey: QueryKey;
  }) => {
    const [_key, request] = queryKey;

    return await repository.getByTag({
      ...(request as MetadataRequest),
      page: pageParam as number,
    });
  };
}

export default getImageByTagInfinite;
