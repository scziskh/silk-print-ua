import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ru', 'uk'],
  defaultLocale: 'uk',
  localePrefix: {
    mode: 'always',
    prefixes: {
      'ru': '/',
      'uk': '/ua'
      // (/zh will be used as-is)
    }
  }
});

export const {Link, getPathname, redirect, usePathname, useRouter} =
  createNavigation(routing);