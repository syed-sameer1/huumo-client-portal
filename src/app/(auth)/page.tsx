import { AuthWrapper } from '@/components/auth/AuthWrapper';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';

export default function Login() {
  return (
    <div className="relative flex items-center h-screen">
      <AuthWrapper title="Log In">
        <LoginForm />
      </AuthWrapper>
      <div className="flex items-center justify-center gap-3 absolute bottom-10 left-0 right-0">
        <Link href="#" className="text-accent-foreground">
          Terms of Service
        </Link>
        <div className="w-0.5 bg-[#EAEBEB] h-5 self-center"></div>
        <Link href="#" className="text-accent-foreground">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
