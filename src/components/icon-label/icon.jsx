'use client';

import Image from 'next/image';
import styled from 'styled-components';

const Icon = ({ icon, alt = 'Icon' }) => {
  return (
    <StyledIconContainer>
      <StyledImage src={`/assets/icons/${icon}.svg`} width={16} height={16} alt={alt} priority />
    </StyledIconContainer>
  );
};

export default Icon;

const StyledIconContainer = styled.span`
  display: inline-flex;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: var(--contrastGrad);
  box-shadow: var(--darkShadow);
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  display: block;
`;
