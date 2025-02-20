'use client';

/*Libs*/
import { Link } from '@/i18n/routing';
import styled from 'styled-components';

const ButtonLink = ({ href, label, ...rest }) => {
  return (
    <StyledLink href={href} {...rest}>
      {label}
    </StyledLink>
  );
};

export default ButtonLink;

const StyledLink = styled(Link)`
  font-size: 1.05em;
  margin-top: 24px;
  display: block;
  padding: 14px 20px;
  max-width: 200px;
  text-align: center;
  border-image-source: var(--secondaryGrad);
  border-style: solid;
  border-image-slice: 2;
  border-width: 2px;
  cursor: pointer;
  &:hover {
    color: var(--contrastColor);
    text-shadow: var(--darkShadow);
    background: var(--secondaryGrad);
    border-color: transparent;
  }
`;
