import { useEffect } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextField } from "@/features/shared/components";
import { RegisterFormSchema } from "@/domain/auth/domain/schemas";

import { RegisterFormProps } from "./RegisterForm.types";

function RegisterForm(props: RegisterFormProps): JSX.Element {
  const { initialValues, isSubmitting, isSuccess, onSubmit } = props;

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onChange",
    defaultValues: { ...initialValues },
  });

  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess, reset]);

  return (
    <Flex
      as="form"
      w="100%"
      flexDir="column"
      gap="1.5rem"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField name="name" label="Name" control={control} />
      <TextField name="email" label="Email" control={control} />
      <TextField name="password" label="Password" control={control} />

      <Button
        type="submit"
        isLoading={isSubmitting}
        isDisabled={!isValid}
        minH="3rem"
        bgColor="yellow.100"
        _hover={{
          bgColor: "yellow.200",
          textDecoration: "none",
        }}
      >
        Sign Up
      </Button>
    </Flex>
  );
}

export default RegisterForm;
