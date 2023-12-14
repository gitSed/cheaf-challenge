import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cheaf Challenge",
  description:
    "Cheaf busca acabar con el desperdicio de alimentos en tiendas y restaurantes",
};

function App({ children }: { children: React.ReactNode }): JSX.Element {
  return <ChakraProvider>{children}</ChakraProvider>;
}

function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <App>{children}</App>
      </body>
    </html>
  );
}

export default RootLayout;
