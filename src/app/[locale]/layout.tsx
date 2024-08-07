import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ClientProviders from "../providers";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Sample",
  description: "This sample written in next.js contains test, story and components",
};
interface RootLayoutProps {
  children: React.ReactNode;
  locale: never;
}

export default async function RootLayout({ children, locale }: RootLayoutProps) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ClientProviders>{children}</ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
