import ServiceSection from '@/components/sections/service.section';
import { allServicesData } from '@/constants/services.data';
import { getTranslations, setRequestLocale } from 'next-intl/server';

const ServicesPage = async ({ params }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: allServicesData.map((service, index) => {
      return {
        '@type': 'ListItem',
        position: index + 1,
        url: `https://silk-print.com.ua${service.href}/`,
        name: t(`${service.sectionKey}.title`),
      };
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {allServicesData.map((data) => (
        <ServiceSection key={data.sectionKey} data={data} />
      ))}
    </>
  );
};

export default ServicesPage;
