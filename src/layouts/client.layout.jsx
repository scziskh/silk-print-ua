'use client';

import Footer from '@/components/footer';
import LoadingComponent from '@/components/loading/component';
import Navbar from '@/components/navbar';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

const ClientLayout = ({ children }) => {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return !isClient ? (
    <LoadingComponent />
  ) : (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default ClientLayout;
