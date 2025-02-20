'use client';

/*Libs*/
import styled from 'styled-components';
import SingleWork from './single-work';
import { works } from '@/configs/works';

const WorksGallery = () => {
  const displayedWorks = works.slice(0, 6);

  return (
    <StyledWorksGallery>
      {displayedWorks.map((item) => (
        <SingleWork key={item} item={item} />
      ))}
    </StyledWorksGallery>
  );
};

export default WorksGallery;

const StyledWorksGallery = styled.div`
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
