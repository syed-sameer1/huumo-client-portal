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

  return (
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
            value={step.id}
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
            className="flex items-center justify-center w-238.5 mx-auto mt-10 flex-col space-y-6"
          >
            {step.IntegrationOption && (
              <step.IntegrationOption
                onNextStep={() =>
                  setCurrentStep((prev) => Math.min(prev + 1, steps.length))
                }
                onBackStep={() =>
                  setCurrentStep((prev) => Math.min(prev - 1, steps.length))
                }
              />
            )}
            <Footer
              showBack={currentStep > 1}
              onNextStep={() =>
                setCurrentStep((prev) => Math.min(prev + 1, steps.length))
              }
              onBackStep={() =>
                setCurrentStep((prev) => Math.min(prev - 1, steps.length))
              }
            />
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  );
}
