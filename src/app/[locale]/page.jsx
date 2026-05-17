import { lazy } from 'react';
import { getTranslations } from 'next-intl/server';

import ClientsMarqueeSection from '@/components/sections/clients-marquee';
import ReviewsSection from '@/components/sections/reviews.section';
import FeedbackSection from '@/components/sections/feedback.section';
import MainScreenSection from '@/components/sections/main-screen.section';
import PaperSection from '@/components/sections/paper.section';
import ServiceAboutSection from '@/components/sections/service-about.section';

const WorksSection = lazy(() => import('@/components/sections/works.section'));

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta.homepage' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/`,
    },
  };
}
const HomePage = async () => {
  return (
    <>
      <MainScreenSection />
      <WorksSection />
      <PaperSection />
      <ServiceAboutSection />
      <FeedbackSection />
      <ClientsMarqueeSection />
      <ReviewsSection />
    </>
  );
};

export default HomePage;
