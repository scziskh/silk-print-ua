'use client';

import styled from 'styled-components';
import ButtonLink from '../link/button.link';
import Container from '@/layouts/container';
import { useTranslations } from 'next-intl';
import { reviewsData } from '@/constants/reviews.data';

const ReviewsSection = () => {
  const t = useTranslations('ReviewsSection');
  return (
    <Container>
      <Section>
        <Title>{t('header')}</Title>
        <Grid>
          {reviewsData.map((review) => (
            <Card key={review.id}>
              <Stars>{'★'.repeat(review.rating)}</Stars>
              <Text>"{review.text}"</Text>
              <Footer>
                <Author>{review.name}</Author>
                <DateText>{review.date}</DateText>
              </Footer>
            </Card>
          ))}
        </Grid>
        <CtaWrapper>
          <ButtonLink href="" label={t('link')} />
        </CtaWrapper>
      </Section>
    </Container>
  );
};

export default ReviewsSection;

const Section = styled.section`
  padding: 24px 0;
  font-family: inherit;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--gap);
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const Card = styled.div`
  background: var(--contrastGrad);
  padding: 30px;
  box-shadow: var(--darkShadow);
  border: 1px solid rgba(212, 175, 55, 0.1);
  display: flex;
  flex-direction: column;
  transition:
    transform var(--transitionDuration) ease,
    border-color var(--transitionDuration) ease;
`;

const Stars = styled.div`
  color: var(--secondaryColor);
  font-size: 1.2rem;
  margin-bottom: 15px;
  letter-spacing: 2px;
`;

const Text = styled.p`
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
`;

const Footer = styled.div`
  border-top: 1px solid rgba(182, 191, 192, 0.5);
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Author = styled.span`
  font-weight: bold;
  color: var(--secondaryColor);
  font-size: 1rem;
`;

const DateText = styled.span`
  font-size: 0.9rem;
`;

const CtaWrapper = styled.div`
  align-items: center;
  margin-top: 50px;
  a {
    margin: auto;
  }
`;
