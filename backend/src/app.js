require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');
const cors = require('cors');
const app = express();

// rest of the packages
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const path = require('path');
const winston = require('./utils/winston');

// database
const connectDB = require('./db/connect');
const { ENV } = require('./utils/constants');

// routers
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const stripeRouter = require('./routes/stripeRoutes');
const userRouter = require('./routes/userRoutes');
const wishlistRouter = require('./routes/wishlistRoutes');

// middleware
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const corsOptions = {
  origin: ENV.CORS_ALLOWED_DOMAINS.split(','),
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// build-in middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(ENV.JWT_SECRET));
app.use(
  '/static',
  express.static(path.join(path.dirname(__dirname), 'public'))
);
app.use(fileUpload());
app.use(morgan('combined', { stream: winston.stream }));

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

module.exports = app;
