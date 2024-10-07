import { notFound } from "next/navigation";
import { getRequestConfig } from 'next-intl/server';

const locales: string[] = ['en', 'de'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();
  const messages = {
    ...(await import(`../content/${locale}/home.json`)).default,
    ...(await import(`../content/${locale}/product.json`)).default,
    ...(await import(`../content/${locale}/cart.json`)).default,
    ...(await import(`../content/${locale}/login.json`)).default,
    ...(await import(`../content/${locale}/general.json`)).default,
  };
  return {
    messages
  };
});