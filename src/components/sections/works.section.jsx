'use client';

import styled from 'styled-components';
import Container from '@/layouts/container';
import WorksGallery from '../works-gallery';
import ButtonLink from '../link/button.link';
import { useTranslations } from 'next-intl';

const WorksSection = () => {
  const t = useTranslations('WorksSection');
  return (
    <StyledWorksSection>
      <Container>
        <h2>{t('header')}</h2>
        <WorksGallery />
        <ButtonLink href="works" label={t('link')} />
      </Container>
    </StyledWorksSection>
  );
};

export default WorksSection;

const StyledWorksSection = styled.section`
  width: 100%;
  padding: var(--gap) 0;
  h2 {
    margin-bottom: 0;
    text-align: center;
  }
  & > div {
    display: grid;
    gap: var(--gap);
    a {
      margin: auto;
    }
  }
`;
