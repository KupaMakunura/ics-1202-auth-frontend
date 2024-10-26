'use client';
import { useStore } from '@/store';
import Header from './header';
import SimpleHeader from './simple-header';

export const HeaderRenderer = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  return isLoggedIn ? <SimpleHeader /> : <Header />;
};
