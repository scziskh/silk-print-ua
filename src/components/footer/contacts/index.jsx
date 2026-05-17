'use client';

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useGetContactsQuery } from '@/store/api/contacts.api';
import IconLink from '@/components/icon-label/icon-link';
import { getFormatedPhone } from '@/helpers/formatedPhone';

const FooterContacts = () => {
  const { data, error } = useGetContactsQuery();

  const contacts = useMemo(() => {
    if (!data) return [];

    const { phone, email, instagram } = data;
    const result = [];

    if (phone) {
      result.push({
        icon: 'phone',
        href: `tel:${phone}`,
        text: getFormatedPhone(phone),
        isExternal: false,
      });
    }
    if (email) {
      result.push({
        icon: 'mail',
        href: `mailto:${email}`,
        text: email,
        isExternal: false,
      });
    }
    if (instagram) {
      result.push({
        icon: 'instagram',
        href: `https://www.instagram.com/${instagram}/`,
        text: instagram,
        isExternal: true,
      });
    }

    return result;
  }, [data]);

  if (error) {
    const errorMessage = 'status' in error ? `Ошибка сервера (Код: ${error.status})` : error.message || 'Failed to load contacts';

    return <ErrorWrapper>Error: {errorMessage}</ErrorWrapper>;
  }

  if (contacts.length === 0) {
    return null;
  }

  return (
    <Wrapper aria-label="Контакты">
      {contacts.map(({ icon, href, text, isExternal }) => (
        <IconLink key={icon} icon={icon} href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}>
          {text}
        </IconLink>
      ))}
    </Wrapper>
  );
};

export default React.memo(FooterContacts);

const Wrapper = styled.address`
  display: flex;
  gap: var(--gap);
  justify-content: flex-end;
  font-style: normal;

  @media screen and (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ErrorWrapper = styled.div`
  color: red;
  text-align: center;
`;
