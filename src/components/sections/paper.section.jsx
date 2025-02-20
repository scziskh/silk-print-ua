'use client';

/*Libs*/
import styled from 'styled-components';

/*Layouts */
import Container from '@/layouts/container';
import { useTranslations } from 'next-intl';
import ButtonLink from '../link/button.link';
import { translationsConfig } from '@/configs/translations.config';

const PaperSection = () => {
  /*Translations*/
  const t = useTranslations('PaperSection');
  const tButtons = useTranslations('Buttons');

  return (
    <StyledPaperSection>
      <StyledBackground />
      <Container>
        <h2>{t('header')}</h2>
        <StyledTextContent>{t.rich('html', translationsConfig)}</StyledTextContent>
        <ButtonLink href="paper" label={tButtons('details')} />
      </Container>
    </StyledPaperSection>
  );
};

export default PaperSection;

const StyledPaperSection = styled.section`
  position: relative;
  background: var(--contrastGrad);
  box-shadow: var(--darkShadow);
  padding: var(--gap) 0;
  overflow: hidden;
`;

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('/assets/paper.webp');
  opacity: 0.8;
  background-position: top center;
`;

const StyledTextContent = styled.div`
  width: 50%;
  @media screen and (max-width: 1366px) {
    width: 60%;
  }
  @media screen and (max-width: 1280px) {
    width: 70%;
  }
  @media screen and (max-width: 640px) {
    width: 90%;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;
