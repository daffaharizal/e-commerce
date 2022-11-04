import { Navigate, useLocation } from 'react-router-dom';

import { AuthConsumer } from 'context';

import { IChildrenProps } from 'types';

const CommerceRoute: React.FC<IChildrenProps> = ({ children }) => {
  const { user } = AuthConsumer();
  const location = useLocation();

  if (user?.role === 'admin' && !location.pathname.startsWith('/admin')) {
    return (
      <Navigate to="/admin/dash" replace state={{ from: location.pathname }} />
    );
  }

  return children;
};

export default CommerceRoute;
