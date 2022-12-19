import * as CustomError from '../errors/index.js';

import { validateToken } from '../utils/jwt.js';

const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnAuthenticatedError(
      'Authentication Invalid - Token missing'
    );
  }

  try {
    const { email, id, role } = validateToken({ token });
    req.user = { email, id, role };
    next();
  } catch (error) {
    throw new CustomError.UnAuthenticatedError(
      'Authentication Invalid - Invalid Token'
    );
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnAthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

export { authenticateUser, authorizePermissions };
