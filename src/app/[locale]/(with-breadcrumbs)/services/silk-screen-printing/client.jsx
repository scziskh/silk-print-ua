'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useLocale, useTranslations } from 'next-intl';
import Container from '@/layouts/container';
import { richTags } from '@/configs/richTags';

export default function SilkScreenClient() {
  const t = useTranslations('Services.silk-screen-printing');
  const tMeta = useTranslations('Meta.silk-screen-printing');
  const locale = useLocale();

  const galleryImages = [
    { src: '/assets/works/small_IMG_4703.webp' },
    { src: '/assets/works/small_IMG_4842.webp' },
    { src: '/assets/works/small_IMG_4710.webp' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: t('hero.title'),
    image: 'https://silk-print.com.ua/webp/works/small_IMG_4703.webp',
    description: tMeta('description'),
    brand: {
      '@type': 'Brand',
      name: 'Silk Print',
    },
    offers: {
      '@type': 'Offer',
      url: `https://silk-print.com.ua/${locale !== 'uk' && locale}services/silk-screen-printing/`,
      priceCurrency: 'UAH',
      price: '845',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
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
              alt={'img.alt'}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 800px) 50vw, 33vw"
              priority={idx === 0}
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
  padding: 60px 0 0;
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
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid var(--lightColor);
    margin: 14px 0;
  }
  .d-tr {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
  }
  .d-tr:not(:last-child) {
    border-bottom: 1px solid var(--lightColor);
  }
  .d-td {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 8px;
    min-height: 40px;
  }
  .d-tr:not(.header) .d-td:not(:last-child) {
    border-right: 1px solid var(--lightColor);
  }
  /* Градиент на всю строку шапки */
  .header {
    background: var(--contrastGrad);
    font-weight: bold;
    border-bottom: 1px solid var(--lightColor);
  }
  .header .d-td {
    border-right: 1px solid var(--lightColor);
  }
  small {
    display: block;
    margin: 25px 0;
  }
`;

const ComparisonTable = ({ title, headers, rows }) => (
  <ComparisonStyled>
    <h3>{title}</h3>
    {/* Обертка, которая будет скроллиться на мобилках */}
    <div className="table-responsive">
      <div className="b-table">
        {/* Заголовки в отдельной строке */}
        <div className="b-tr b-header">
          {headers.map((h, i) => (
            <div key={`th-${i}`} className="b-td">
              <h4>{h}</h4>
            </div>
          ))}
        </div>
        {/* Каждая строка рендерится как самостоятельный grid-контейнер */}
        {rows.map((row, i) => (
          <div key={i} className="b-tr data-row">
            {row.map((cell, j) => (
              <div key={`${i}-${j}`} className="b-td">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </ComparisonStyled>
);

const ComparisonStyled = styled.div`
  margin: 40px 0;

  /* 1. Адаптивная обертка */
  .table-responsive {
    width: 100%;
    overflow-x: auto; /* Включаем горизонтальный скролл при выходе за пределы экрана */
    -webkit-overflow-scrolling: touch; /* Плавный инерционный скролл на iOS */

    /* Скрываем стандартный некрасивый скроллбар в некоторых браузерах (опционально) */
    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
  }

  .b-table {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
    /* 2. Задаем минимальную ширину, ниже которой таблица сжиматься не будет */
    min-width: 650px;
  }

  .b-tr {
    display: grid;
    /* Пропорции колонок: текст занимает больше места, оценки — поровну */
    grid-template-columns: 2.2fr 1fr 1fr 1fr;
    width: 100%;
    background: #fff;
  }

  .b-td {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 12px; /* Чуть увеличил отступы для кликабельности и читаемости */
    text-align: center;
    min-height: 44px; /* 44px — рекомендация Google для мобильных элементов */
    background: transparent;
  }

  .b-table .data-row:nth-child(odd) {
    background: var(--contrastGrad);
  }

  .b-header {
    font-weight: bold;
    background: var(--contrastGrad);
  }

  /* Первая колонка (свойства) */
  .b-td:nth-child(4n + 1) {
    font-weight: 600;
    justify-content: flex-start;
    text-align: left;
  }

  /* Небольшая оптимизация шрифтов для мобильных экранов внутри таблицы */
  @media (max-width: 768px) {
    h3 {
      font-size: 1.3em;
      margin-bottom: 15px;
    }
    .b-td {
      font-size: 0.9em;
      padding: 8px 10px;
    }
    h4 {
      font-size: 0.95em;
    }
  }
`;
