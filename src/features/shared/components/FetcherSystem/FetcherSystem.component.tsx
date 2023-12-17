import { ComponentType, PropsWithChildren } from "react";
import dynamic from "next/dynamic";

import { FetcherSystemType } from "./FetcherSystem.types";

const FetcherSystemComponents = {
  "react-query": {
    component: dynamic(() =>
      import("./ReactQuery").then((mod) => mod.ReactQueryProvider)
    ),
  },
  axios: null,
  swr: null,
};

function withFetcherSystem<C>(
  Component: ComponentType<C>,
  system?: FetcherSystemType
) {
  const FetcherSystemComponent = system
    ? FetcherSystemComponents[system]?.component || "div"
    : "div";

  const FetcherComponent = (props: PropsWithChildren<C>) => {
    return (
      <FetcherSystemComponent>
        <Component {...props} />
      </FetcherSystemComponent>
    );
  };

  return FetcherComponent;
}

export default withFetcherSystem;
