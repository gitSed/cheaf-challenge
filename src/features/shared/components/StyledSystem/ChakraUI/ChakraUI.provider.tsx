"use client";
import { ChakraBaseProvider } from "@chakra-ui/react";

import { overrideTheme } from "./ChakraUI.theme";
import { ChakraUIProviderProps } from "./ChakraUI.types";

function ChakraUIProvider(props: ChakraUIProviderProps) {
  const { children, theme } = props;

  return (
    <ChakraBaseProvider theme={overrideTheme(theme)}>
      {children}
    </ChakraBaseProvider>
  );
}

export default ChakraUIProvider;
