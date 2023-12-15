"use client";

import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";

import { FacebookIcon, GoogleIcon } from "@/features/shared/icons";
import { Lead } from "@/domain/auth/domain/entities";

import { RegisterForm } from "../components";

function RegisterContainer(): JSX.Element {
  const renderSocialButtons = () => {
    return (
      <Flex gap="0.5rem">
        <IconButton
          isRound
          aria-label="facebook"
          icon={<Icon as={FacebookIcon} boxSize={9} />}
        />
        <IconButton
          isRound
          aria-label="google"
          icon={<Icon as={GoogleIcon} boxSize={9} />}
        />
      </Flex>
    );
  };

  const handleSubmit = (values: Lead) => {};

  return (
    <Flex
      p={{ base: "4rem 2.5rem", lg: "4rem 5rem" }}
      gap="2rem"
      flexDir="column"
      alignItems="center"
    >
      <Text as="h1" fontSize="4xl" fontWeight="600" color="green.500">
        Create Account
      </Text>
      {renderSocialButtons()}
      <Text>or use your email for registration</Text>
      <Box w="100%" maxW="30rem" mt="2rem">
        <RegisterForm
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          isSubmitting={false}
          isSuccess={false}
          onSubmit={handleSubmit}
        />
      </Box>
    </Flex>
  );
}

export default RegisterContainer;
