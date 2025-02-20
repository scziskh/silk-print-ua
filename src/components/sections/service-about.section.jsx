'use client';

/* Libs */
import Image from 'next/image';
import styled from 'styled-components';
import { useTranslations } from 'use-intl';

/* Layouts */
import Container from '@/layouts/container';

/* Configs */
import { translationsConfig } from '@/configs/translations.config';
import { useEffect, useRef } from 'react';

const ServiceAboutSection = () => {
  const t = useTranslations('ServicesAboutSection');

  /* Sections */
  const sectionRefs = {
    stamping: {
      text: useRef(null),
      image: useRef(null),
    },
    foilStamping: {
      text: useRef(null),
      image: useRef(null),
    },
    whitePrinting: {
      text: useRef(null),
      image: useRef(null),
    },
  };

  /* Resize sections */
  useEffect(() => {
    const resizeObservers = Object.values(sectionRefs)
      .map(({ text, image }) => {
        if (text.current && image.current) {
          const resizeObserver = new ResizeObserver(() => {
            const height = text.current.offsetHeight;
            image.current.style.height = `${height}px`;
          });
          resizeObserver.observe(text.current);
          return resizeObserver;
        }
        return null;
      })
      .filter((observer) => observer !== null);

    return () => {
      resizeObservers.forEach((observer) => observer.disconnect());
    };
  }, [sectionRefs]);

  return (
    <>
      <Wrapper>
        <Container>
          <Column>{t.rich('pantone-printing', translationsConfig)}</Column>
          <Column>{t.rich('metalic-printing', translationsConfig)}</Column>
        </Container>
      </Wrapper>
      <Wrapper>
        <Container>
          <Column ref={sectionRefs.stamping.text} id="stamping-section_text">
            {t.rich('stamping', translationsConfig)}
          </Column>
          <ImageWrapper ref={sectionRefs.stamping.image} id="stamping-section_image">
            <Image src="/assets/works/IMG_4636.webp" width={750} height={562} alt="Stamping Section Image" />
          </ImageWrapper>
        </Container>
      </Wrapper>
      <Wrapper>
        <Container>
          <Column>{t.rich('die-cutting', translationsConfig)}</Column>
          <Column>{t.rich('kashi', translationsConfig)}</Column>
        </Container>
      </Wrapper>
      <Wrapper>
        <Container>
          <ImageWrapper ref={sectionRefs.foilStamping.image}>
            <Image src="/assets/works/IMG_4905.webp" width={750} height={562} alt="Foil Stamping Image" />
          </ImageWrapper>
          <Column ref={sectionRefs.foilStamping.text}>{t.rich('foil-stamping', translationsConfig)}</Column>
        </Container>
      </Wrapper>
      <Wrapper>
        <Container>
          <Column>{t.rich('varnish-printing', translationsConfig)}</Column>
          <Column>{t.rich('thermography', translationsConfig)}</Column>
        </Container>
      </Wrapper>
      <Wrapper>
        <Container>
          <Column ref={sectionRefs.whitePrinting.text}>{t.rich('white-printing', translationsConfig)}</Column>

          <ImageWrapper ref={sectionRefs.whitePrinting.image}>
            <Image src="/assets/works/IMG_4710.webp" width={750} height={562} alt="White Printing Image" />
          </ImageWrapper>
        </Container>
      </Wrapper>
    </>
  );
};

export default ServiceAboutSection;

const Wrapper = styled.section`
  &:nth-child(2n + 1) {
    background: var(--contrastGrad);
    box-shadow: var(--darkShadow);
  }
  & > div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--gap);
    padding: var(--gap) 0;
    @media screen and (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }
  h2 {
    padding-bottom: calc(var(--gap) - 24px);
  }
`;

const Column = styled.div`
  height: fit-content;
`;

const ImageWrapper = styled.div`
  width: 100%;
  background: var(--contrastGrad);
  overflow: hidden;
  display: flex;
  height: 360px;
  img {
    object-fit: cover;
    min-width: 100%;
    min-height: 100%;
    width: 100%;
    height: auto;
    align-self: center;
  }
`;
