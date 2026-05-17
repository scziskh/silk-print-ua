'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingComponent = () => {
  return (
    <LoaderContainer>
      <SpinnerWrapper>
        <SpinningRing />
        <InnerPulse />
      </SpinnerWrapper>
    </LoaderContainer>
  );
};

export default LoadingComponent;

/* --- Анимации --- */

// Анимация вращения с премиальным cubic-bezier (плавное ускорение и замедление)
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Анимация пульсации золотого свечения
const pulse = keyframes`
  0% { 
    transform: scale(0.9); 
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); 
  }
  70% { 
    transform: scale(1); 
    box-shadow: 0 0 0 20px rgba(212, 175, 55, 0); 
  }
  100% { 
    transform: scale(0.9); 
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); 
  }
`;

/* --- Стилизация --- */

const LoaderContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9); /* Полупрозрачный белый фон */
  backdrop-filter: blur(8px); /* Легкое размытие контента под лоадером */
  z-index: 9999;

  /* Поддержка темной темы, если она активна */
  @media (prefers-color-scheme: dark) {
    background-color: rgba(33, 33, 33, 0.9);
  }
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinningRing = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  /* Базовое полупрозрачное кольцо */
  border: 3px solid rgba(212, 175, 55, 0.15);
  /* Яркий золотой акцент, который будет вращаться */
  border-top-color: var(--secondaryColor, #d4af37);

  /* Используем cubic-bezier для "дорогого" неравномерного вращения, как у Apple */
  animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
`;

const InnerPulse = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--secondaryGrad, linear-gradient(to bottom, #e8c34b, #d4af37));
  /* Мягкая пульсация свечения */
  animation: ${pulse} 2s infinite;
`;
