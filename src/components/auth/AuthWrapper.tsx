import { ReactNode } from 'react';

export const AuthWrapper = ({
  title,
  description,
  header,
  children,
}: {
  title?: string;
  description?: string;
  header?: string;
  children: ReactNode;
}) => {
  return (
    <div className="w-107.5 mx-auto border rounded-2xl border-border shadow-[0px_1px_2px_0px_#0000000F,0px_1px_3px_0px_#0000001A] p-6 flex flex-col gap-6">
      {header ? (
        header
      ) : (
        <div className="text-center flex flex-col gap-2">
          <h3 className="text-foreground font-semibold text-[24px] tracking-[-0.006em] leading-8">
            {title}
          </h3>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
      )}
      {children}
    </div>
  );
};
