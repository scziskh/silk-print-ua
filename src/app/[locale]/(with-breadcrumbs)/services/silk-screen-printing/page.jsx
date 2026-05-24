import { getTranslations } from 'next-intl/server';
import SilkScreenClient from './client';
import FeedbackSection from '@/components/sections/feedback.section';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta.silk-screen-printing' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/services/silk-screen-printing/`,
    },
  };
}

export default function Page() {
  return (
    <>
      <SilkScreenClient />
      <FeedbackSection />
    </>
  );
}
