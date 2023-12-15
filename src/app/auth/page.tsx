"use client";

import { useSearchParams } from "next/navigation";
import { AspectRatio, Box, Flex, Image, useBreakpoint } from "@chakra-ui/react";

import { RegisterContainer } from "@/features/auth/containers";

function AuthPage(): JSX.Element {
  const breakpoint = useBreakpoint({ fallback: "base" });
  const searchParams = useSearchParams();

  const isRegister = searchParams.get("register") !== "false";

  const renderIllustration = (): JSX.Element => {
    return (
      <AspectRatio ratio={1} overflow="hidden" h="full">
        <Image
          src="/images/login-hero.png"
          alt="Cheaf"
          fetchPriority="high"
          objectFit="contain"
        />
      </AspectRatio>
    );
  };

  const renderSignUpComponent = (): JSX.Element => {
    return <RegisterContainer />;
  };

  const renderLoginComponent = (): JSX.Element => {
    return <>Aqui va LoginContainer</>;
  };

  return (
    <Flex maxH="100vh" h="100vh" flexDir={{ base: "column", lg: "row" }}>
      <Box flex="1 1 50%">
        {isRegister ? renderSignUpComponent() : renderLoginComponent()}
      </Box>
      <Box flex="1 1 50%" hidden={breakpoint === "base" ? true : false}>
        {renderIllustration()}
      </Box>
    </Flex>
  );
}

export default AuthPage;
