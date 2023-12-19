import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex, Text, ToastId, useToast } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

import { useFirebase } from "@/features/shared/hooks";
import { Alert } from "@/features/shared/components";
import { LoginRequest } from "@/domain/auth/domain/entities";
import { saveUserInfoUseCase } from "@/domain/auth/application";

import { AuthSocialButtons, LoginForm } from "../../components";
import { LoginContainerProps } from "./LoginContainer.types";

const TOAST_DURATION = 40000;

function LoginContainer(props: LoginContainerProps) {
  const { fetcher, repository } = props;

  const router = useRouter();
  const toastIdRef = useRef<ToastId>();
  const { signInWithEmailAndPassword, signInWithGoogle } = useFirebase();

  const toast = useToast({
    position: "bottom",
    duration: TOAST_DURATION,
  });

  const { mutate, isLoading, isSuccess, isError } =
    fetcher.saveUserInfoMutation(saveUserInfoUseCase(repository));

  const closeToast = useCallback(() => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }, [toastIdRef, toast]);

  const showToast = useCallback(
    (status: "info" | "warning" | "success", message: string) => {
      toastIdRef.current = toast({
        render: () => {
          return (
            <Alert message={message} status={status} onDismiss={closeToast} />
          );
        },
      });
    },
    [toastIdRef, toast]
  );

  const handleSubmit = async (values: LoginRequest) => {
    await signInWithEmailAndPassword(values.email, values.password)
      .then((user) => {
        if (user) {
          router.push("/gallery");
        }
      })
      .catch((err) => {
        showToast(
          "warning",
          "Invalid credential. Please verify your credentials and try again."
        );
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
      .catch(({ code, message }) => {
        if (code === "auth/invalid-credential") {
          showToast(
            "warning",
            "Invalid credential. Please verify your credentials and try again."
          );
          return;
        }

        showToast("warning", "Something went wrong. Please try again.");
        console.error(code, message);
      });
  };

  const handleFacebookSignIn = () => {
    showToast("warning", "Facebook Sign In is not yet implemented.");
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/gallery");
    }

    if (isError) {
      showToast("warning", "Something went wrong. Please try again.");
    }
  }, [isSuccess, isError]);

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
