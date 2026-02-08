import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import {
  Stepper,
  StepperItem,
  StepperNav,
  StepperSeparator,
} from '@/components/ui/stepper';
import { Check, InfoIcon } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    title: 'Connect Email',
    id: 1,
  },
  { title: 'Automation Rules', id: 2 },
  { title: 'Upload / Link PO Data', id: 3 },
];

interface WelcomeHuumoModalProps {
  open: boolean;
  onClose: () => void;
}

export const WelcomeHuumoModal = ({
  open,
  onClose,
}: WelcomeHuumoModalProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="items-center justify-center flex flex-col [&>button]:hidden p-10 space-y-4">
        <div className="bg-[#20A6650D] w-30 h-30 rounded-full flex items-center justify-center">
          <Check className="text-[#20A665]" size={70} />
        </div>
        <div className="text-center space-y-3">
          <div className="text-foreground text-[18px] font-semibold">
            Welcome to HUUMO
          </div>
          <div className="text-secondary-foreground text-[14px]">
            We will take you through the set-up of your account, all settings
            rules and connections can be edited later as well.
          </div>
          <div className="flex items-center justify-center gap-2">
            <InfoIcon size={18} />
            <div className="text-[14px] text-secondary-foreground">
              AI can read and scan emails.
            </div>
          </div>
        </div>
        <Stepper
          defaultValue={steps[0].id}
          orientation="vertical"
          className="space-y-6"
        >
          <StepperNav className="flex flex-col">
            {steps.map((step, index) => (
              <StepperItem
                key={step.id}
                step={step.id}
                className="relative flex items-start"
              >
                <div>
                  <div className="flex items-start gap-2">
                    <div className="border-[#DDE5EF] border rounded-full w-7 h-7 flex items-center justify-center">
                      <div className="text-[#64748B] text-sm">{step.id}</div>
                    </div>
                    <div className="pt-1 text-sm text-muted-foreground data-[state=active]:text-foreground data-[state=active]:font-medium">
                      {step.title}
                    </div>
                  </div>

                  {index !== steps.length - 1 && (
                    <StepperSeparator className="ml-3.5 w-px flex-none self-start bg-[#DDE5EF] h-7!" />
                  )}
                </div>
              </StepperItem>
            ))}
          </StepperNav>
        </Stepper>

        <DialogFooter className="space-x-6 w-full">
          <Button
            variant="outline"
            onClick={onClose}
            asChild
            className="bg-[#FAFAFA] text-[#20A665] w-38.75"
          >
            <Link href="/dashboard">Skip to Dashboard</Link>
          </Button>
          <Button
            className=" text-white font-medium bg-background-secondary w-38.75"
            onClick={onClose}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
