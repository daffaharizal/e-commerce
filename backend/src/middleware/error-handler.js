import { StatusCodes } from 'http-status-codes';

import * as CustomAPIError from '../errors/custom-api.js';

const errorHandlerMiddleware = (err, req, res, next) => {
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: err.message });
};

export default errorHandlerMiddleware;
