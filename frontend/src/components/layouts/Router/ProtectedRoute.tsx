import { Navigate, useLocation } from 'react-router-dom';

import ROUTES from 'constant/routes';

import { AuthConsumer } from 'context';

import { IChildrenProps } from 'types';

const ProtectedRoute: React.FC<IChildrenProps> = ({ children }) => {
  const { isAuth } = AuthConsumer();
  const location = useLocation();

  if (!isAuth) {
    return (
      <Navigate to={ROUTES.LOGIN} replace state={{ from: location.pathname }} />
    );
  }

  return children;
};

export default ProtectedRoute;
