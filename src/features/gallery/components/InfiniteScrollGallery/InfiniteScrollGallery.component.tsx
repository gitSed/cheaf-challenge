import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { GalleryEmptyState, GalleryImage, GalleryVideo } from "..";
import { InfiniteScrollGalleryProps } from "./InfiniteScrollGallery.types";

function InfiniteScrollGallery(props: InfiniteScrollGalleryProps) {
  const { items, hasMore, onLoadMoreClick } = props;

  const [content, setContent] = useState<JSX.Element | null>(null);

  const renderImageModalContent = (
    title: string,
    link: string
  ): JSX.Element => {
    return (
      <>
        <Flex h="5rem" alignItems="center" justifyContent="center">
          <Text as="h2">{title}</Text>
        </Flex>
        <Box maxW="40rem" maxH="95vh" overflow="hidden" padding="1rem">
          <Image
            src={link}
            alt={title || "Gallery image"}
            loading="eager"
            borderRadius="1rem"
          />
        </Box>
      </>
    );
  };

  const renderVideoModalContent = (
    title: string,
    link: string
  ): JSX.Element => {
    const getSourceUrl = () => {
      if (link.includes(".gifv")) {
        return link.replace(".gifv", ".mp4");
      }
      return link;
    };

    return (
      <>
        <Flex h="5rem" alignItems="center" justifyContent="center">
          <Text>{title}</Text>
        </Flex>
        <Box maxW="40rem" maxH="95vh" overflow="hidden" padding="1rem">
          <video
            style={{ borderRadius: "1rem" }}
            title={title || "Gallery video"}
            autoPlay
            loop
          >
            <source src={getSourceUrl()} type="video/mp4" />
          </video>
        </Box>
      </>
    );
  };

  const handleGalleryItemClick =
    (title: string, link: string, type: string) => () => {
      if (type.includes("image")) {
        setContent(renderImageModalContent(title, link));
      } else {
        setContent(renderVideoModalContent(title, link));
      }
    };

  if (items.length === 0) {
    return (
      <Box w="100%" marginTop="5rem">
        <GalleryEmptyState />
      </Box>
    );
  }

  return (
    <>
      <Flex w="100%" h="100%" flexDir="column" gap="2rem">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
        >
          <Masonry gutter="1rem">
            {items.map((item) =>
              item.type.includes("image") ? (
                <GalleryImage
                  {...item}
                  key={item.id}
                  onClick={handleGalleryItemClick(
                    item.title,
                    item.link,
                    item.type
                  )}
                />
              ) : (
                <GalleryVideo
                  {...item}
                  key={item.id}
                  onClick={handleGalleryItemClick(
                    item.title,
                    item.link,
                    item.type
                  )}
                />
              )
            )}
          </Masonry>
        </ResponsiveMasonry>
        <Button
          h="3.5rem"
          w="100%"
          margin="0 auto"
          onClick={onLoadMoreClick}
          isDisabled={!hasMore}
        >
          Load More
        </Button>
      </Flex>
      <Modal
        isCentered
        isOpen={!!content}
        onClose={() => setContent(null)}
        size={{ base: "xs", md: "md" }}
      >
        <ModalOverlay />
        <ModalContent w="fit-content" borderRadius="1rem">
          <ModalCloseButton />
          {content}
        </ModalContent>
      </Modal>
    </>
  );
}

export default InfiniteScrollGallery;
