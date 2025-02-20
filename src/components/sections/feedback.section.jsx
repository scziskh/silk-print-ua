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

  useEffect(() => console.log(methods.getValues()), [methods.watch()]);

  return (
    <Wrapper>
      <Container>
        <h2>{t('h2')}</h2>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <MainGrid>
              <Input type="email" name="email2" placeholder={t('email')} required={true} />
              <Grid>
                <Input type="text" name="name" placeholder={t('name')} required={true} />
                <PhoneNumberInput type="text" name="phone" placeholder={t('phone')} required={false} control={methods.control} />
              </Grid>
            </MainGrid>
            <TextArea type="text" name="text" placeholder={t('text')} required={true} />
            <Grid>
              <FileInput name="files" label={methods.getValues('files')?.[0]?.name ?? t('files')} control={methods.control} />
              <Button label={t('button')} />
            </Grid>
          </Form>
        </FormProvider>
      </Container>
    </Wrapper>
  );
};

export default FeedbackSection;

const Wrapper = styled.section`
  & > div {
    padding: var(--gap) 0;
  }
`;
const Form = styled.form``;
const Grid = styled.div`
  gap: var(--gap);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  button {
    justify-self: end;
  }
`;

const MainGrid = styled(Grid)`
  @media screen and (max-width: 1024px) {
    display: block;
  }
`;
