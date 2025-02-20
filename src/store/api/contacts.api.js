'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (build) => ({
    getContacts: build.query({ query: () => 'contacts.json' }),
  }),
});

export const { useGetContactsQuery } = contactsApi;
