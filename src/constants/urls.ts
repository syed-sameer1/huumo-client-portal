export const BASE_URL = 'https://staging-api.huumo.ai';

export const urls = {
  register: '/auth/client/register',
  sendOtp: '/otp/send',
  verifyOtp: '/auth/client/verify-otp',
  login: '/auth/client/login',
  forgotPassword: '/auth/client/forget-password',
  createSubscription: '/subscription/create',
  subscriptionStatus: '/subscription/subscription-status',
  userActivate: '/user/activate',
  user: '/user',
  updateFollowUpFrequency: '/client/settings/update-followup-frequency',
  importCSV: '/imports/csv/purchaseOrder',
  gmailConnect: '/google/gmail/connect',
  columnMapping: '/imports/import-job/{importJobId}',
  mapping: '/imports/mapping/purchaseOrder',
  purchaseOrder: '/purchase-order',
  purchaseOrderDetails: '/purchase-order/{purchaseOrderId}',
  users: '/user',
  deleteUser: '/user/{id}',
  vendors: '/vendor',
  vendor: `/vendor/{id}`,
  deleteVendor: `/vendor/{id}`,
  importVendorCSV: '/imports/csv/vendor',
  vendorMapping: '/imports/mapping/vendor',
};

export const routeUrls = {
  otpRoute: '/verify-email/otp',
  subscriptionRoute: '/subscription',
  purchaseOrdersRoute: '/purchase-orders',
  onboardingRoute: '/onboarding',
  selectImportMethod: '/purchase-orders/select-import-method',
  loginRoute: '/',
  columnMapping: '/purchase-orders/select-import-method/column-mapping',
  vendorColumnMapping: '/vendors/column-mapping',
};
