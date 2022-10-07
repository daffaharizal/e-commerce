import { Navigate, useLocation } from 'react-router-dom';

import { AuthConsumer } from 'context';
import { IChildrenProps } from 'types';

const PrivateRoute: React.FC<IChildrenProps> = ({ children }) => {
  const { isAuth } = AuthConsumer();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default PrivateRoute;
