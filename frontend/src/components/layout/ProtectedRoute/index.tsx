import { Navigate, useLocation } from 'react-router-dom';

import { AuthConsumer } from 'context/auth';
import { IProtectedRoute } from './types';

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const { isAuth } = AuthConsumer();
  const location = useLocation();

  if (isAuth) {
    return <Navigate to="/products" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
