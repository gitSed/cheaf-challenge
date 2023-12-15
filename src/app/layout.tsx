import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { withStyledSystem } from "@/features/shared/components";

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

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWithChakraUI>{children}</AppWithChakraUI>
      </body>
    </html>
  );
}

export default RootLayout;
