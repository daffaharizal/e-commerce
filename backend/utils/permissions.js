const CustomError = require('../errors');

const checkPermission = ({
  requestUser,
  resourceUser,
  isAdminAuthorized = true
}) => {
  if (requestUser.role === 'admin' && isAdminAuthorized) return;
  if (requestUser.id === resourceUser.id) return;
  throw new CustomError.UnAthorizedError('Not authorized to access this route');
};

module.exports = checkPermission;
