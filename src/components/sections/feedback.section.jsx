'use client';

import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Input from '../form-elements/input';
import Container from '@/layouts/container';
import TextArea from '../form-elements/textarea';
import { useTranslations } from 'next-intl';
import PhoneNumberInput from '../form-elements/phoneNumber.input';
import { useEffect } from 'react';
import FileInput from '../form-elements/file.input';
import Button from '../form-elements/button';

const FeedbackSection = (props) => {
  const t = useTranslations('Feedback');

  const onSubmit = (data) => {
    console.log(data);
  };
  const methods = useForm();

  return (
    <StyledFeedbackSection>
      <Container>
        <h2>{t('h2')}</h2>
        <FormProvider {...methods}>
          <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
            <StyledMainGrid>
              <Input type="email" name="email2" placeholder={t('email')} required />
              <StyledInnerGrid>
                <Input type="text" name="name" placeholder={t('name')} required />
                <PhoneNumberInput name="phone" placeholder={t('phone')} control={methods.control} />
              </StyledInnerGrid>
            </StyledMainGrid>
            <TextArea name="text" placeholder={t('text')} required />
            <StyledFileInputGrid>
              <FileInput name="files" label={methods.getValues('files')?.[0]?.name ?? t('files')} control={methods.control} />
              <Button label={t('button')} />
            </StyledFileInputGrid>
          </StyledForm>
        </FormProvider>
      </Container>
    </StyledFeedbackSection>
  );
};

export default FeedbackSection;

const StyledFeedbackSection = styled.section``;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const StyledInnerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap);

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const StyledMainGrid = styled(StyledInnerGrid)`
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const StyledFileInputGrid = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap);
  flex-direction: column;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-end;
  }
  button {
    margin-left: auto;
  }
`;
