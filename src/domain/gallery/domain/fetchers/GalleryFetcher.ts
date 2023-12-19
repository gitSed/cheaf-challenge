import { InfiniteData, QueryKey } from "@tanstack/react-query";

import { Gallery, MetadataRequest, UploadFileRequest } from "../entities";

interface GalleryFetcher {
  readonly getImageByTag: (
    queryFn: ({ queryKey }: { queryKey: QueryKey }) => Promise<Gallery>,
    request: MetadataRequest
  ) => {
    data?: Gallery;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: unknown;
  };

  readonly getImageByTagInfinite: (
    queryFn: ({
      pageParam,
      queryKey,
    }: {
      pageParam: number | unknown;
      queryKey: QueryKey;
    }) => Promise<Gallery>,
    request: MetadataRequest
  ) => {
    data?: InfiniteData<Gallery, unknown> | undefined;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: unknown;
    fetchNextPage: () => void;
    hasNextPage: boolean;
  };

  readonly uploadFileMutation: (
    mutationFn: (request: UploadFileRequest) => Promise<void>
  ) => {
    mutate: (request: UploadFileRequest) => Promise<void>;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: unknown;
  };
}

export default GalleryFetcher;
