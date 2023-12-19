import { AspectRatio, Flex, Image, Text } from "@chakra-ui/react";

function GalleryEmptyState() {
  return (
    <Flex
      w="100%"
      h="100%"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <AspectRatio w="100%" maxW={{ base: "12rem", md: "20rem" }} ratio={1}>
        <Image
          src="/images/empty-state.png"
          alt="Gallery empty state"
          objectFit="cover"
        />
      </AspectRatio>
      <Text as="h1" fontSize="3xl" fontWeight="500" marginTop="3rem">
        Parece un poco vacío aquí...
      </Text>
      <Text as="h2" fontSize="1xl" fontWeight="400" color="gray.400">
        Comienza subiendo tus imágenes haciendo click en el botón de color{" "}
        <Text as="label" fontSize="1xl" fontWeight="700" color="blue.500">
          azul
        </Text>
      </Text>
    </Flex>
  );
}

export default GalleryEmptyState;
