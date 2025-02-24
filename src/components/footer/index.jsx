'use client';

import styled from 'styled-components';
import { Link } from '@/i18n/routing';
import Container from '@/layouts/container';
import LocaleSwitcher from '@/components/locale-switcher';
import FooterMenu from './menu';
import FooterContacts from './contacts';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Wrapper>
      <Container>
        <FooterMenu />
        <Divider />
        <Content>
          <Copyright>
            <Link href="">Silk Print</Link> © 2019-{currentYear}
          </Copyright>
          <FooterContacts />
        </Content>
        <LocaleSwitcher />
      </Container>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  padding: var(--gap) 0;
  background: var(--contrastGrad);
  box-shadow: var(--darkShadow);
`;

const Divider = styled.hr`
  height: 1px;
  background: var(--mainGrad);
  width: 100%;
  margin: calc(var(--gap) - 15px) 0 var(--gap);
  border: none;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: var(--gap);
  }
`;

const Copyright = styled.div``;
