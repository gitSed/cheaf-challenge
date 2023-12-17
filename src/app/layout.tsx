import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import {
  withFetcherSystem,
  withStyledSystem,
} from "@/features/shared/components";
import { FirebaseProvider } from "@/features/shared/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cheaf Challenge",
  description:
    "Cheaf busca acabar con el desperdicio de alimentos en tiendas y restaurantes",
};

function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const AppWithChakraUI = withStyledSystem(
    ({ children }: PropsWithChildren) => {
      return <>{children}</>;
    },
    "chakra-ui"
  );

  const AppWithReactQuery = withFetcherSystem(AppWithChakraUI, "react-query");

  return (
    <html lang="en">
      <body className={inter.className}>
        <FirebaseProvider>
          <AppWithReactQuery>{children}</AppWithReactQuery>
        </FirebaseProvider>
      </body>
    </html>
  );
}

export default RootLayout;
