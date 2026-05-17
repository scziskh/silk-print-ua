import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ru', 'uk'],
  defaultLocale: 'uk',
  localePrefix: 'as-needed',
  localeDetection: false,
});

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);
