'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import Container from '@/layouts/container';
import ButtonLink from '../link/button.link';
import DarkImage from '@/layouts/dark-image';
import { Link } from '@/i18n/routing';

import ModalSlider from '../gallery';
import { categorizedWorks } from '@/configs/works';

const ServiceSection = ({ data }) => {
  const { sectionKey, href, galleryItems, textBlocks } = data;

  // Хук для секції послуг (залишається без змін)
  const t = useTranslations(sectionKey);

  // ДОДАНО: Хук для підтягування SEO-описів картинок.
  // ВАЖЛИВО: Якщо ти поклав об'єкти картинок у корінь uk.json, використовуй useTranslations()
  // Якщо ти створив для них окремий ключ, наприклад "seoImages": {...}, то напиши useTranslations('seoImages')
  const tSeo = useTranslations('WorksList');

  const [modal, setModal] = useState({
    isOpen: false,
    images: [],
    imageSlugs: [], // Зберігаємо слаги для пошуку в словнику
    currentIndex: 0,
    categoryTitle: '',
  });

  const handleOpenModal = (itemId) => {
    const categoryKey = sectionKey.split('.').pop();
    const imageIds = categorizedWorks[categoryKey]?.[itemId] || [];

    if (imageIds.length === 0) {
      console.warn(`🛑 Stop: Not found images in category "${categoryKey}" subcategory "${itemId}" in object "categorizedWorks"!`);
      return;
    }

    const fullImages = imageIds.map((id) => `/assets/works/${id}.webp`);

    setModal({
      isOpen: true,
      images: fullImages,
      imageSlugs: imageIds, // Передаємо масив слагов
      currentIndex: 0,
      categoryTitle: t(`items.${itemId}`),
    });
  };

  const handleCloseModal = useCallback(() => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handlePrev = useCallback(() => {
    setModal((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1,
    }));
  }, []);

  const handleNext = useCallback(() => {
    setModal((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex === prev.images.length - 1 ? 0 : prev.currentIndex + 1,
    }));
  }, []);

  // ДОДАНО: Отримуємо поточний слаг та безпечно витягуємо переклади
  const currentSlug = modal.imageSlugs[modal.currentIndex];

  // Перевіряємо чи існує ключ, щоб next-intl не викинув помилку MISSING_MESSAGE
  const currentImageTitle = currentSlug && tSeo.has(`${currentSlug}.title`) ? tSeo(`${currentSlug}.title`) : 'Ексклюзивна поліграфія'; // Fallback текст, якщо опису немає

  const currentImageAlt = currentSlug && tSeo.has(`${currentSlug}.alt`) ? tSeo(`${currentSlug}.alt`) : 'Портфоліо візиток';

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

      <ModalSlider
        isOpen={modal.isOpen}
        images={modal.images}
        currentIndex={modal.currentIndex}
        categoryTitle={modal.categoryTitle}
        imageTitle={currentImageTitle} // Динамічний Title
        imageAlt={currentImageAlt} // Динамічний Alt
        onClose={handleCloseModal}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </StyledSection>
  );
};

export default React.memo(ServiceSection);

// ... Твої стилі (StyledSection, Header, MainGrid тощо) залишаються абсолютно без змін ...
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
  font-weight: bold;
  z-index: 5;
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
