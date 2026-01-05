import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export const PageContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={cn('py-5 px-5', className)}>{children}</div>;
};
