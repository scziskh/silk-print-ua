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
  const menuList = ['layout-requirements', 'payment-and-delivery', 'terms', 'privacy-policy', 'faq'];

  return (
    <Wrapper>
      <ul>
        {menuList.map((key) => (
          <MenuItem key={key}>
            <MenuLink href={key} label={tFooterMenu(key)} />
          </MenuItem>
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
      flex-direction: column;
      transition-duration: var(--transitionDuration);
    }
  }
`;

const MenuItem = styled.li`
  justify-content: center;
  display: flex;
`;
