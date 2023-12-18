"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

import { useFirebase } from "@/features/shared/hooks";
import { LoginRequest } from "@/domain/auth/domain/entities";
import { saveUserInfoUseCase } from "@/domain/auth/application";

import { AuthSocialButtons, LoginForm } from "../../components";
import { LoginContainerProps } from "./LoginContainer.types";

function LoginContainer(props: LoginContainerProps) {
  const { fetcher, repository } = props;

  const router = useRouter();
  const { signInWithEmailAndPassword, signInWithGoogle } = useFirebase();

  const { mutate, isLoading, isSuccess } = fetcher.saveUserInfoMutation(
    saveUserInfoUseCase(repository)
  );

  const handleSubmit = async (values: LoginRequest) => {
    // TODO - Show Loading State
    await signInWithEmailAndPassword(values.email, values.password)
      .then((user) => {
        if (user) {
          router.push("/gallery");
        }
      })
      .catch((err) => {
        // TODO - Show Error Alert
        console.error(err);
      });
  };

  const handleGoogleSignIn = async () => {
    signInWithGoogle()
      .then((registeredUser) => {
        if (registeredUser) {
          mutate({
            lead: {
              name: registeredUser.displayName || "",
              email: registeredUser.email || "",
              password: "",
            },
            uid: registeredUser.uid,
          });
        }
      })
      .catch((err) => {
        // TODO - Show Error Alert
        console.error(err);
      });
  };

  const handleFacebookSignIn = () => {
    alert("Implement Facebook Sign In");
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/gallery");
    }
  }, [isSuccess]);

  return (
    <Flex
      p={{ base: "4rem 2.5rem", lg: "4rem 5rem" }}
      gap="2rem"
      flexDir="column"
      alignItems="center"
    >
      <Text as="h1" fontSize="4xl" fontWeight="600" color="green.500">
        Access Account
      </Text>
      <AuthSocialButtons
        onGoogleClick={handleGoogleSignIn}
        onFacebookClick={handleFacebookSignIn}
      />
      <Text>or use your email to access</Text>
      <Box w="100%" maxW="30rem" mt="2rem">
        <LoginForm
          initialValues={{
            email: "",
            password: "",
          }}
          isSubmitting={isLoading}
          isSuccess={isSuccess}
          onSubmit={handleSubmit}
        />
      </Box>
      <Text>
        Don&apos;t have an account?{" "}
        <Link href="/auth?register=true" fontWeight="700">
          Sign Up
        </Link>
      </Text>
    </Flex>
  );
}

export default LoginContainer;
