import { AspectRatio, Box, Image } from "@chakra-ui/react";

import { useVisible } from "@/features/shared/hooks";

import { GalleryImageProps } from "./GalleryImage.types";

function GalleryImage(props: GalleryImageProps) {
  const { link, title, onClick } = props;

  const { isVisible, ref } = useVisible<HTMLDivElement>();

  return (
    <Box
      w="100%"
      borderRadius="0.5rem"
      overflow="hidden"
      cursor="pointer"
      onClick={onClick}
      ref={ref}
    >
      {isVisible && (
        <AspectRatio ratio={1}>
          <Image src={link} alt={title || "Gallery image"} loading="lazy" />
        </AspectRatio>
      )}
    </Box>
  );
}

export default GalleryImage;
