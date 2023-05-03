import React, { ReactNode, useContext, useMemo, useState } from 'react';
interface CounterContextType{
    count: number;
    onLoad: () => void;
    afterLoad: () => void;
}
const CounterContext = React.createContext<CounterContextType|undefined>(undefined);
interface CounterProviderProps{
    children: ReactNode;
}
export const CounterProvider = (props: CounterProviderProps) => {
  const [count, setCount] = useState(0);

  const value = useMemo<CounterContextType>(() => ({
    count,
    onLoad: () => setCount((count) => count+1),
    afterLoad: () => setCount((count) => count-1),
  }), [count]);

  return (
    <CounterContext.Provider value={value}>
      {props.children}
    </CounterContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};
