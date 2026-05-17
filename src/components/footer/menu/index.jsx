'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import MenuLink from '../../link/menu.link';

const MENU_LIST = ['layout-requirements', 'payment-and-delivery', 'terms', 'privacy-policy', 'faq'];

const FooterMenu = () => {
  const tFooterMenu = useTranslations('FooterMenu');

  return (
    <Wrapper aria-label="Дополнительное меню">
      <ul>
        {MENU_LIST.map((key) => (
          <MenuItem key={key}>
            <MenuLink href={key} label={tFooterMenu(key)} />
          </MenuItem>
        ))}
      </ul>
    </Wrapper>
  );
};
export default React.memo(FooterMenu);

const Wrapper = styled.nav`
  display: flex;
  align-items: center;

  a {
    color: var(--mainColor);
  }

  ul {
    width: 100%;
    display: flex;
    list-style: none;
    gap: 24px;
    justify-content: space-between;
    padding: 0;
    margin: 0;

    @media screen and (max-width: 1280px) {
      flex-direction: column;
    }
  }
`;

const MenuItem = styled.li`
  display: flex;
  justify-content: center;
`;
