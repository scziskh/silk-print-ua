"use client";

/*Libs*/
import Image from 'next/image';
import styled from 'styled-components';
import { useTranslations } from 'use-intl';

const SingleWork = (props) => {
  const {item} = props;
  const t = useTranslations("WorksList");
  return (
    <Wrapper>
      <Image src={`/assets/works/${item}.webp`} alt={t(`${item}.alt`)} title={t(`${item}.alt`)} height={460} width={460} />
    </Wrapper>
  );
};

export default SingleWork;

const Wrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: var(--contrastGrad);
  overflow: hidden;
  border-radius: var(--radius);
  display: flex;
  &:hover {
    cursor: pointer;
  }
  img {
    width: 100%;
    height: auto;
    align-self: center;
  }
`;
