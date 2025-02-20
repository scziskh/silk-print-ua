import Footer from '@/components/footer';
import FeedbackSection from '@/components/sections/feedback.section';
import MainScreenSection from '@/components/sections/main-screen.section';
import PaperSection from '@/components/sections/paper.section';
import ServiceAboutSection from '@/components/sections/service-about.section';
import { lazy } from 'react';

const WorksSection = lazy(() => import('@/components/sections/works.section'));

const HomePage = () => {
  return (
    <>
      <MainScreenSection />
      <WorksSection />
      <PaperSection />
      <ServiceAboutSection />
      <FeedbackSection />
      <Footer />
    </>
  );
};

export default HomePage;
