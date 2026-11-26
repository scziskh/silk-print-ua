import { getTranslations } from 'next-intl/server';
import SilkScreenClient from './client';
import { FaqSchema } from '@/components/faq/schema';
import FeedbackSection from '@/components/sections/feedback.section';
import { getFirstOfMonthEurRate } from '@/lib/currency';
import { buildTieredPricingRows, getPricingConfig } from '@/lib/pricing';

export const dynamic = 'force-dynamic';

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

export default async function Page() {
  let pricingRows = null;

  try {
    const [pricingConfig, eurRateInfo] = await Promise.all([getPricingConfig('business-cards'), getFirstOfMonthEurRate()]);

    const silkScreenTiers = pricingConfig?.['business-cards']?.['silk-screen-printing'];
    pricingRows = buildTieredPricingRows({
      tierMap: silkScreenTiers,
      eurRate: eurRateInfo?.rate,
      quantities: ['100', '200', '500', '1000'],
      optionKeys: ['1_color', '2_colors', 'next_color'],
    });
  } catch (error) {
    console.error('Ошибка расчёта цен для шелкографии:', error);
  }

  return (
    <>
      <FaqSchema namespace="Services.silk-screen-printing.faq" />
      <SilkScreenClient pricingRows={pricingRows} />
      <FeedbackSection />
    </>
  );
}
