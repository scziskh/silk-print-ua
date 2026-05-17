import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import StyledComponentsRegistry from '@/lib/registry';
import ClientLayout from '@/layouts/client.layout';
import { routing } from '@/i18n/routing';
import { Mulish } from 'next/font/google';
import StoreProvider from '@/layouts/store-provider';
import { notFound } from 'next/navigation'; // Меняем redirect на notFound
import { LocalBusinessSchema } from '@/components/schema';

const mulish = Mulish({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const LocaleLayout = async ({ children, params }) => {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={mulish.className}>
      <head>
        <LocalBusinessSchema locale={locale} />
      </head>
      <body>
        <StyledComponentsRegistry>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <StoreProvider>
              <ClientLayout>{children}</ClientLayout>
            </StoreProvider>
          </NextIntlClientProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default LocaleLayout;
