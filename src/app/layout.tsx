import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import TanStackQueryProvider from "@/providers/TanStackQueryProvider";

export type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Map Navigator",
  description: "A web app for map navigation",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <TanStackQueryProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
