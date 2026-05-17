'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Container from '@/layouts/container';
import { useGetContactsQuery } from '@/store/api/contacts.api';

export default function SilkScreenClient() {
  const t = useTranslations('Services.silk-screen-printing');
  const contacts = useGetContactsQuery()?.data;

  const richTags = {
    strong: (chunks) => <strong>{chunks}</strong>,
    linkPaper: (chunks) => <Link href="/paper/">{chunks}</Link>,
    linkFoil: (chunks) => <Link href="/services/foil-stamping/">{chunks}</Link>,
  };

  const galleryImages = [
    { src: '/webp/works/small_IMG_4703.webp', alt: t('gallery_alts.0') },
    { src: '/webp/works/small_IMG_4842.webp', alt: t('gallery_alts.1') },
    { src: '/webp/works/small_IMG_4710.webp', alt: t('gallery_alts.2') },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: t('hero.title'),
    description: t('description'),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'UAH',
      price: '845',
      offerCount: '100',
      availability: 'inStock',
    },
  };

  return (
    <Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageWrapper>
        <ServiceHeader title={t('hero.title')} price={t('hero.price')} />
        <TextContent>
          <p>{t.rich('hero.description', richTags)}</p>
        </TextContent>
        <Quote>{t.rich('quotes.first', richTags)}</Quote>
        <TextContent>
          <p>{t.rich('blocks.method', richTags)}</p>
        </TextContent>

        <Gallery images={galleryImages} />

        <TextContent>
          <p>{t.rich('blocks.pantone', richTags)}</p>
        </TextContent>
        <Quote>{t.rich('quotes.second', richTags)}</Quote>
        <TextContent>
          <h3>{t('blocks.designer_paper_title')}</h3>
          <p>{t.rich('blocks.designer_paper', richTags)}</p>
          <h3>{t('features.title')}</h3>
          <ul>
            {t.raw('features.items').map((_, idx) => (
              <li key={idx}>{t.rich(`features.items.${idx}`, richTags)}</li>
            ))}
          </ul>
        </TextContent>
        <PricingTable title={t('pricing.title')} headers={t.raw('pricing.columns')} rows={t.raw('pricing.rows')} note={t('pricing.note')} />
        <ComparisonTable title={t('comparison.title')} headers={t.raw('comparison.headers')} rows={t.raw('comparison.rows')} />
      </PageWrapper>
    </Container>
  );
}

const ServiceHeader = ({ title, price }) => (
  <HeaderStyled>
    <h2>{title}</h2>
    <span>{price}</span>
  </HeaderStyled>
);

const HeaderStyled = styled.header`
  h2 {
    font-size: 2em;
    padding: 25px 0 0px;
    font-weight: 800;
    margin: 0;
  }
  span {
    display: block;
    font-size: 1.1em;
    padding: 0 0 25px;
  }
`;

const Gallery = ({ images }) => (
  <GalleryStyled>
    <div className="post">
      {images.map((img, idx) => (
        <article key={idx}>
          <div className="item">
            <Image
              src={img.src}
              alt={img.alt}
              fill /* Используем fill вместо жестких width/height для лучшей адаптивности */
              sizes="(max-width: 640px) 100vw, (max-width: 800px) 50vw, 33vw" /* SEO: Указываем браузеру, какой размер качать */
              priority={idx === 0} /* SEO: Первую картинку грузим с приоритетом (LCP) */
              style={{ objectFit: 'cover' }}
            />
          </div>
        </article>
      ))}
    </div>
  </GalleryStyled>
);

const GalleryStyled = styled.section`
  margin: 20px 0;
  .post {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(3, 1fr);
  }
  article {
    overflow: hidden;
    aspect-ratio: 1;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    .item {
      width: 100%;
      height: 100%;
      position: relative;
    }
    img {
      transition: transform 0.25s;
    }
    &:hover img {
      transform: scale(1.3) rotate(10deg);
    }
  }
  @media (max-width: 800px) {
    .post {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 640px) {
    .post {
      grid-template-columns: 1fr;
    }
  }
`;

const PageWrapper = styled.main`
  padding: 60px 0;
  color: var(--mainColor);

  strong {
    color: black;
    font-weight: 600;
  }
  a {
    color: var(--mainColor);
    text-decoration: none;
    transition: opacity 0.2s;
    &:hover {
      text-decoration: underline;
      opacity: 0.8;
    }
  }
`;

// ==========================================
// 3. МИКРО-КОМПОНЕНТЫ И СТИЛИ (Деструктуризация)
// ==========================================

const TextContent = styled.div`
  p {
    margin-bottom: 20px;
    text-align: justify;
    line-height: 1.2;
  }
  h3 {
    font-size: 1.5em;
    padding: 25px 0 10px;
    font-weight: 800;
  }
  ul {
    list-style-type: square;
    padding-left: 40px;
    margin-bottom: 20px;
    li {
      margin-bottom: 5px;
    }
  }
`;

const Quote = styled.blockquote`
  text-transform: uppercase;
  font-size: 1em;
  max-width: 800px;
  text-align: center;
  margin: 30px auto;
  padding: 25px 0;
  border-top: 1px solid var(--secondaryColor);
  border-bottom: 1px solid var(--secondaryColor);
  strong {
    font-weight: 800;
  }
`;

const PricingTable = ({ title, headers, rows, note }) => (
  <TableWrapper>
    <h3>{title}</h3>
    <div className="d-table">
      <div className="d-tr header">
        {headers.map((h, i) => (
          <div key={i} className="d-td">
            {h}
          </div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} className="d-tr">
          {row.map((cell, j) => (
            <div key={j} className="d-td">
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
    <small>{note}</small>
  </TableWrapper>
);

const TableWrapper = styled.div`
  margin: 40px 0;
  .d-table {
    display: table;
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0;
  }
  .d-tr {
    display: table-row;
  }
  .d-td {
    display: table-cell;
    text-align: center;
    border: 1px solid var(--lightColor);
    vertical-align: middle;
    width: 25%;
    padding: 8px;
  }
  .header .d-td {
    font-weight: bold;
    background: var(--contrastGrad);
  }
  small {
    display: block;
    margin: 25px 0;
  }
`;

const ComparisonTable = ({ title, headers, rows }) => (
  <ComparisonStyled className="pc-only">
    <h3>{title}</h3>
    <div className="b-table">
      {headers.map((h, i) => (
        <div key={`th-${i}`} className="b-td">
          <h4>{h}</h4>
        </div>
      ))}
      {rows.map((row, i) =>
        row.map((cell, j) => (
          <div key={`${i}-${j}`} className="b-td">
            {cell}
          </div>
        )),
      )}
    </div>
  </ComparisonStyled>
);

const ComparisonStyled = styled.div`
  margin: 40px 0;
  .b-table {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 2px;
  }
  .b-td {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    text-align: center;
    min-height: 40px;
    background: #fff;
  }
  .b-td:nth-child(8n - 4),
  .b-td:nth-child(8n - 5),
  .b-td:nth-child(8n - 6),
  .b-td:nth-child(8n - 7) {
    background: var(--contrastGrad);
  }
  .b-td:nth-child(4n + 1) {
    font-weight: 600;
    justify-content: flex-start;
    text-align: left;
  }
`;
