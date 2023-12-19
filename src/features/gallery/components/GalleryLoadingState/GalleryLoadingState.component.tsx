import { Button, Flex, Skeleton } from "@chakra-ui/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

function GalleryLoadingState() {
  return (
    <Flex
      w="100%"
      h="100%"
      flexDir="column"
      gap="2rem"
      padding={{ base: "1rem", md: "2rem", lg: "5rem" }}
    >
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
      >
        <Masonry gutter="1rem" columnsCount={5}>
          {Array.from({ length: 16 }).map((_, idx) => (
            <Skeleton key={idx} w="100%" h="351px" />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <Button h="3.5rem" w="100%" margin="0 auto">
        Load More
      </Button>
    </Flex>
  );
}

export default GalleryLoadingState;
