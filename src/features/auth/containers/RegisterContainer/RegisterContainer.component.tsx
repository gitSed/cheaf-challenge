import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@chakra-ui/next-js";
import { Box, Flex, Text } from "@chakra-ui/react";

import { useFirebase } from "@/features/shared/hooks";
import { Lead } from "@/domain/auth/domain/entities";
import { saveUserInfoUseCase } from "@/domain/auth/application";

import { AuthSocialButtons, RegisterForm } from "../../components";
import { RegisterContainerProps } from "./RegisterContainer.types";

function RegisterContainer(props: RegisterContainerProps): JSX.Element {
  const { repository, fetcher } = props;

  const router = useRouter();
  const { createUserWithEmailAndPassword, signInWithGoogle } = useFirebase();

  const { mutate, isLoading, isSuccess } = fetcher.saveUserInfoMutation(
    saveUserInfoUseCase(repository)
  );

  const handleSubmit = async (values: Lead) => {
    await createUserWithEmailAndPassword(values.email, values.password)
      .then((registeredUser) => {
        if (registeredUser) {
          mutate({ lead: values, uid: registeredUser.uid });
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
