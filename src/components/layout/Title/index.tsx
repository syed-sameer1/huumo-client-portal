import { ReactNode } from 'react';

export const Title = ({ children }: { children: ReactNode }) => {
  return <h3 className="text-[24px] font-semibold">{children}</h3>;
};
