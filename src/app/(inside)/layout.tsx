import { AppLayoutClient } from '@/components/layout/AppLayoutClient';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppLayoutClient>{children}</AppLayoutClient>
    </div>
  );
}
