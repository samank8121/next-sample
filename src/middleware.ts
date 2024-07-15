import createMiddleware from 'next-intl/middleware';

const middleware = createMiddleware({
  locales: ['en', 'de'],
  defaultLocale: 'en'
});

export default middleware;

export const config = {
  matcher: ['/', '/(de|en)/:page*']
};