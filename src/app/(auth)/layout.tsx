import { AuthHeroSection } from '@/components/auth/AuthHeroSection';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background items-center">
      <AuthHeroSection />
      <div className="flex-1">{children}</div>
    </div>
  );
}
