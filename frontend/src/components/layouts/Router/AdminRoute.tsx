import { Navigate, useLocation } from 'react-router-dom';

import * as ROUTES from 'constant/routes';

import { AuthConsumer } from 'context';

import { IChildrenProps } from 'types';

const AdminRoute: React.FC<IChildrenProps> = ({ children }) => {
  const { user } = AuthConsumer();
  const location = useLocation();

  if (user?.role === 'user' && location.pathname.startsWith(ROUTES.ADMIN)) {
    return (
      <Navigate
        to={ROUTES.PRODUCTS}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};

export default AdminRoute;
