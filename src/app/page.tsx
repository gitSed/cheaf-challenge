"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

function Home() {
  return (
    <Box
      as="main"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgColor="green.700"
    >
      <Flex gap="2rem" flexDir="column" alignItems="center">
        <Text as="h1" fontSize="6xl" color="yellow.200">
          Cheaf Challenge
        </Text>
        <Link
          href="/login"
          bgColor="yellow.100"
          w="fit-content"
          p="1rem 2rem"
          borderRadius="0.875rem"
          _hover={{
            bgColor: "yellow.200",
            textDecoration: "none",
          }}
        >
          Ir a la página de login
        </Link>
      </Flex>
    </Box>
  );
}

export default Home;
