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
    <Wrapper>
      <Background />
      <Container>
        <h2>{t('header')}</h2>
        <Text>{t.rich('html', translationsConfig)}</Text>
        <ButtonLink href="paper" label={tButtons('details')} />
      </Container>
    </Wrapper>
  );
};

export default PaperSection;

const Wrapper = styled.section`
  position: relative;
  background: var(--contrastGrad);
  box-shadow: var(--darkShadow);
  padding: var(--gap) 0;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('/assets/paper.webp');
  opacity: 0.8;
  background-position: top center;
`;

const Text = styled.div`
  width: 50%;
  @media screen and (max-width: 1366px) {
    width: 60%;
  }
  @media screen and (max-width: 1280px) {
    width: 70%;
  }
  @media screen and (max-width: 640px) {
    width: 80%;
  }
`;
