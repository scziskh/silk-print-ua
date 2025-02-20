import { routing } from '@/i18n/routing';
import { redirect } from 'next/navigation';

export const generateMetadata = async () => {
  return {
    title: 'Визитки премиум класса: тиснение, шелкография и др. — Silk Print',
    description:
      'Премиум визитки с тиснением золотой и серебряной фольгой, высечкой, выборочным лаком. ➢ На черной, цветной бумаге, пластике в Киеве.',
    metadataBase: new URL('https://silk-print.com.ua'),
    alternates: {
      canonical: `/ru/`,
      languages: {
        ru: '/ru/',
        uk: '/uk/',
      },
    },
  };
};

export default function RootPage() {
  redirect(routing.defaultLocale);
}
