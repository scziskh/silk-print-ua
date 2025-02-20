'use client';

/*Libs*/
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

/*Components*/
import MenuLink from '../../link/menu.link';

const FooterMenu = () => {
  /*Translations*/
  const tFooterMenu = useTranslations('FooterMenu');

  /*Lists*/
  const menuList = [
    { href: 'layout-requirements', label: tFooterMenu('layout-requirements') },
    { href: 'payment-and-delivery', label: tFooterMenu('payment-and-delivery') },
    { href: 'terms', label: tFooterMenu('terms') },
    { href: 'privacy-policy', label: tFooterMenu('privacy-policy') },
    { href: 'faq', label: tFooterMenu('faq') },
  ];

  return (
    <Wrapper>
      <ul>
        {menuList.map((props, key) => (
          <MenuLink key={key} {...props} />
        ))}
      </ul>
    </Wrapper>
  );
};

export default FooterMenu;

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
    @media screen and (max-width: 1280px) {
      display: block;
      transition-duration: var(--transitionDuration);
      li {
        justify-content: center;
        display: flex;
        text-align: center;
        padding: 8px 0;
      }
    }
  }
`;
