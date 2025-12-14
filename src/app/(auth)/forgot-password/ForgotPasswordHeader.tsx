import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const ForgotPasswordHeader = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <Link className="p-0" href="/">
          <ArrowLeft />
        </Link>
        <div className="text-[20px] text-foreground">Forgot Password</div>
      </div>
      <div className="text-muted-foreground text-sm">
        Enter the email address associated with your account to receive a
        4-digit verification code
      </div>
    </div>
  );
};
