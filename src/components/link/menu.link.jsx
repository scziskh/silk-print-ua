'use client';

/*Libs*/
import { Link } from '@/i18n/routing';
import styled from 'styled-components';

const MenuLink = ({ href, label }) => <StyledLink href={href}>{label}</StyledLink>;

export default MenuLink;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  color: inherit;

  &::after {
    content: '';
    display: block;
    height: 2px;
    margin-top: 5px;
    background: var(--secondaryGrad);
    width: 100%;
    transform: translateY(5px);
    opacity: 0;
    transition-duration: var(--transitionDuration);
  }

  &:hover::after {
    transform: translateY(0);
    opacity: 1;
  }
`;
