const CustomError = require('../errors');
const { validateToken } = require('../utils/jwt');

const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnAuthenticatedError('Authentication Invalid');
  }

  try {
    const { email, id, role } = validateToken({ token });
    req.user = { email, id, role };
    next();
  } catch (error) {
    throw new CustomError.UnAuthenticatedError('Authentication Invalid');
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnAthorizedError(
        'Unauthorized to access this route',
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
