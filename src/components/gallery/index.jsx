'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const ModalSlider = ({ isOpen, images, currentIndex, categoryTitle, imageTitle, imageAlt, onClose, onPrev, onNext }) => {
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const minSwipeDistance = 50;

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
      containerRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    if (containerRef.current) containerRef.current.style.transition = 'none';
  };

  const handleTouchMove = (e) => {
    const delta = e.touches[0].clientX - touchStartX.current;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(calc(-${currentIndex * 100}% + ${delta}px))`;
    }
  };

  const handleTouchEnd = (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > minSwipeDistance) {
      if (delta > 0) onPrev();
      else onNext();
    } else {
      containerRef.current.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
      containerRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  };

  if (!isOpen || !images.length) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalImageWrapper>
          <SlidesContainer ref={containerRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            {images.map((src, idx) => (
              <Slide key={idx}>
                <Image src={src} alt={imageAlt || 'Візитка'} fill style={{ objectFit: 'contain' }} priority={idx === currentIndex} />
              </Slide>
            ))}
          </SlidesContainer>
        </ModalImageWrapper>

        {images.length > 1 && (
          <>
            <NavButton className="prev" onClick={onPrev}>
              &#10094;
            </NavButton>
            <NavButton className="next" onClick={onNext}>
              &#10095;
            </NavButton>
          </>
        )}

        <ModalFooter>
          <div className="text-content">
            {<h3>{categoryTitle}</h3>}
            <TitleContainer>{imageTitle}</TitleContainer>
          </div>
          <span className="counter">
            {currentIndex + 1} / {images.length}
          </span>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

// ==========================================
// СТИЛІ
// ==========================================

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(240, 240, 242, 0.85);
  backdrop-filter: blur(20px);
  z-index: 10000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  background: transparent;
  border: none;
  font-size: 3rem;
  color: var(--mainColor);
  cursor: pointer;
  z-index: 10020;
  transition: all var(--transitionDuration) ease;
  &:hover {
    color: var(--secondaryColor);
    transition: all var(--transitionDuration) ease;
  }
  @media (max-width: 768px) {
    width: 0;
    top: 5px;
    right: 10px;
    font-size: 2.5rem;
  }
`;

const ModalContent = styled.div`
  position: relative;
  width: 95vw;
  height: 90vh;
  max-width: 1200px;
  background: var(--contrastGrad);
  border-radius: var(--radius);
  padding: 40px 20px 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 5vh auto;
  box-shadow: var(--darkShadow);
  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    padding: 50px 10px 10px;
    margin: 0;
  }
`;

const ModalImageWrapper = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  touch-action: pan-y;
  min-height: 0;
`;

const SlidesContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  will-change: transform;
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavButton = styled.button`
  position: absolute;
  overflow: hidden;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: rgba(255, 255, 255);
  box-shadow: var(--darkShadow);

  transition: all var(--transitionDuration) ease;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--secondaryGrad);
    opacity: 0;
    transition: all var(--transitionDuration) ease;
    z-index: -1;
  }
  &:hover::before {
    opacity: 1;
  }

  &:hover {
    color: white;
  }

  @media (max-width: 768px) {
    display: none;
  }

  &.prev {
    left: 20px;
  }
  &.next {
    right: 20px;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: #333;
  @media (max-width: 768px) {
    min-height: 50px;
  }
  h3 {
    margin: 15px 0;
    color: var(--secondaryColor);
  }
  span {
    white-space: nowrap;
  }
`;

const TitleContainer = styled.p`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
  min-height: 3.9em;
  max-width: 80%;

  /* ПРИХОВУЄМО ТАЙТЛ НА МОБІЛКАХ */
  @media (max-width: 768px) {
    display: none;
  }
`;

export default ModalSlider;
