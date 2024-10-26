'use client';
import Header from './header';
import SimpleHeader from './simple-header';
import { useSession } from 'next-auth/react';

export const HeaderRenderer = () => {
  const { data: session } = useSession();

  return session ? <SimpleHeader /> : <Header />;
};
