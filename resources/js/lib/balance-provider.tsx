'use client';

import React from 'react';

const BalanceContext = React.createContext<
  [any, React.Dispatch<React.SetStateAction<any>>] | undefined
>(undefined);

export function BalanceProvider({ children }: { children: React.ReactNode }) {
  const [BalanceData, setBalanceData] = React.useState([]);
  return (
    <BalanceContext.Provider value={[BalanceData, setBalanceData]}>
        {children}
    </BalanceContext.Provider>
  );
}

export function useBalanceProvider() {
  const context = React.useContext(BalanceContext);
  if (context === undefined) {
    throw new Error('useBalanceProvider must be used within a BalanceProvider');
  }
  return context;
}