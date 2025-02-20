'use client';

import styled from 'styled-components';
import { useGetContactsQuery } from '@/store/api/contacts.api';
import IconLink from '@/components/icon-label/icon-link';
import LoadingComponent from '@/components/loading/component';

const FooterContacts = () => {
  const { data, error, isLoading } = useGetContactsQuery();

  if (error) {
    return <ErrorWrapper>Error: {error?.message || 'Failed to load contacts'}</ErrorWrapper>;
  }

  if (isLoading) {
    return (
      <LoadingComponentWrapper>
        <LoadingComponent />
      </LoadingComponentWrapper>
    );
  }

  if (!data) {
    return (
      <ErrorWrapper>
        <p>No contacts available</p>
      </ErrorWrapper>
    );
  }

  const { phone, email, instagram } = data;

  const contacts = [
    { icon: 'phone', href: `tel:${phone}`, text: phone },
    { icon: 'mail', href: `mailto:${email}`, text: email },
    { icon: 'instagram', href: `https://www.instagram.com/${instagram}/`, text: instagram },
  ];

  return (
    <Wrapper>
      {contacts.map(({ icon, href, text }) => (
        <IconLink key={icon} icon={icon} href={href} target="_blank">
          {text}
        </IconLink>
      ))}
    </Wrapper>
  );
};

export default FooterContacts;

const Wrapper = styled.div`
  display: flex;
  gap: var(--gap);
  justify-content: flex-end;
  @media screen and (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LoadingComponentWrapper = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorWrapper = styled.div`
  color: red;
  text-align: center;
`;
