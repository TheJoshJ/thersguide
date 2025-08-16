import React from 'react';
import { RuneScapeProvider } from '../contexts/RuneScapeContext';

export default function Root({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <RuneScapeProvider>
      {children}
    </RuneScapeProvider>
  );
}
