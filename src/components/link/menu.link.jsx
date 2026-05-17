'use client';

import { Link } from '@/i18n/routing';
import styled from 'styled-components';

const MenuLink = ({ href, label, ...props }) => (
  <StyledLink href={href} {...props}>
    {label}
  </StyledLink>
);

export default MenuLink;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  color: inherit;
  position: relative;

  &::after {
    content: '';
    display: block;
    height: 2px;
    margin-top: 5px;
    background: var(--secondaryGrad);
    width: 100%;

    transform: translateY(5px);
    opacity: 0;
    transition:
      transform var(--transitionDuration) ease,
      opacity var(--transitionDuration) ease;
    will-change: transform, opacity;
  }

  &:hover::after {
    transform: translateY(0);
    opacity: 1;
  }
`;
