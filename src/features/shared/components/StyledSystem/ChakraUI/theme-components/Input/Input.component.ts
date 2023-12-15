import { defineStyleConfig } from "@chakra-ui/react";

const Input = defineStyleConfig({
  baseStyle: {
    field: {
      height: "48px",
      borderRadius: "8px",
      padding: "0.88rem 1rem",
      _focus: {
        borderColor: "blue.500",
        borderWidth: "1.5px",
      },
      _focusWithin: {
        borderColor: "blue.500",
        borderWidth: "1.5px",
      },
      _focusVisible: {
        outlineStyle: "none",
        boxShadow: "none",
      },
      _invalid: {
        borderColor: "red.500",
      },
      _disabled: {
        color: "gray.500",
        borderColor: "gray.200",
        opacity: 0.5,
        background: "gray.100",
      },
      _placeholder: {
        color: "gray.700",
      },
    },
  },
  variants: {
    solid: {
      field: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "gray.700",
      },
    },
  },
});

export default Input;
