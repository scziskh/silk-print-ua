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
    <Wrapper>
      <DarkImage>
        <video loop autoPlay muted playsInline preload="none">
          <source src="/assets/bg-video.mp4" type="video/mp4" />
        </video>
      </DarkImage>
      <Container>
        <Text>
          <h1>{t('header')}</h1>
          <p>{t('paragraph_1')}</p>
          <p>{t('paragraph_2')}</p>
          <ButtonLink href="services" label={t('link')} />
        </Text>
      </Container>
    </Wrapper>
  );
};
export default MainScreenSection;

const Wrapper = styled.section`
  position: relative;
  height: calc(100vh - 80px);
  min-height: 480px;
  max-height: calc(16 / 9 * 100vw);
  overflow: hidden;
  color: #fff;
  text-shadow: var(--darkShadow);
  video {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  p {
    margin: 3px 0;
    font-size: 1.1em;
  }
  a {
    color: var(--contrastColor);
    box-shadow: var(--darkShadow);
  }
`;

const Text = styled.div`
  height: calc(100vh - 80px);
  min-height: 480px;
  position: absolute;
  top: 30vh;
`;
