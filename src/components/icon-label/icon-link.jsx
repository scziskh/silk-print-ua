'use client';

import styled from 'styled-components';
import Icon from './icon';

const IconLink = ({ icon, children, ...rest }) => {
  return (
    <StyledLink {...rest}>
      <Icon icon={icon} />
      <span>{children}</span>
    </StyledLink>
  );
};

export default IconLink;

const StyledLink = styled.a`
  display: inline-flex;
  grid-template-columns: 28px 1fr;
  align-items: center;
  gap: 12px;
  font-weight: normal !important;
  color: inherit;
`;
