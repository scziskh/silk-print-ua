'use client';

import styled from 'styled-components';
import { Link } from '@/i18n/routing';
import Container from '@/layouts/container';
import FooterMenu from './menu';
import FooterContacts from './contacts';

const Footer = () => {
  const currYear = new Date().getFullYear();

  return (
    <Wrapper>
      <Container>
        <FooterMenu />
        <Hr />
        <Grid>
          <div>
            <Link href="">Silk Print</Link> © 2019-{currYear}
          </div>
          <FooterContacts />
        </Grid>
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

const Hr = styled.div`
  height: 1px;
  background: var(--mainGrad);
  width: 100%;
  margin: calc(var(--gap) - 15px) 0 var(--gap);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  align-items: center;
  a {
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Contacts = styled.div`
  display: flex;
  gap: var(--gap);
  justify-content: end;
`;
