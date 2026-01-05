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
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AdditionalFieldDialog } from '../AdditionalFieldDialog';
import { AddFieldValues } from '@/schema/columnMappingSchema';

export const AdditionalFieldSection = () => {
  const [additionalFields, setAdditionalFields] =
    useState<MappingField[]>(ADDITIONAL_FIELDS);
  const [open, setOpen] = useState(false);

  const addField = ({ name, sample }: AddFieldValues) => {
    console.log('hee');
    setAdditionalFields((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: name,
        sample,
        removable: true,
      },
    ]);
  };
  console.log({ additionalFields });

  const removeField = (id: string) => {
    console.log(id);
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
              />
            ))}

            <Button
              variant="ghost"
              onClick={() => setOpen(true)}
              className="text-green-600 mt-4"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Field
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <AdditionalFieldDialog
        open={open}
        onClose={() => setOpen(false)}
        onAddField={addField}
      />
    </>
  );
};
