'use client';

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper';
import { Check, LoaderCircleIcon } from 'lucide-react';
import { IntegrateEmail } from '../IntegrateEmail';
import { useEffect, useState } from 'react';
import { AutomationRules } from '../AutomationRules';
import { Footer } from './Footer';
import { AddPurchaseOrderOptions } from '@/components/purchase-orders/AddPurchaseOrderOptions';
import { Form } from '@/components/ui/form';
import { useForm, type Resolver } from 'react-hook-form';
import { FollowUpFrequencyFormValues } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { followUpFrequencySchema } from '@/schema/followUpFrequencySchema';
import { useClientUpdateFrequency } from '@/hooks/client';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

const steps = [
  { title: 'Connect Email', id: 1, IntegrationOption: IntegrateEmail },
  { title: 'Automation Rules', id: 2, IntegrationOption: AutomationRules },
  {
    title: 'Upload / Link PO Data',
    id: 3,
    IntegrationOption: AddPurchaseOrderOptions,
  },
];

export default function OnBoardingStepper() {
  const [currentStep, setCurrentStep] = useState(steps[0].id);
  const { mutate, isPending } = useClientUpdateFrequency();

  const searchParams = useSearchParams();
  const gmailStatus = searchParams.get('gmail');

  const form = useForm<FollowUpFrequencyFormValues>({
    resolver: zodResolver(
      followUpFrequencySchema,
    ) as Resolver<FollowUpFrequencyFormValues>,
    mode: 'onChange',
    defaultValues: {
      followup1FrequencyDays: 1,
      followup2FrequencyDays: 1,
      followup3FrequencyDays: 1,
      aiConfidenceThreshold: 0,
    },
  });

  useEffect(() => {
    if (!gmailStatus) return;

    const id = setTimeout(() => {
      if (gmailStatus === 'connected') {
        toast.success('Gmail connected successfully');
        // eslint-disable-next-line react-hooks/immutability
        handleNext();
      }

      if (gmailStatus === 'error') {
        toast.error('Gmail connection failed');
      }
    }, 0);

    return () => clearTimeout(id);
  }, [gmailStatus]);

  const handleNext = async () => {
    if (currentStep === 2) {
      const isValid = await form.trigger([
        'followup1FrequencyDays',
        'followup2FrequencyDays',
        'followup3FrequencyDays',
        'aiConfidenceThreshold',
      ]);

      if (!isValid) return;
      mutate(form.getValues(), {
        onSuccess: () => {
          setCurrentStep((prev) => Math.min(prev + 1, steps.length));
        },
      });
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  return (
    <Form {...form}>
      <Stepper
        defaultValue={steps[0].id}
        value={currentStep}
        onValueChange={setCurrentStep}
        indicators={{
          completed: <Check className="size-4" />,
          loading: <LoaderCircleIcon className="size-4 animate-spin" />,
        }}
        className="space-y-8"
      >
        <StepperNav className="w-205">
          {steps.map((step, index) => (
            <StepperItem
              key={step.id}
              step={step.id}
              className="relative flex-1 items-start"
            >
              <StepperTrigger className="flex flex-col gap-2.5">
                <StepperIndicator>{index + 1}</StepperIndicator>
                <StepperTitle>{step.title}</StepperTitle>
              </StepperTrigger>
              {steps.length > index + 1 && (
                <StepperSeparator className="absolute top-3 inset-x-0 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[state=completed]/step:bg-primary" />
              )}
            </StepperItem>
          ))}
        </StepperNav>

        <StepperPanel className="text-sm">
          {steps.map((step) => (
            <StepperContent
              key={step.id}
              value={step.id}
              className="flex items-center justify-center w-238.5 mx-auto my-10 flex-col space-y-6"
            >
              {step.IntegrationOption && <step.IntegrationOption />}
              <Footer
                showBack={currentStep > 1}
                onNextStep={handleNext}
                onBackStep={() =>
                  setCurrentStep((prev) => Math.max(prev - 1, 1))
                }
                loading={isPending}
                showSaveAndContinue={step.id !== 3}
              />
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    </Form>
  );
}
