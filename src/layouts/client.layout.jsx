'use client';

/*Components*/
import Navbar from '@/components/navbar';
import { useEffect, useState } from 'react';

const ClientLayout = ({ children }) => {
  const [isFallback, setIsFallback] = useState(true);
  useEffect(() => setIsFallback(false), []);
  return isFallback ? (
    <>Loading...</>
  ) : (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default ClientLayout;
