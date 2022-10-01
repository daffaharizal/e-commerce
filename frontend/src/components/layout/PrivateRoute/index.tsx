import { Navigate, useLocation } from 'react-router-dom';

import { AuthConsumer } from 'context/auth';
import { IChildrenProps } from 'types';

const PrivateRoute: React.FC<IChildrenProps> = ({ children }) => {
  const { isAuth } = AuthConsumer();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;