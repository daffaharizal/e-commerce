import { Navigate, useLocation } from 'react-router-dom';

import * as ROUTES from 'constant/routes';

import { AuthConsumer } from 'context';

import { IChildrenProps } from 'types';

const CommerceRoute: React.FC<IChildrenProps> = ({ children }) => {
  const { user } = AuthConsumer();
  const location = useLocation();

  if (user?.role === 'admin' && !location.pathname.startsWith(ROUTES.ADMIN)) {
    return (
      <Navigate
        to={ROUTES.ADMINDASH}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};

export default CommerceRoute;
