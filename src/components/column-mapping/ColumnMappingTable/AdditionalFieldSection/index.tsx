'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MappingRow } from '../MappingRow';
import { ADDITIONAL_FIELDS } from './constants';
import { MappingField } from '../MappingRow/types';
import { useState } from 'react';

export const AdditionalFieldSection = ({ headers }: { headers: any }) => {
  const [additionalFields, setAdditionalFields] =
    useState<MappingField[]>(ADDITIONAL_FIELDS);

  const removeField = (id: string) => {
    setAdditionalFields((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="additional" className="border-none">
          <AccordionTrigger className="py-4 hover:no-underline">
            <div className="text-left">
              <p className="font-semibold">Additional fields (optional)</p>
              <p className="text-sm text-muted-foreground">
                The more information inputted, the better the system will work
              </p>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            {additionalFields.map((field, index) => (
              <MappingRow
                name={`additional.${field.id}`}
                id={field.id}
                key={field.id}
                onRemove={removeField}
                showBorder={index !== additionalFields.length - 1}
                label={field.label}
                sample={field.sample}
                headers={headers}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
