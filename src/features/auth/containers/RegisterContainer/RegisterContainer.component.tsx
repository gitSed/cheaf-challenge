import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@chakra-ui/next-js";
import { Box, Flex, Text, ToastId, useToast } from "@chakra-ui/react";

import { Alert } from "@/features/shared/components";
import { useFirebase } from "@/features/shared/hooks";
import { Lead } from "@/domain/auth/domain/entities";
import { saveUserInfoUseCase } from "@/domain/auth/application";

import { AuthSocialButtons, RegisterForm } from "../../components";
import { RegisterContainerProps } from "./RegisterContainer.types";

const TOAST_DURATION = 40000;

function RegisterContainer(props: RegisterContainerProps): JSX.Element {
  const { repository, fetcher } = props;

  const router = useRouter();
  const toastIdRef = useRef<ToastId>();
  const { createUserWithEmailAndPassword, signInWithGoogle } = useFirebase();

  const toast = useToast({
    position: "bottom",
    duration: TOAST_DURATION,
  });

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

  const { mutate, isLoading, isSuccess, isError } =
    fetcher.saveUserInfoMutation(saveUserInfoUseCase(repository));

  const handleSubmit = async (values: Lead) => {
    await createUserWithEmailAndPassword(values.email, values.password)
      .then((registeredUser) => {
        if (registeredUser) {
          mutate({ lead: values, uid: registeredUser.uid });
        }
      })
      .catch((err) => {
        showToast(
          "warning",
          "There was an error while trying to create your account"
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
      .catch((err) => {
        showToast(
          "warning",
          "There was an error while trying to create your account"
        );
        console.error(err);
      });
  };

  const handleFacebookSignIn = () => {
    showToast("warning", "Facebook Sign In is not implemented yet");
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/gallery");
    }

    if (isError) {
      showToast(
        "warning",
        "There was an error while trying to create your account"
      );
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
        Create Account
      </Text>
      <AuthSocialButtons
        onGoogleClick={handleGoogleSignIn}
        onFacebookClick={handleFacebookSignIn}
      />
      <Text>or use your email for registration</Text>
      <Box w="100%" maxW="30rem" mt="2rem">
        <RegisterForm
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          isSubmitting={isLoading}
          isSuccess={isSuccess}
          onSubmit={handleSubmit}
        />
      </Box>
      <Text>
        Already have an account?{" "}
        <Link href="/auth?register=false" fontWeight="700">
          Login
        </Link>
      </Text>
    </Flex>
  );
}

export default RegisterContainer;
