import { ReactNode } from 'react';

export const ColumnContainer = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-238.5 mx-auto py-10 space-y-6">{children}</div>;
};
