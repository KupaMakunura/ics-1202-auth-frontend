'use client';
import Header from './header';
import SimpleHeader from './simple-header';
import { useStore } from '@/store';

export const HeaderRenderer = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  return isLoggedIn ? <SimpleHeader /> : <Header />;
};
