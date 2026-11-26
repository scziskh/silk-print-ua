import { useTranslations } from 'next-intl';

const stripXmlTags = (value) =>
  String(value || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export function FaqSchema({ namespace }) {
  const t = useTranslations(namespace);
  const rawItems = t.raw('items');

  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return null;
  }

  const mainEntity = rawItems
    .map((item) => {
      const answerText = stripXmlTags(item?.answer);
      if (!item?.question || !answerText) {
        return null;
      }
      return {
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answerText,
        },
      };
    })
    .filter(Boolean);

  if (mainEntity.length === 0) {
    return null;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
}

export default FaqSchema;
