import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Providers from "../providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Sample",
  description: "This sample written in next.js contains test, story and components",
};
interface RootLayoutProps {
  children: React.ReactNode;
  locale: never;
}

export default function RootLayout({ children, locale }: RootLayoutProps) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
