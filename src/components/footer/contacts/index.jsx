'use client';

import styled from 'styled-components';
import { useGetContactsQuery } from '@/store/api/contacts.api';
import IconLink from '@/components/icon-label/icon-link';
import LoadingComponent from '@/components/loading/component';

const FooterContacts = () => {
  const { data, error, isLoading } = useGetContactsQuery();

  if (error) {
    return <ErrorWrapper>Error: {error.message}</ErrorWrapper>;
  }

  if (isLoading) {
    return (
      <LoadingWrapper>
        <LoadingComponent />
      </LoadingWrapper>
    );
  }

  if (!data) {
    return null;
  }

  const { phone, email, instagram } = data;

  const iconLinks = [
    { icon: 'phone', href: `tel:${phone}`, text: phone },
    { icon: 'mail', href: `mailto:${email}`, text: email },
    { icon: 'instagram', href: `https://www.instagram.com/${instagram}/`, text: instagram },
  ];

  return (
    <Wrapper>
      {iconLinks.map(({ icon, href, text }) => (
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
  justify-content: end;
`;

const LoadingWrapper = styled.div`
  height: 28px;
`;

const ErrorWrapper = styled.div`
  display: flex;
  gap: var(--gap);
  justify-content: end;
  color: red;
`;
