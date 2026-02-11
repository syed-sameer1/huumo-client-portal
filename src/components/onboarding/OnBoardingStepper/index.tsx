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
import { useState } from 'react';
import { AutomationRules } from '../AutomationRules';
import { Footer } from './Footer';
import { PurchaseOrders } from '../PurchaseOrders';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { FollowUpFrequencyFormValues } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { followUpFrequencySchema } from '@/schema/followUpFrequencySchema';
import { useClientUpdateFrequency } from '@/hooks/client';

const steps = [
  {
    title: 'Connect Email',
    id: 1,
    IntegrationOption: IntegrateEmail,
  },
  { title: 'Automation Rules', id: 2, IntegrationOption: AutomationRules },
  { title: 'Upload / Link PO Data', id: 3, IntegrationOption: PurchaseOrders },
];

export default function OnBoardingStepper() {
  const [currentStep, setCurrentStep] = useState(steps[0].id);
  const { mutate, isPending } = useClientUpdateFrequency();
  const form = useForm<FollowUpFrequencyFormValues>({
    resolver: zodResolver(followUpFrequencySchema),
    mode: 'onChange',
    defaultValues: {
      followup1FrequencyDays: undefined,
      followup2FrequencyDays: undefined,
      followup3FrequencyDays: undefined,
    },
  });

  const handleNext = async () => {
    if (currentStep === 2) {
      const isValid = await form.trigger([
        'followup1FrequencyDays',
        'followup2FrequencyDays',
        'followup3FrequencyDays',
      ]);

      if (!isValid) return;
      console.log('form.getValues', form.getValues());
      mutate(form.getValues(), {
        onSuccess: (res) => {
          console.log('res', res);
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
              key={index}
              step={step.id}
              className="relative flex-1 items-start"
            >
              <StepperTrigger className="flex flex-col gap-2.5">
                <StepperIndicator>{index + 1}</StepperIndicator>
                <StepperTitle>{step.title}</StepperTitle>
              </StepperTrigger>
              {steps.length > index + 1 && (
                <StepperSeparator className="absolute top-3 inset-x-0 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none group-data-[state=completed]/step:bg-primary" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel className="text-sm">
          {steps.map((step, index) => (
            <StepperContent
              key={index}
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
              />
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    </Form>
  );
}
