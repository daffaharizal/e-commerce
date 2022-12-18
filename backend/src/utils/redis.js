import { createClient } from 'redis';

import ENV from './constants.js';

const redisClient = createClient({
  url: ENV.REDIS_HOST
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

export default redisClient;
