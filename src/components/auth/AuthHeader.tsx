import { ReactNode } from 'react';

interface AuthHeaderProps {
  backIcon: ReactNode;
  title: string;
  description: string;
}

export const AuthHeader = ({
  backIcon,
  title,
  description,
}: AuthHeaderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        {backIcon}
        <div className="text-[20px] text-foreground">{title}</div>
      </div>
      <div className="text-muted-foreground text-sm">{description}</div>
    </div>
  );
};
