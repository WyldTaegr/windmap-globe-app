'use client';
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type LoadingContextType = {
  isGlobalLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const startLoading = useCallback(() => {
    setLoadingCount(c => c + 1);
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingCount(c => Math.max(0, c - 1));
  }, []);

  const isGlobalLoading = loadingCount > 0;

  return (
    <LoadingContext.Provider value={{ isGlobalLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useGlobalLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error('useGlobalLoading must be used within a LoadingProvider');
  return ctx;
};
