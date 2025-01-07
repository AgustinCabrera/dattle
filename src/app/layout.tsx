import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "./globals.css";
import ContextProvider from "../context/GlobalContext";
import SessionWrapper from "../components/sessionWrapper";

export const metadata: Metadata = {
  title: "Dattle",
  description: "a software company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // add font to className, also add antialiased and dark mode
    <html>
      <body>
        <ContextProvider>
          <Theme>
            <SessionWrapper>{children}</SessionWrapper>
          </Theme>
        </ContextProvider>
      </body>
    </html>
  );
}
