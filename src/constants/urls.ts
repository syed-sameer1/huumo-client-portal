export const BASE_URL = 'https://staging-api.huumo.ai';

export const urls = {
  register: '/auth/client/register',
  sendOtp: '/otp/send',
  verifyOtp: '/auth/client/verify-otp',
  login: '/auth/client/login',
  forgotPassword: '/auth/client/forget-password',
  createSubscription: '/subscription/create',
  subscriptionStatus: '/subscription/subscription-status',
};

export const routeUrls = {
  otpRoute: '/verify-email/otp',
  subscriptionRoute: '/subscription',
  purchaseOrdersRoute: '/purchase-orders',
  onboardingRoute: '/onboarding',
  selectImportMethod: '/purchase-orders/select-import-method',
};
