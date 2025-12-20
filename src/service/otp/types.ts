export interface OtpResponse {
  message: string;
}

export type OtpSendPayload = {
  email: string;
};

export type OtpVerifyPayload = {
  otp: number;
};
