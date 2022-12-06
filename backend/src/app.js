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
import connectDB from './db/connect';

// middleware
import errorHandlerMiddleware from './middleware/error-handler';
import notFound from './middleware/not-found';

// routers
import authRouter from './routes/authRoutes';
import orderRouter from './routes/orderRoutes';
import productRouter from './routes/productRoutes';
import reviewRouter from './routes/reviewRoutes';
import stripeRouter from './routes/stripeRoutes';
import userRouter from './routes/userRoutes';
import wishlistRouter from './routes/wishlistRoutes';

import ENV from './utils/constants';
import winstonLogger from './utils/winston';

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
