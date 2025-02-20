'use client';

/* Libs */
import Image from 'next/image';
import styled from 'styled-components';
import { useTranslations } from 'use-intl';

/* Layouts */
import Container from '@/layouts/container';

/* Configs */
import { translationsConfig } from '@/configs/translations.config';
import { useEffect, useRef, useState } from 'react';

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

  const defaultWidth = 750;
  const defaultHeight = 562;

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
      <StyledSectionWrapper>
        <Container>
          <StyledColumn>{t.rich('pantone-printing', translationsConfig)}</StyledColumn>
          <StyledColumn>{t.rich('metalic-printing', translationsConfig)}</StyledColumn>
        </Container>
      </StyledSectionWrapper>
      <StyledSectionWrapper>
        <Container>
          <StyledColumn ref={sectionRefs.stamping.text} id="stamping-section_text">
            {t.rich('stamping', translationsConfig)}
          </StyledColumn>
          <StyledImageWrapper ref={sectionRefs.stamping.image} id="stamping-section_image">
            <Image src="/assets/works/IMG_4636.webp" width={defaultWidth} height={defaultHeight} alt="Stamping Section Image" />
          </StyledImageWrapper>
        </Container>
      </StyledSectionWrapper>
      <StyledSectionWrapper>
        <Container>
          <StyledColumn>{t.rich('die-cutting', translationsConfig)}</StyledColumn>
          <StyledColumn>{t.rich('kashi', translationsConfig)}</StyledColumn>
        </Container>
      </StyledSectionWrapper>
      <StyledSectionWrapper>
        <Container>
          <StyledImageWrapper ref={sectionRefs.foilStamping.image}>
            <Image src="/assets/works/IMG_4905.webp" width={defaultWidth} height={defaultHeight} alt="Foil Stamping Image" />
          </StyledImageWrapper>
          <StyledColumn ref={sectionRefs.foilStamping.text}>{t.rich('foil-stamping', translationsConfig)}</StyledColumn>
        </Container>
      </StyledSectionWrapper>
      <StyledSectionWrapper>
        <Container>
          <StyledColumn>{t.rich('varnish-printing', translationsConfig)}</StyledColumn>
          <StyledColumn>{t.rich('thermography', translationsConfig)}</StyledColumn>
        </Container>
      </StyledSectionWrapper>
      <StyledSectionWrapper>
        <Container>
          <StyledColumn ref={sectionRefs.whitePrinting.text}>{t.rich('white-printing', translationsConfig)}</StyledColumn>

          <StyledImageWrapper ref={sectionRefs.whitePrinting.image}>
            <Image src="/assets/works/IMG_4710.webp" width={defaultWidth} height={defaultHeight} alt="White Printing Image" />
          </StyledImageWrapper>
        </Container>
      </StyledSectionWrapper>
    </>
  );
};

export default ServiceAboutSection;

const StyledSectionWrapper = styled.section`
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

const StyledColumn = styled.div`
  height: fit-content;
`;

const StyledImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  img {
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    align-self: center;
  }
`;
