'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import Container from '@/layouts/container';
import { translationsConfig } from '@/configs/translations.config';

const ServiceAboutSection = () => {
  const t = useTranslations('ServicesAboutSection');

  const defaultWidth = 750;
  const defaultHeight = 562;

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
          <StyledColumn>{t.rich('stamping', translationsConfig)}</StyledColumn>
          <StyledImageWrapper>
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
          <StyledImageWrapper>
            <Image src="/assets/works/IMG_4905.webp" width={defaultWidth} height={defaultHeight} alt="Foil Stamping Image" />
          </StyledImageWrapper>
          <StyledColumn>{t.rich('foil-stamping', translationsConfig)}</StyledColumn>
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
          <StyledColumn>{t.rich('white-printing', translationsConfig)}</StyledColumn>
          <StyledImageWrapper>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;
  border-radius: var(--radius);
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
