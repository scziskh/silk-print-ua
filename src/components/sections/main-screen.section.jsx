'use client';

/*Libs*/
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

/*Layouts*/
import Container from '@/layouts/container';

/*Components*/
import ButtonLink from '@/components/link/button.link';
import DarkImage from '@/layouts/dark-image';

const MainScreenSection = () => {
  const t = useTranslations('MainSection');
  return (
    <StyledMainScreenSection>
      <DarkImage>
        <StyledVideo loop autoPlay muted playsInline preload="none" aria-hidden="true">
          <source src="/assets/bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </StyledVideo>
      </DarkImage>
      <Container>
        <StyledTextContent>
          <h1>{t('header')}</h1>
          <p>{t('paragraph_1')}</p>
          <p>{t('paragraph_2')}</p>
          <ButtonLink href="services" label={t('link')} />
        </StyledTextContent>
      </Container>
    </StyledMainScreenSection>
  );
};
export default MainScreenSection;

const StyledMainScreenSection = styled.section`
  position: relative;
  height: calc(100vh - 80px);
  min-height: 480px;
  max-height: calc(16 / 9 * 100vw);
  overflow: hidden;
  color: #fff;
  text-shadow: var(--darkShadow);
`;

const StyledVideo = styled.video`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  object-fit: cover;
`;

const StyledTextContent = styled.div`
  position: relative;
  top: 30vh;
  z-index: 1;
  p {
    margin: 3px 0;
    font-size: 1.1em;
  }
  a {
    color: var(--contrastColor);
    box-shadow: var(--darkShadow);
  }
`;
