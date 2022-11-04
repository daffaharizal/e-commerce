import React, { PropsWithChildren } from 'react';

import { IAuthContext, IAuthUser } from './types';

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [authUser, setAuthUser] = React.useState<IAuthUser>(
    JSON.parse(
      localStorage.getItem('authUser') || '{"isAuth": false}'
    ) as IAuthUser
  );

  return (
    <AuthContext.Provider value={{ ...authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = () => React.useContext(AuthContext) as IAuthContext;

export { AuthProvider, AuthConsumer };
