'use client';

/*Libs*/
import Image from 'next/image';
import styled from 'styled-components';
import { useTranslations } from 'use-intl';

const SingleWork = (props) => {
  const { item } = props;
  const t = useTranslations('WorksList');
  return (
    <StyledWorkContainer>
      <StyledImage src={`/assets/works/${item}.webp`} alt={t(`${item}.alt`)} title={t(`${item}.alt`)} height={460} width={460} />
    </StyledWorkContainer>
  );
};

export default SingleWork;

const StyledWorkContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: var(--contrastGrad);
  overflow: hidden;
  border-radius: var(--radius);
  display: flex;
  cursor: pointer;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
