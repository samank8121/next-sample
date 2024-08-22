import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ClientProviders from "../providers";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Modals from "../modals";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Sample",
  description: "This sample written in next.js contains test, story and components",
  manifest: "/manifest.json",
};
interface RootLayoutProps {
  children: React.ReactNode;
  locale: never;
}
export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default async function RootLayout({ children, locale }: RootLayoutProps) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ClientProviders>
            <Modals />
            {children}
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
