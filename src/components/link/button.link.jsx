'use client';

import { Link } from '@/i18n/routing';

import styled from 'styled-components';

const ButtonLink = ({ href, label, ...rest }) => {
  return (
    <StyledLink href={href} {...rest}>
      <span>{label}</span>
    </StyledLink>
  );
};

export default ButtonLink;

const StyledLink = styled(Link)`
  position: relative;

  display: flex;

  justify-content: center;

  align-items: center;

  font-size: 1.05em;

  margin-top: 24px;

  padding: 14px 20px;

  max-width: 200px;

  text-align: center;

  text-decoration: none;

  font-weight: 600;

  color: inherit;

  z-index: 1;

  border-style: solid;

  border-width: 2px;

  border-image-source: var(--secondaryGrad);

  border-image-slice: 2;

  transition:
    color 0.4s ease,
    transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);

  &::before {
    content: '';

    position: absolute;

    top: 0;

    left: 0;

    right: 0;

    bottom: 0;

    background: var(--secondaryGrad);

    z-index: -1;

    opacity: 0;

    transform: scaleX(0);

    transform-origin: center;

    transition:
      transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
      opacity 0.4s ease;
  }

  span {
    position: relative;

    z-index: 2;

    transition: text-shadow 0.4s ease;
  }

  &:hover {
    color: var(--contrastColor);
  }

  &:hover span {
    text-shadow: var(--darkShadow);
  }

  &:hover::before {
    opacity: 1;

    transform: scaleX(1);
  }

  &:active {
    transform: translateY(1px);
  }
`;
