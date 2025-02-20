'use client';

/*Libs*/
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

/*Components*/
import MenuLink from '../../link/menu.link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const NavbarMenu = () => {
  /*Translations*/
  const tMainMenu = useTranslations('MainMenu');

  /*Refs*/
  const burger = useRef();

  /*Router*/
  const router = useRouter();

  /*States*/
  const [isChecked, setIsChecked] = useState(false);
  const [isClient, setIsClient] = useState(false);

  /*Effects*/
  useEffect(() => setIsClient(true), []);
  useEffect(() => setIsChecked(false), [router]);

  /*Lists*/
  const menuList = [
    { href: '', label: tMainMenu('homepage') },
    { href: 'services', label: tMainMenu('services') },
    { href: 'products', label: tMainMenu('products') },
    { href: 'our-works', label: tMainMenu('our-works') },
    { href: 'contacts', label: tMainMenu('contacts') },
  ];
  if (!isClient) {
    return <></>;
  }

  return (
    <Wrapper>
      <input type="checkbox" id="menu_toggle" ref={burger} checked={isChecked} readOnly={true} aria-label="Menu" />
      <label htmlFor="menu_toggle" onClick={() => setIsChecked((state) => !state)}>
        <span></span>
      </label>
      <ul>
        {menuList.map((props, key) => (
          <MenuLink key={key} {...props} />
        ))}
      </ul>
    </Wrapper>
  );
};

export default NavbarMenu;

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  a {
    color: var(--contrastColor);
  }
  input {
    opacity: 0;
    @media screen and (max-width: 768px) {
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
  label {
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
    & > span,
    & > span::before,
    & > span::after {
      display: block;
      position: absolute;
      width: 28px;
      height: 2px;
      background: var(--contrastGrad);
      transition-duration: var(--transitionDuration);
    }
    & > span::before {
      content: '';
      top: -10px;
    }
    & > span::after {
      content: '';
      top: 10px;
    }
    @media screen and (max-width: 1024px) {
      display: flex;
    }
  }
  ul {
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
  }
`;
