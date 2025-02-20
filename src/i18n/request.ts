import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import { translationsConfig } from '@/configs/translations.config';
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
 
  if (!locale || !routing.locales.includes(locale as any)) {
    if (locale === 'ua') {
      locale = 'uk';
    }
    locale = routing.defaultLocale;
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});