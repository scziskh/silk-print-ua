'use client';

/*Libs*/
import styled from 'styled-components';

/*Components*/
import Container from '@/layouts/container';
import NavbarMenu from './menu';
import Logo from './logo';
import ThemeSwitcher from '@/components/theme-switcher';

const Navbar = () => {
  return (
    <StyledNavbar>
      <Container>
        <StyledGrid>
          <Logo />
          <StyledActions>
            <NavbarMenu />
            <ThemeSwitcher />
          </StyledActions>
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
  border-bottom: 1px solid var(--borderSubtle);
  box-shadow: var(--darkShadow);
  z-index: 99;
`;

const StyledGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 100%;
`;

const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media screen and (max-width: 1024px) {
    flex-direction: row-reverse;
    gap: 12px;
  }
`;
