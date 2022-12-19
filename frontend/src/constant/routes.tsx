const enum ROUTES {
  INDEX = '/',
  ADMIN = '/admin',
  ADMINDASH = '/admin/dash',
  LOGIN = '/login',
  VERIFYUSER = '/verify-user/:userId/:code',
  REGISTER = '/register',
  FORGOTPASSWORD = '/forgot-password',
  PASSWORDRESET = '/password-reset/:userId/:code',
  CART = '/cart',
  PRODUCTS = '/products',
  ACCOUNT = '/my-account',
  PROFILE = '/profile',
  WISHLIST = '/wishlist',
  SETTINGS = '/settings',
  NOMATCH = '*'
}

export default ROUTES;
