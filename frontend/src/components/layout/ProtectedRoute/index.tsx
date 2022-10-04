import { Navigate, useLocation } from 'react-router-dom';

import { AuthConsumer } from 'context/auth';
import { IChildrenProps } from 'types';

const ProtectedRoute: React.FC<IChildrenProps> = ({ children }) => {
  const { isAuth } = AuthConsumer();
  const location = useLocation();

  if (isAuth) {
    return (
      <Navigate to="/products" replace state={{ from: location.pathname }} />
    );
  }

  return children;
};

export default ProtectedRoute;
