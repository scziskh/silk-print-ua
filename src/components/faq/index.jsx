'use client';

import React, { useId, useState } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { richTags } from '@/configs/richTags';

export function Faq({ title, subtitle, items = [], defaultOpenIndex = 0, allowMultiple = false, className }) {
  const baseId = useId();
  const [openIndices, setOpenIndices] = useState(() => {
    if (defaultOpenIndex === null || defaultOpenIndex === undefined || defaultOpenIndex < 0 || defaultOpenIndex >= items.length) {
      return [];
    }
    return [defaultOpenIndex];
  });

  if (!items || items.length === 0) {
    return null;
  }

  const toggleItem = (index) => {
    setOpenIndices((prev) => {
      const isCurrentlyOpen = prev.includes(index);
      if (allowMultiple) {
        return isCurrentlyOpen ? prev.filter((item) => item !== index) : [...prev, index];
      }
      return isCurrentlyOpen ? [] : [index];
    });
  };

  const headingId = `${baseId}-heading`;

  return (
    <FaqSection className={className} aria-labelledby={title ? headingId : undefined}>
      {(title || subtitle) && (
        <FaqHeader>
          {title && <h3 id={headingId}>{title}</h3>}
          {subtitle && <p>{subtitle}</p>}
        </FaqHeader>
      )}

      <FaqList>
        {items.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          const buttonId = `${baseId}-btn-${idx}`;
          const panelId = `${baseId}-panel-${idx}`;

          return (
            <FaqItem key={idx} $isOpen={isOpen}>
              <FaqTrigger type="button" id={buttonId} aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggleItem(idx)} $isOpen={isOpen}>
                <IndexNumber $isOpen={isOpen}>{String(idx + 1).padStart(2, '0')}</IndexNumber>
                <QuestionText>{item.question}</QuestionText>
                <ChevronWrap $isOpen={isOpen} aria-hidden="true">
                  <ChevronDown size={18} strokeWidth={2} />
                </ChevronWrap>
              </FaqTrigger>

              <FaqPanel id={panelId} role="region" aria-labelledby={buttonId} $isOpen={isOpen}>
                <FaqPanelInner>
                  <FaqAnswer>{item.answer}</FaqAnswer>
                </FaqPanelInner>
              </FaqPanel>
            </FaqItem>
          );
        })}
      </FaqList>
    </FaqSection>
  );
}

export function ServiceFaq({ namespace, defaultOpenIndex = 0, allowMultiple = false, className }) {
  const t = useTranslations(namespace);
  const rawItems = t.raw('items');

  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return null;
  }

  const items = rawItems.map((_, idx) => ({
    question: t(`items.${idx}.question`),
    answer: t.rich(`items.${idx}.answer`, richTags),
  }));

  const title = t.has('title') ? t('title') : undefined;
  const subtitle = t.has('subtitle') ? t('subtitle') : undefined;

  return (
    <Faq title={title} subtitle={subtitle} items={items} defaultOpenIndex={defaultOpenIndex} allowMultiple={allowMultiple} className={className} />
  );
}

export default Faq;

const FaqSection = styled.section`
  margin: 48px 0 36px;
  padding: 0;
`;

const FaqHeader = styled.div`
  margin-bottom: 22px;

  h3 {
    font-size: 1.5em;
    font-weight: 800;
    margin: 0 0 8px;
    color: var(--strongColor);
  }

  p {
    margin: 0;
    color: var(--mutedColor);
    font-size: 0.96em;
    line-height: 1.5;
    max-width: 720px;
  }
`;

const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FaqItem = styled.div`
  background: var(--surfaceBg);
  border: 1px solid ${({ $isOpen }) => ($isOpen ? 'rgba(212, 175, 55, 0.5)' : 'var(--borderSubtle)')};
  border-radius: var(--radius);
  overflow: hidden;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    border-color: ${({ $isOpen }) => ($isOpen ? 'rgba(212, 175, 55, 0.65)' : 'var(--lightColor)')};
  }
`;

const FaqTrigger = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  border: none;
  background: ${({ $isOpen }) => ($isOpen ? 'var(--contrastGrad)' : 'transparent')};
  color: var(--mainColor);
  font-family: inherit;
  font-size: 1em;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: var(--surfaceElevated);
  }

  &:focus-visible {
    outline: 2px solid var(--secondaryColor);
    outline-offset: -2px;
  }

  @media (max-width: 640px) {
    gap: 12px;
    padding: 15px 16px;
  }
`;

const IndexNumber = styled.span`
  font-variant-numeric: tabular-nums;
  font-size: 0.82em;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: ${({ $isOpen }) => ($isOpen ? 'var(--secondaryColor)' : 'var(--mutedColor)')};
  transition: color 0.2s ease;
`;

const QuestionText = styled.span`
  font-weight: 700;
  line-height: 1.38;
  color: var(--strongColor);
`;

const ChevronWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: ${({ $isOpen }) => ($isOpen ? 'var(--secondaryColor)' : 'var(--mutedColor)')};
  transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
  transition:
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    color 0.2s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const FaqPanel = styled.div`
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? '1fr' : '0fr')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition:
    grid-template-rows 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.2s ease,
    visibility 0.2s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const FaqPanelInner = styled.div`
  overflow: hidden;
  min-height: 0;
`;

const FaqAnswer = styled.div`
  padding: 14px 20px 20px 56px;
  border-top: 1px solid var(--borderSubtle);
  color: var(--serviceTextColor);
  font-size: 0.96em;
  line-height: 1.55;

  strong {
    color: var(--strongColor);
    font-weight: 600;
  }

  a {
    color: var(--strongColor);
    text-decoration: underline;
    text-decoration-color: var(--secondaryColor);
    text-underline-offset: 3px;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 640px) {
    padding: 12px 16px 16px;
  }
`;
