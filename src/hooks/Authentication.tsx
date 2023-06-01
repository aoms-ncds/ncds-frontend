import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext<AuthContextType|null>(null);

export const AuthProvider = (props: {children: ReactNode}) => {
  const [user, setUser] = useState<Staff | IWorker | null | false>(null);
  const value = useMemo<AuthContextType>(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

interface AuthContextType{
    user: Staff | IWorker | null | false;
    setUser: React.Dispatch<React.SetStateAction<Staff | IWorker | null | false>>;
}
