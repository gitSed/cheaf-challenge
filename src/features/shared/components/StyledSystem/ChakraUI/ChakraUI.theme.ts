import { extendTheme } from "@chakra-ui/react";

// components
import Input from "./theme-components/Input";
import Link from "./theme-components/Link";

const defaultTheme: Record<string, unknown> = {
  styles: {
    global: {
      "html, body": {
        border: "0",
        margin: "0",
      },
    },
  },
  components: {
    Input,
    Link,
  },
};

export const overrideTheme = (
  customTheme: Record<string, unknown> = {}
): Record<string, unknown> => {
  const theme = { ...defaultTheme, ...customTheme };

  return extendTheme(theme);
};
