import { Navigate, useLocation } from 'react-router-dom';

import * as ROUTES from 'constant/routes';

import { AuthConsumer } from 'context';

import { IChildrenProps } from 'types';

const PreventedRoute: React.FC<IChildrenProps> = ({ children }) => {
  const { isAuth } = AuthConsumer();
  const location = useLocation();

  if (isAuth) {
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

export default PreventedRoute;
