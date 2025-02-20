'use client';

/*Libs*/
import styled from 'styled-components';

/*Components*/
import Container from '@/layouts/container';
import NavbarMenu from './menu';
import Logo from './logo';

const Navbar = () => {
  return (
    <StyledNavbar>
      <Container>
        <StyledGrid>
          <Logo />
          <NavbarMenu />
        </StyledGrid>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;

const StyledNavbar = styled.header`
  width: 100%;
  height: 80px;
  background: var(--mainGrad);
  box-shadow: var(--darkShadow);
  z-index: 99;
`;

const StyledGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;
