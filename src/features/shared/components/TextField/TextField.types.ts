import { InputProps } from "@chakra-ui/react";

import { BaseInputProps } from "@/features/shared/types";

export type TextFieldProps = BaseInputProps &
  InputProps & {
    rightElement?: React.ReactNode;
  };
