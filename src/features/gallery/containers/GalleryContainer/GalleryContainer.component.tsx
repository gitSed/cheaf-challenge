"use client";

import { getImageByTag } from "@/domain/gallery/application";

import { GalleryContainerProps } from "./GalleryContainer.types";

function GalleryContainer(props: GalleryContainerProps) {
  const { repository, fetcher } = props;

  const { error, isError, isLoading, isSuccess, data } = fetcher.getImageByTag(
    getImageByTag(repository),
    {
      page: 1,
      tagName: "Dog",
    }
  );

  return (
    <div>
      <h1>GalleryContainer</h1>
    </div>
  );
}

export default GalleryContainer;
