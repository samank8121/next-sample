'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

import GeneralQueryClient from '@/shared/getQueryClient';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = GeneralQueryClient;
  return (    
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
