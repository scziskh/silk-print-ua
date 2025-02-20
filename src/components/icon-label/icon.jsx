'use client';

import Image from 'next/image';
import styled from 'styled-components';

const Icon = ({ icon }) => {
  return (
    <Wrapper>
      <Image src={`/assets/icons/${icon}.svg`} width={16} height={16} alt={`Icon`} />
    </Wrapper>
  );
};

export default Icon;

const Wrapper = styled.span`
  display: flex;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: var(--contrastGrad);
  box-shadow: var(--darkShadow);
`;
