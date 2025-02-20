'use client';

import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './api/contacts.api';

export const makeStore = (initialState, options) =>
  configureStore({
    reducer: {
      [contactsApi.reducerPath]: contactsApi.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(contactsApi.middleware),
  });
