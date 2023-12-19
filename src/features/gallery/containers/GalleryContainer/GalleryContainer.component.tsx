"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";

import { SignOutButton } from "@/features/auth/components";
import { useFirebase } from "@/features/shared/hooks";
import { getImageByTagInfinite } from "@/domain/gallery/application";
import { GalleryImage } from "@/domain/gallery/domain/entities";

import {
  GalleryEmptyState,
  InfiniteScrollGallery,
  SearchForm,
} from "../../components";
import { UploadImageContainer } from "..";
import { GalleryContainerProps } from "./GalleryContainer.types";

const DEFAULT_SEARCH_TERM = "Dog";

function GalleryContainer(props: GalleryContainerProps) {
  const { repositories, fetcher } = props;

  const router = useRouter();
  const searchParams = useSearchParams();
  const { authStatus } = useFirebase();

  const searchBoxRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [userUploadedImages, setUserUploadedImages] = useState<GalleryImage[]>(
    []
  );

  const searchTerm = searchParams.get("term");

  const {
    data: infiniteData,
    hasNextPage,
    isLoading,
    isSuccess,
    fetchNextPage,
  } = fetcher.getImageByTagInfinite(
    getImageByTagInfinite(repositories.imgurRepository),
    {
      tagName: searchTerm || "",
    }
  );

  useEffect(() => {
    if (!!searchTerm === false) {
      router.push(`/gallery?term=${DEFAULT_SEARCH_TERM}`);
    }
  }, [searchTerm]);

  useEffect(() => {
    const element = searchBoxRef?.current;

    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const { height } = entries[0].contentRect;

      if (galleryRef.current) {
        galleryRef.current.style.marginTop = `${height}px`;
      }
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [searchBoxRef, galleryRef]);

  return (
    <>
      <Box>
        <Box
          ref={searchBoxRef}
          w="100%"
          top="0"
          bottom="auto"
          position="fixed"
          padding={{
            base: "1rem",
            md: "1rem 2rem",
            lg: "1rem 5rem",
          }}
          bgColor="white"
          zIndex={1}
        >
          <Box width="50%" margin="0 auto">
            <SearchForm
              initialValues={{ term: searchTerm || DEFAULT_SEARCH_TERM }}
              onSubmit={(values) => {
                router.push(`/gallery?term=${values.term}`);
              }}
              isSubmitting={isLoading}
              isSuccess={isSuccess}
            />
          </Box>
          <SignOutButton />
        </Box>
        <Flex
          ref={galleryRef}
          width="100%"
          padding={{ base: "1rem", md: "2rem", lg: "5rem" }}
        >
          {(isLoading || authStatus === "loading") && <GalleryEmptyState />}
          {infiniteData && authStatus === "authenticated" && (
            <InfiniteScrollGallery
              items={[
                ...userUploadedImages.map((image) => ({ ...image })),
                ...infiniteData.pages.flatMap((page) =>
                  page.items.map((item) => ({ ...item }))
                ),
              ]}
              hasMore={hasNextPage}
              onLoadMoreClick={fetchNextPage}
            />
          )}
        </Flex>
      </Box>
      <UploadImageContainer
        fetcher={fetcher}
        repository={repositories.firestoreRepository}
        imagesTag={searchTerm || ""}
        onUserImagesLoaded={setUserUploadedImages}
      />
    </>
  );
}

export default GalleryContainer;
