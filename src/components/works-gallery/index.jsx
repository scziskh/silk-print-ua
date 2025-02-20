'use client';

/*Libs*/
import styled from 'styled-components';
import SingleWork from './single-work';
import { works } from '@/configs/works';

const WorksGallery = () => {
  works.length = 6;

  return (
    <Wrapper>
      {works.map((item, index) => (
        <SingleWork key={index} item={item} />
      ))}
    </Wrapper>
  );
};

export default WorksGallery;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: calc(var(--gap) - 12px);
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: calc(var(--gap) - 16px);
  }
  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
