import { ComponentType, PropsWithChildren } from "react";
import dynamic from "next/dynamic";

import { StyledSystemType } from "./StyledSystem.types";

const StyledSystemComponents = {
  "chakra-ui": {
    component: dynamic(() =>
      import("./ChakraUI").then((mod) => mod.ChakraUIProvider)
    ),
  },
  tailwindcss: null,
  "styled-components": null,
};

function withStyledSystem<C>(
  Component: ComponentType<C>,
  system?: StyledSystemType
) {
  const SyledSystemComponent = system
    ? StyledSystemComponents[system]?.component || "div"
    : "div";

  const StyledComponent = (props: PropsWithChildren<C>) => {
    return (
      <SyledSystemComponent>
        <Component {...props} />
      </SyledSystemComponent>
    );
  };

  return StyledComponent;
}

export default withStyledSystem;
