'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import Container from '@/layouts/container';
import ButtonLink from '../link/button.link';
import DarkImage from '@/layouts/dark-image';
import { Link } from '@/i18n/routing';

const ServiceSection = ({ data }) => {
  const { sectionKey, href, galleryItems, textBlocks } = data;

  const t = useTranslations(sectionKey);

  const handleOpenModal = (id) => {
    console.log('Відкриваємо модалку для:', id);
  };

  return (
    <StyledSection>
      <Container>
        <Header>
          <h2>
            <Link href={href}>{t('title')}</Link>
          </h2>
        </Header>

        <MainGrid>
          <ItemsGrid>
            {galleryItems.map((item) => (
              <ItemCard key={item.id} type="button" onClick={() => handleOpenModal(item.id)}>
                <DarkImage>
                  <Image src={item.src} alt={t(`items.${item.id}`)} fill sizes="(max-width: 768px) 100vw, 25vw" style={{ objectFit: 'cover' }} />
                </DarkImage>

                <OverlayText>{t(`items.${item.id}`)}</OverlayText>
              </ItemCard>
            ))}
          </ItemsGrid>

          <TextContent>
            {textBlocks.map((key) => (
              <TextBlock key={key}>
                <h3>{t(`descriptions.${key}_title`)}</h3>
                <p>{t(`descriptions.${key}_text`)}</p>
              </TextBlock>
            ))}
          </TextContent>
        </MainGrid>
        <ActionArea>
          <ButtonLink href={href} label={t('more')} />
        </ActionArea>
      </Container>
    </StyledSection>
  );
};

export default React.memo(ServiceSection);

const StyledSection = styled.section`
  padding: 60px 0;
  color: var(--mainColor);
  overflow: hidden;
  &:nth-child(2n) {
    background: var(--contrastGrad);
    box-shadow: var(--darkShadow);
  }
  a {
    margin: auto;
  }
`;

const Header = styled.header`
  margin-bottom: 32px;
  text-align: center;

  h2 {
    color: var(--mainColor);
    position: relative;
    display: inline-block;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 4fr 5fr;
  gap: 40px;
  align-items: start;

  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const OverlayText = styled.span`
  position: absolute;
  font-size: 1rem;
  text-shadow: var(--darkShadow);
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  color: white;
  text-transform: uppercase;
  font-family: inherit;
  font-weight: bold;
  z-index: 5;
  opacity: 1;
`;

const ItemCard = styled.button`
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: flex;
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: var(--radius);
  width: 100%;
  font-family: inherit;
  border: 1px solid transparent;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    border-color: var(--secondaryColor);
    box-shadow: var(--darkShadow);
  }

  &:focus-visible {
    outline: 2px solid var(--secondaryColor);
    outline-offset: 4px;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: left;
`;

const TextBlock = styled.article`
  h3 {
    color: var(--mainColor);
    margin-top: 0;
    margin-bottom: 8px;
    line-height: 1.1;
  }
  p {
    margin-top: 0;
    line-height: 1.5;
    color: var(--mainColor);
    opacity: 0.85;
    font-size: 1rem;
  }
`;

const ActionArea = styled.div`
  margin-top: 64px;
  a {
    margin: 0 auto;
  }
  @media (max-width: 1024px) {
    margin-top: 8px;
  }
`;
