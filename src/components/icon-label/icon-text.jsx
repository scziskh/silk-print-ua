'use client';

import styled from 'styled-components';
import Icon from './icon';

const IconText = ({ icon, children, ...rest }) => {
  return (
    <Wrapper {...rest}>
      <Icon icon={icon} />
      {children}
    </Wrapper>
  );
};

export default IconText;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 28px 1fr;
  align-items: center;
  gap: 12px;
`;
