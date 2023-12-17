import { QueryKey } from "@tanstack/react-query";

import { GalleryImage, MetadataRequest } from "../entities";

interface GalleryFetcher {
  readonly getImageByTag: (
    queryFn: ({
      queryKey,
    }: {
      queryKey: QueryKey;
    }) => Promise<Array<GalleryImage>>,
    request: MetadataRequest
  ) => {
    data?: Array<GalleryImage>;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: unknown;
  };
}

export default GalleryFetcher;
