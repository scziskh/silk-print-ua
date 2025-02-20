import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import StyledComponentsRegistry from '@/lib/registry';
import ClientLayout from '@/layouts/client.layout';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { Mulish } from 'next/font/google';
import StoreProvider from '@/layouts/store-provider';

const mulish = Mulish({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const LocaleLayout = async ({ children, params }) => {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    setRequestLocale('ru');
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={mulish.className}>
      <body>
        <StyledComponentsRegistry>
          <NextIntlClientProvider messages={messages}>
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
