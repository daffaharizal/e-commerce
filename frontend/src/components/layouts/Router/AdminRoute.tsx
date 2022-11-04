import { Navigate, useLocation } from 'react-router-dom';

import { AuthConsumer } from 'context';

import { IChildrenProps } from 'types';

const AdminRoute: React.FC<IChildrenProps> = ({ children }) => {
  const { user } = AuthConsumer();
  const location = useLocation();

  if (user?.role === 'user' && location.pathname.startsWith('/admin')) {
    return (
      <Navigate to="/products" replace state={{ from: location.pathname }} />
    );
  }

  return children;
};

export default AdminRoute;
