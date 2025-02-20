'use client';

import styled from 'styled-components';
import Icon from './icon';

const IconText = ({ icon, children, ...rest }) => {
  return (
    <StyledContainer {...rest}>
      <Icon icon={icon} />
      <span>{children}</span>
    </StyledContainer>
  );
};

export default IconText;

const StyledContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
`;
