import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FooterProps } from './types';

export const Footer = ({ showBack, onNextStep, onBackStep }: FooterProps) => {
  return (
    <div className="flex justify-between w-full">
      {showBack && (
        <Button
          onClick={onBackStep}
          className="border border-[#E4E4E7] bg-white text-foreground hover:bg-transparent"
        >
          Back
        </Button>
      )}
      <div className="flex justify-end items-center w-full gap-3">
        <div className="text-muted-foreground">
          You can edit all settings later.
        </div>
        <Button
          className="bg-background-primary-light text-accent-foreground hover:bg-transparent"
          asChild
        >
          <Link href="/purchase-orders">Skip to Dashboard</Link>
        </Button>
        <Button className="bg-[#20A665] text-white" onClick={onNextStep}>
          Save and Continue
        </Button>
      </div>
    </div>
  );
};
