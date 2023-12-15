import { ReactNode } from "react";

export interface ChakraUIProviderProps {
  children: ReactNode;
  theme?: Record<string, unknown>;
}
