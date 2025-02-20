'use client';

import styled from 'styled-components';
import Icon from './icon';

const IconLink = ({ icon, children, ...rest }) => {
  return (
    <Wrapper {...rest}>
      <Icon icon={icon} />
      {children}
    </Wrapper>
  );
};

export default IconLink;

const Wrapper = styled.a`
  display: grid;
  grid-template-columns: 28px 1fr;
  align-items: center;
  gap: 12px;
  font-weight: normal !important;
`;
