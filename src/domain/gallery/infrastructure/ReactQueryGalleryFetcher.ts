import { QueryKey, useQuery } from "@tanstack/react-query";

import { GalleryFetcher } from "../domain/fetchers";
import { GalleryImage, MetadataRequest } from "../domain/entities";

function useGetImageByTag(
  queryFn: ({
    queryKey,
  }: {
    queryKey: QueryKey;
  }) => Promise<Array<GalleryImage>>,
  request: MetadataRequest
) {
  const { data, error, isError, isLoading, isSuccess } = useQuery<
    Array<GalleryImage>
  >({
    queryKey: ["get-image-by-id", request],
    queryFn,
    staleTime: 60000,
  });

  return {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
  };
}

class ReactQueryGalleryFetcher implements GalleryFetcher {
  readonly getImageByTag = useGetImageByTag;
}

export default ReactQueryGalleryFetcher;
