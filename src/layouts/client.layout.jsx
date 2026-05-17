'use client';

import Footer from '@/components/footer';
import LoadingComponent from '@/components/loading/component';
import Navbar from '@/components/navbar';
import { useEffect, useState } from 'react';

const ClientLayout = ({ children }) => {
  const [isFallback, setIsFallback] = useState(true);
  useEffect(() => setIsFallback(false), []);
  return isFallback ? (
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
