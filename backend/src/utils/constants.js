const {
  MONGODB_URI,
  NODE_ENV,
  PORT,
  CORS_ALLOWED_DOMAINS,
  JWT_SECRET,
  JWT_LIFETIME,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  SG_API_KEY,
  SG_USER_VERIFICATION_TEMPLATE_ID,
  SG_USER_VERIFICATION_URL,
  SG_PASSWORD_RESET_URL,
  SG_PASSWORD_RESET_TEMPLATE_ID,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_ENDPOINT_SECRET,
  STRIPE_CURRENCY
} = process.env;

const ENV = {
  MONGODB_URI,
  NODE_ENV,
  PORT,
  CORS_ALLOWED_DOMAINS,
  JWT_SECRET,
  JWT_LIFETIME,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  SG_API_KEY,
  SG_USER_VERIFICATION_TEMPLATE_ID,
  SG_USER_VERIFICATION_URL,
  SG_PASSWORD_RESET_URL,
  SG_PASSWORD_RESET_TEMPLATE_ID,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_ENDPOINT_SECRET,
  STRIPE_CURRENCY
};

export default ENV;
