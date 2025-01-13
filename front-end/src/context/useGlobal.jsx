import { useContext } from 'react';

import { GlobalStateContext } from './GlobalStateContext';

export const useGlobal = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobal');
  }
  return context;
};
