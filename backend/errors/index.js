const CustomAPIError = require('./custom-api');
const BadRequestError = require('./bad-request');
const UnAuthenticatedError = require('./unauthenticated');
const UnAthorizedError = require('./unauthorized');

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnAuthenticatedError,
  UnAthorizedError,
};
