"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { IReactQueryProviderProps } from "./ReactQuery.types";

const queryClient = new QueryClient();

function ReactQueryProvider(props: IReactQueryProviderProps) {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryProvider;
