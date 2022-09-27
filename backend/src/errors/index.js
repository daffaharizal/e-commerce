const CustomAPIError = require('./custom-api');
const BadRequestError = require('./bad-request');
const UnAuthenticatedError = require('./unauthenticated');
const UnAthorizedError = require('./unauthorized');
const NotFoundError = require('./not-found');

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnAuthenticatedError,
  UnAthorizedError,
  NotFoundError
};
