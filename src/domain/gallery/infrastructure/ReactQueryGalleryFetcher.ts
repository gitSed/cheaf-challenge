import { QueryKey, useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { GalleryFetcher } from "../domain/fetchers";
import { Gallery, MetadataRequest } from "../domain/entities";

const TOTAL_ITEMS_PER_PAGE = 60;

function useGetImageByTag(
  queryFn: ({ queryKey }: { queryKey: QueryKey }) => Promise<Gallery>,
  request: MetadataRequest
) {
  const { data, error, isError, isLoading, isSuccess } = useQuery<Gallery>({
    queryKey: ["get-image-by-tag", request],
    queryFn,
    enabled: !!request.tagName,
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

function useGetImageByTagInfinite(
  queryFn: ({
    pageParam,
    queryKey,
  }: {
    pageParam: number | unknown;
    queryKey: QueryKey;
  }) => Promise<Gallery>,
  request: MetadataRequest
) {
  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<Gallery>({
    queryKey: ["get-image-by-tag-infinite", request],
    queryFn,
    initialPageParam: 1,
    enabled: !!request.tagName,
    staleTime: 60000,
    getNextPageParam: (lastPage, pages) => {
      const totalItems = lastPage.totalItems;
      const currentPage = pages.length;

      // This validation is for those cases where totalItems apparently have more items
      // but the Imgur API doesn't return any more.
      const hasLastPageMoreItems =
        lastPage.items.length === TOTAL_ITEMS_PER_PAGE;

      const totalPages = Math.ceil(totalItems / TOTAL_ITEMS_PER_PAGE);

      if (currentPage < totalPages && hasLastPageMoreItems) {
        return currentPage + 1;
      }

      return undefined;
    },
  });

  return {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  };
}

class ReactQueryGalleryFetcher implements GalleryFetcher {
  readonly getImageByTag = useGetImageByTag;
  readonly getImageByTagInfinite = useGetImageByTagInfinite;
}

export default ReactQueryGalleryFetcher;
