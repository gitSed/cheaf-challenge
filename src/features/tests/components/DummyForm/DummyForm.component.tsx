import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { DummyFormProps } from "./DummyForm.types";

function DummyForm({
  children,
  initialValues,
  validationSchema,
  onSubmit,
}: DummyFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...initialValues },
    resolver: zodResolver(validationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            control,
          });
        }
        return child;
      })}
      <Button type="submit" isDisabled={!isValid}>
        Login
      </Button>
    </form>
  );
}

export default DummyForm;
