'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslations } from 'next-intl';

const CLIENTS = [
  { id: 1, name: 'Домосфера', url: '/assets/clients/client-1.svg' },
  { id: 2, name: 'MVK', url: '/assets/clients/client-2.svg' },
  { id: 3, name: 'Aberton Yachts', url: '/assets/clients/client-3.svg' },
  { id: 4, name: 'Синергія Буд', url: '/assets/clients/client-4.svg' },
  { id: 5, name: 'Alumo Prom', url: '/assets/clients/client-5.svg' },
  { id: 6, name: 'Platipus', url: '/assets/clients/client-6.svg' },
  { id: 7, name: 'Intecracy Group', url: '/assets/clients/client-7.svg' },
];

const ClientsMarqueeSection = () => {
  const t = useTranslations('ClientsMarqueeSection');
  return (
    <Section>
      <Title>{t('header')}</Title>

      <MarqueeWrapper>
        <MarqueeContent>
          {CLIENTS.map((client) => (
            <LogoCard key={client.id}>
              <img alt={client.name} src={client.url} loading="lazy" />
            </LogoCard>
          ))}
        </MarqueeContent>

        <MarqueeContent aria-hidden="true">
          {CLIENTS.map((client) => (
            <LogoCard key={`duplicate-${client.id}`}>
              <img alt={client.name} src={client.url} loading="lazy" />
            </LogoCard>
          ))}
        </MarqueeContent>
      </MarqueeWrapper>
    </Section>
  );
};

export default React.memo(ClientsMarqueeSection);

const MARQUEE_GAP = '200px';

const Section = styled.section`
  padding: 20px 0 68px;
  background: var(--contrastGrad);
  overflow: hidden;
  box-shadow: var(--darkShadow);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: var(--mainColor);
  margin-bottom: 48px;
  font-weight: bold;
`;

const scrollAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% - ${MARQUEE_GAP}));
  }
`;

const MarqueeWrapper = styled.div`
  display: flex;
  gap: ${MARQUEE_GAP};
  user-select: none;

  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);

  &:hover > div {
    animation-play-state: paused;
  }
`;

const MarqueeContent = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-around;
  gap: ${MARQUEE_GAP};
  min-width: 100%;
  animation: ${scrollAnimation} 25s linear infinite;
`;

const LogoCard = styled.div`
  height: 64px;
  width: auto;
  display: flex;
  align-items: center;
  transition: transform var(--transitionDuration) ease;

  img {
    height: 100%;
    width: auto;
    object-fit: contain;
    filter: grayscale(100%);
    transition: filter var(--transitionDuration) ease;
  }

  &:hover {
    transform: scale(1.05);

    img {
      filter: grayscale(0);
    }
  }
`;
