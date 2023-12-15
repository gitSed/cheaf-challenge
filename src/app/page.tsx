"use client";

import { Link } from "@chakra-ui/next-js";
import { Box, Flex, Text } from "@chakra-ui/react";

function Home() {
  const renderLinkButton = (href: string, text: string) => {
    return (
      <Link
        href={href}
        bgColor="yellow.100"
        p="1rem 2rem"
        w="fit-content"
        minW="8rem"
        borderRadius="0.875rem"
        textAlign="center"
        _hover={{
          bgColor: "yellow.200",
          textDecoration: "none",
        }}
      >
        {text}
      </Link>
    );
  };

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
        <Flex gap="1rem">
          {renderLinkButton("/auth?register=true", "Sign Up")}
          {renderLinkButton("/auth?register=false", "Login")}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Home;
