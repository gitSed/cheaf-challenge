"use client";

import { useSearchParams } from "next/navigation";
import { AspectRatio, Box, Flex, Image, useBreakpoint } from "@chakra-ui/react";

import { LoginContainer, RegisterContainer } from "@/features/auth/containers";
import { useFirebase } from "@/features/shared/hooks";
import {
  FirestoreAuthRepository,
  ReactQueryAuthFetcher,
} from "@/domain/auth/infrastructure";

function AuthPage(): JSX.Element {
  const { firestoreDB } = useFirebase();
  const breakpoint = useBreakpoint({ fallback: "base" });
  const searchParams = useSearchParams();

  const authRepository = new FirestoreAuthRepository(firestoreDB);
  const authFetcher = new ReactQueryAuthFetcher();

  const isRegister = searchParams.get("register") !== "false";

  const renderSignUpComponent = (): JSX.Element => {
    return (
      <RegisterContainer repository={authRepository} fetcher={authFetcher} />
    );
  };

  const renderLoginComponent = (): JSX.Element => {
    return <LoginContainer repository={authRepository} fetcher={authFetcher} />;
  };

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
