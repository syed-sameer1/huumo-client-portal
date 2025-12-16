import { Card } from '@/components/ui/card';
import { PackageProps } from './types';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Package = ({ subscriptionPackage }: PackageProps) => {
  const { packageTitle, description, benefits, hasPrice, price, actionLabel } =
    subscriptionPackage;
  return (
    <Card className="w-75.5 p-4 h-122 flex flex-col justify-between">
      <div className="space-y-8 ">
        <div className="space-y-4">
          <div className="text-[20px] font-semibold text-foreground">
            {packageTitle}
          </div>
          <div className="text-[16px] text-foreground">{description}</div>
        </div>
        <div className="space-y-1">
          {benefits.map(({ title, description, id }) => (
            <div key={id} className="flex items-start gap-1.25 py-1.5">
              <CheckCircle2 className="text-accent-foreground w-5 h-5" />
              <div className="text-sm flex-1">
                <span className="font-semibold">{title}</span>: {description}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-5.5">
        {hasPrice ? (
          <div className="font-semibold text-[32px]">$ {price}</div>
        ) : (
          <div className="font-semibold text-[24px]">Custom Pricing</div>
        )}

        <Button
          className={`${hasPrice ? 'bg-background-secondary' : 'bg-[#516C6E]'} w-full h-11.5`}
        >
          {actionLabel}
        </Button>
      </div>
    </Card>
  );
};
