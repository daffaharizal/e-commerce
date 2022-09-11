import { Navigate } from 'react-router-dom';

import { AuthConsumer } from 'context/auth';
import { iProtectedRoute } from './types';

const ProtectedRoute: React.FC<iProtectedRoute> = ({ children }) => {
  const { isAuth } = AuthConsumer();

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
