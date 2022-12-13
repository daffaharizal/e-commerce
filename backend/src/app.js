// express
import express from 'express';

// rest of the packages
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// database
import connectDB from './db/connect.js';

// middleware
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFound from './middleware/not-found.js';

// routers
import authRouter from './routes/authRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import productRouter from './routes/productRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import stripeRouter from './routes/stripeRoutes.js';
import userRouter from './routes/userRoutes.js';
import wishlistRouter from './routes/wishlistRoutes.js';

import ENV from './utils/constants.js';
import winstonLogger from './utils/winston.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);

const corsOptions = {
  origin: ENV.CORS_ALLOWED_DOMAINS?.split(',') || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// build-in middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(ENV.JWT_SECRET));
app.use(
  '/static',
  express.static(path.join(path.dirname(__filename), 'public'))
);
app.use(fileUpload());
app.use(morgan('combined', { stream: winstonLogger.stream }));

app.get('/', (req, res) => {
  res.json({ message: 'alive' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/stripe', stripeRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/wishlist', wishlistRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

app.enable('trust proxy');

const port = ENV.PORT || 5000;

const start = async () => {
  try {
    await connectDB(ENV.MONGODB_URI);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

export default app;
