import React from 'react';
import { iAuthUser, iAuthContext, iAuthProvider } from './types';

const AuthContext = React.createContext<iAuthContext | undefined>(undefined);

const AuthProvider: React.FC<iAuthProvider> = ({ children }) => {
  const [authUser, setAuthUser] = React.useState<iAuthUser>(
    JSON.parse(
      localStorage.getItem('authUser') || '{"isAuth": false, "user": {}}'
    ) as iAuthUser
  );

  return (
    <AuthContext.Provider value={{ ...authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = () => React.useContext(AuthContext) as iAuthContext;

export { AuthContext, AuthProvider, AuthConsumer };
