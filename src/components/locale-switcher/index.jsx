'use client';

import styled from 'styled-components';
import { Link, routing, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';

const LocaleSwitcher = () => {
  const pathname = usePathname();
  const currentLocale = useLocale();

  const locales = {
    ru: 'Русский',
    uk: 'Українська',
  };

  return (
    <LocaleSwitcherWrapper>
      {routing.locales.map((locale) => (
        <StyledLink key={locale} href={pathname} locale={locale} $active={currentLocale === locale} aria-label={`Switch language to ${locale}`}>
          {locales[locale]}
        </StyledLink>
      ))}
    </LocaleSwitcherWrapper>
  );
};

export default LocaleSwitcher;

const LocaleSwitcherWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: var(--gap);
  gap: var(--gap);
`;

const StyledLink = styled(Link)`
  position: relative;
  display: block;
  pointer-events: ${({ $active }) => ($active ? 'none' : 'all')};
  font-weight: ${({ $active }) => ($active ? '800' : '400')};
  &::after {
    font-weight: 200;
    position: absolute;
    top: 0;
    right: -18px;
    content: '|';
    display: inline-block;
    pointer-events: none;
  }
  &:last-child::after {
    content: '';
  }
  &:hover {
    text-decoration: underline;
  }
`;
