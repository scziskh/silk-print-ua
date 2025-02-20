'use client';

import { useTranslations } from 'next-intl';
import styled, { css } from 'styled-components';
import MenuLink from '../../link/menu.link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const NavbarMenu = () => {
  const tMainMenu = useTranslations('MainMenu');
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // More descriptive name

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close menu on route change
  }, [router]);

  const menuList = [
    { href: '', label: tMainMenu('homepage') },
    { href: 'services', label: tMainMenu('services') },
    { href: 'products', label: tMainMenu('products') },
    { href: 'our-works', label: tMainMenu('our-works') },
    { href: 'contacts', label: tMainMenu('contacts') },
  ];

  return (
    <StyledNavbar>
      <input type="checkbox" id="menu_toggle" checked={isMobileMenuOpen} onChange={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menu" />
      <StyledBurgerLabel htmlFor="menu_toggle">
        <StyledBurgerIcon />
      </StyledBurgerLabel>
      <StyledMenuList>
        {menuList.map((menuItem, index) => (
          <StyledMenuItem key={index}>
            <MenuLink {...menuItem} />
          </StyledMenuItem>
        ))}
      </StyledMenuList>
    </StyledNavbar>
  );
};

export default NavbarMenu;

const burgerStyles = css`
  display: block;
  position: absolute;
  width: 28px;
  height: 2px;
  background: var(--contrastGrad);
  transition-duration: var(--transitionDuration);
`;

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;

  a {
    color: var(--contrastColor);
  }

  input {
    opacity: 0;
    @media screen and (max-width: 1024px) {
      visibility: visible;
    }

    &:checked ~ label > span {
      transform: rotate(45deg);
    }

    &:checked ~ label > span::before {
      top: 0;
      transform: rotate(0);
    }

    &:checked ~ label > span::after {
      top: 0;
      transform: rotate(90deg);
    }

    &:checked ~ ul {
      right: 0;
    }
  }
`;

const StyledBurgerLabel = styled.label`
  display: none;
  position: absolute;
  right: 0;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 10px;
  cursor: pointer;
  z-index: 99;

  @media screen and (max-width: 1024px) {
    display: flex;
  }
`;

const StyledBurgerIcon = styled.span`
  ${burgerStyles}
  &::before {
    ${burgerStyles}
    content: '';
    top: -10px;
  }
  &::after {
    ${burgerStyles}
    content: '';
    top: 10px;
  }
`;

const StyledMenuList = styled.ul`
  display: flex;
  list-style: none;
  gap: 24px;

  @media screen and (max-width: 1024px) {
    display: block;
    position: fixed;
    width: 320px;
    top: 0;
    right: -100%;
    height: 100%;
    padding: 80px;
    margin: 0;
    background: var(--mainGrad);
    box-shadow: var(--darkShadow);
    z-index: 49;
    transition-duration: var(--transitionDuration);

    li {
      display: flex;
      justify-content: center;
      text-align: center;
      padding: 16px 0;
    }
  }
`;

const StyledMenuItem = styled.li``;
