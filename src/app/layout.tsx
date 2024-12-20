import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "./globals.css";
import ContextProvider from "../context/GlobalContext"
export const metadata: Metadata = {
  title: "Dattle",
  description: "a software company",
  icons: {
    icon: "/favicon.ico", // Path to your favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // add font to className, also add antialiased and dark mode
    <html >
      <body>
      <ContextProvider>
          <Theme>
            {children}
          </Theme>
        </ContextProvider>
        </body>
    </html>
  );
}