import { ReactNode } from 'react';

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return <div className="py-5 px-5">{children}</div>;
};
