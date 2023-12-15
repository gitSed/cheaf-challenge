import { UseControllerProps } from "react-hook-form";

export type BaseInputProps = UseControllerProps<any> & {
  label: string;
  placeholder?: string;
  isDisabled?: boolean;
  helperText?: string;
  showError?: boolean;
  hiddenLabel?: boolean;
};

export type RadioInputProps = UseControllerProps<any> & {
  isDisabled?: boolean;
};

export type RadioGroupProps = UseControllerProps<any> & {
  label: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  helperText?: string;
  showError?: boolean;
  hiddenLabel?: boolean;
};
