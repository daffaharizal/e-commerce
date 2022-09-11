import { Navigate, useLocation } from 'react-router-dom';

import { AuthConsumer } from 'context/auth';
import { iProtectedRoute } from './types';

const ProtectedRoute: React.FC<iProtectedRoute> = ({ children }) => {
  const { isAuth } = AuthConsumer();
  const location = useLocation();

  if (isAuth) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
