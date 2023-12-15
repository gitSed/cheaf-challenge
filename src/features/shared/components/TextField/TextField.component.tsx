"use client";

import { forwardRef, ForwardedRef } from "react";
import { useController } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { FieldErrorMessage } from "@/features/shared/components";

import { TextFieldProps } from "./TextField.types";

function TextField(
  props: TextFieldProps,
  ref?: ForwardedRef<HTMLInputElement>
): JSX.Element {
  const {
    helperText,
    label,
    isDisabled,
    isRequired,
    id,
    showError = true,
    hiddenLabel = false,
    placeholder,
    ...controller
  } = props;
  const { field, fieldState } = useController(controller);

  return (
    <FormControl
      id={id || field.name}
      isInvalid={Boolean(fieldState.error)}
      isDisabled={isDisabled}
      isRequired={isRequired}
    >
      <FormLabel hidden={hiddenLabel}>{label}</FormLabel>
      <Input
        {...field}
        ref={ref}
        type={controller.type || "text"}
        aria-labelledby={`${id || field.name}-label`}
        placeholder={placeholder}
        variant="solid"
      />
      {fieldState.error && fieldState.error.message && showError ? (
        <FieldErrorMessage error={fieldState.error.message} />
      ) : (
        helperText && (
          <FormHelperText textStyle="small1">{helperText}</FormHelperText>
        )
      )}
    </FormControl>
  );
}

export default forwardRef(TextField);
