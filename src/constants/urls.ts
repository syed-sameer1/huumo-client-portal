export const BASE_URL = 'https://staging-api.huumo.ai';

export const urls = {
  register: '/auth/client/register',
  sendOtp: '/otp/send',
  verifyOtp: '/auth/client/verify-otp',
  login: '/auth/client/login',
  forgotPassword: '/auth/client/forget-password',
  createSubscription: '/subscription/create',
  subscriptionStatus: '/subscription/subscription-status',
  clientActivate: '/client/activate',
  updateFollowUpFrequency: '/client/settings/update-followup-frequency',
  importCSV: '/imports/csv',
  gmailConnect: '/google/gmail/connect',
  columnMapping: '/imports/import-job/{importJobId}',
  mapping: '/imports/mapping',
  purchaseOrder: '/purchase-order',
  purchaseOrderDetails: '/purchase-order/{purchaseOrderId}',
};

export const routeUrls = {
  otpRoute: '/verify-email/otp',
  subscriptionRoute: '/subscription',
  purchaseOrdersRoute: '/purchase-orders',
  onboardingRoute: '/onboarding',
  selectImportMethod: '/purchase-orders/select-import-method',
  loginRoute: '/',
  columnMapping: '/purchase-orders/select-import-method/column-mapping',
};
