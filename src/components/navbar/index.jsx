'use client';

/*Libs*/
import styled from 'styled-components';

/*Components*/
import Container from '@/layouts/container';
import NavbarMenu from './menu';
import Logo from './logo';

const Navbar = () => {
  return (
    <Wrapper>
      <Container>
        <Grid>
          <Logo />
          <NavbarMenu />
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.header`
  width: 100%;
  height: 80px;
  background: var(--mainGrad);
  box-shadow: var(--darkShadow);
  z-index: 99;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  height: 100%;
`;
