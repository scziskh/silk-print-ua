'use client';

import React, { useMemo } from 'react';
import { Link } from '@/i18n/routing';
import Container from '@/layouts/container';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

const BASE_URL = 'https://silk-print.com.ua';

const Breadcrumbs = () => {
  const tPagesName = useTranslations('PagesName');
  const locale = useLocale();
  const paths = usePathname();

  // Оптимизация: вычисляем пути и JSON-LD только при изменении URL
  const { pathNames, jsonLd } = useMemo(() => {
    const segments = paths.split('/').filter(Boolean);

    // Безопасно убираем локаль (ru/uk) из массива путей
    if (segments.length > 0 && (segments[0] === 'ru' || segments[0] === 'uk')) {
      segments.shift();
    }

    // Формируем элементы для микроразметки JSON-LD
    const itemListElement = [
      {
        '@type': 'ListItem',
        position: 1,
        name: tPagesName(locale), // Название главной страницы ("Главная" / "Головна")
        item: `${BASE_URL}/${locale}/`,
      },
    ];

    segments.forEach((segment, index) => {
      const urlPath = segments.slice(0, index + 1).join('/');
      itemListElement.push({
        '@type': 'ListItem',
        position: index + 2,
        name: tPagesName(`${segment}.short`),
        item: `${BASE_URL}/${locale}/${urlPath}/`, // Учитываем trailingSlash: true
      });
    });

    return {
      pathNames: segments,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement,
      },
    };
  }, [paths, locale, tPagesName]);

  const separator = <Separator aria-hidden="true"> / </Separator>;

  // Защита от ошибки на главной странице (когда pathNames пустой)
  const currentPageKey = pathNames.length > 0 ? pathNames[pathNames.length - 1] : 'home';

  return (
    // Семантический тег nav с aria-label для доступности
    <NavBar aria-label="breadcrumb">
      <Background>
        <Image
          src="/assets/breadcrumbs.webp"
          alt="Трафаретная печать на бумаге"
          width={1920}
          height={1200}
          priority // Важно для LCP (Largest Contentful Paint)
        />
      </Background>

      <Container>
        <h1>{tPagesName(`${currentPageKey}.full`)}</h1>

        {/* Семантический список ol для крошек */}
        <MapLink>
          <li>
            <Link href="/">{tPagesName(locale)}</Link>
          </li>

          {pathNames.length > 0 && separator}

          {pathNames.map((link, index) => {
            const href = `/${pathNames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathNames.length - 1;

            return (
              <React.Fragment key={index}>
                <li>
                  {/* Текущая страница не должна быть ссылкой */}
                  {isLast ? <span aria-current="page">{tPagesName(`${link}.short`)}</span> : <Link href={href}>{tPagesName(`${link}.short`)}</Link>}
                </li>
                {!isLast && separator}
              </React.Fragment>
            );
          })}
        </MapLink>
      </Container>

      {/* Внедрение микроразметки JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </NavBar>
  );
};

export default Breadcrumbs;

/* --- Styled Components --- */

const NavBar = styled.nav`
  padding: 36px 0;
  background: var(--mainColor);
  text-shadow: 1px 1px 20px rgba(0, 0, 0, 1);
  position: relative;
  text-align: center;
  color: #fff;
  overflow: hidden;
  z-index: 10;
  box-shadow: var(--darkShadow);

  h1 {
    margin: 0 auto;
    display: block;
    max-width: 70%;
    /* Исправлено для мобильных: min-width ломал верстку на телефонах */
    width: 100%;
    font-size: 28px;
    position: relative;
    z-index: 2; /* Поднимаем текст над фоном */
  }

  @media (min-width: 480px) {
    h1 {
      min-width: 480px;
      width: auto;
    }
  }
`;

const MapLink = styled.ol`
  display: block;
  margin: 25px 0 0;
  padding: 0;
  list-style: none;
  position: relative;
  z-index: 2; /* Поднимаем ссылки над фоном */

  li {
    display: inline;
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Стили для неактивного (текущего) элемента крошек */
  span[aria-current='page'] {
    cursor: default;
  }
`;

const Separator = styled.span`
  margin: 0 8px;
  color: rgba(255, 255, 255, 0.7);
`;

const Background = styled.div`
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(to bottom, #313131 0%, #798696 100%);
    opacity: 0.7;
    z-index: 1;
  }

  img {
    filter: blur(150px);
    min-width: 100%;
    min-height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -50%;
    z-index: 0;
  }
`;
