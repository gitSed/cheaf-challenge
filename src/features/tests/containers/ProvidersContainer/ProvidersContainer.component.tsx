import { PropsWithChildren } from "react";

import { withStyledSystem } from "@/features/shared/components";

import { ProvidersContainerProps } from "./ProvidersContainer.types";

function ProvidersContainer(props: ProvidersContainerProps) {
  const { children } = props;

  const AppWithChakraUI = withStyledSystem(
    ({ children }: PropsWithChildren) => {
      return <>{children}</>;
    },
    "chakra-ui"
  );

  return <AppWithChakraUI>{children}</AppWithChakraUI>;
}

export default ProvidersContainer;
