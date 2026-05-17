import { reviewsData } from '@/constants/reviews.data';
import { useTranslations } from 'next-intl';

const address = {
  '@type': 'PostalAddress',
  addressCountry: 'UA',
  addressLocality: 'Kyiv',
  addressRegion: 'Kyiv City',
  postalCode: '03039',
  streetAddress: 'Demiivskyi Lane 7',
};

const email = 'sale@silk-print.com.ua';
const telephone = '+380932852262';

const geo = {
  '@type': 'GeoCoordinates',
  latitude: '50.4029959',
  longitude: '30.5121444',
};
const openingHoursSpecification = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '10:00',
    closes: '18:00',
  },
];
const hasMap = 'https://maps.app.goo.gl/yantv8MuC9VwKbUp9';
const logo = {
  '@type': 'ImageObject',
  url: 'https://silk-print.com.ua/schema/logo.svg',
};
const priceRange = '500-5000 UAH';
const aggregateRating = {
  '@type': 'AggregateRating',
  ratingValue: '5',
  reviewCount: '12',
  bestRating: '5',
  worstRating: '1',
};

const review = reviewsData.map((item) => ({
  '@type': 'Review',
  reviewRating: {
    '@type': 'Rating',
    ratingValue: item.rating,
    bestRating: item.rating,
  },
  author: {
    '@type': 'Person',
    name: item.name,
  },
  reviewBody: item.text,
  datePublished: item.date,
}));

export const LocalBusinessSchema = ({ locale }) => {
  const t = useTranslations('Schema');

  const schema = {
    '@context': 'https://schema.org',
    '@id': 'https://silk-print.com.ua/#localbusiness',
    '@type': 'LocalBusiness',
    name: 'Silk Print',
    legalName: t('localBusiness.legalName'),
    description: t('localBusiness.description'),
    logo,
    url: locale === 'uk' ? 'https://silk-print.com.ua/' : `https://silk-print.com.ua/${locale}/`,
    image: ['https://silk-print.com.ua/images/shop-outside.jpg', 'https://silk-print.com.ua/images/print-process.jpg'],
    address,
    email,
    telephone,
    geo,
    hasMap,
    foundingDate: '2019-06-01',
    openingHoursSpecification,
    priceRange,
    sameAs: ['https://www.instagram.com/silk.print/'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '12',
    },
    aggregateRating,
    review,
  };

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
};
