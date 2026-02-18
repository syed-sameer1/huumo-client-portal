/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, FormField } from '@/components/ui/form';
import { AuthWrapper } from '../AuthWrapper';
import { InputWithLabel } from '@/components/form-inputs/InputWithLabel';
import { useForm } from 'react-hook-form';
import { CompanyDetailsFormValues } from '../types';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyDetailsSchema } from '@/schema/authSchema';
import { Button } from '@/components/ui/button';
import { CompanyDetailsFormProps } from './types';
import { LocationSelectGroup } from '@/components/form-inputs/LocationSelectGroup';

export const CompanyDetailsForm = ({
  email,
  password,
  name,
}: CompanyDetailsFormProps) => {
  const form = useForm<CompanyDetailsFormValues>({
    defaultValues: {
      companyName: '',
      website: '',
      country: '',
      state: '',
      city: '',
    },
    resolver: zodResolver(companyDetailsSchema),
  });

  const { handleSubmit, control } = form;

  const onSubmit = (_values: CompanyDetailsFormValues) => {};

  return (
    <AuthWrapper
      title="Add Company Details"
      description="Add your company details to complete your account setup."
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <InputWithLabel
                  label="Company Name"
                  isRequired
                  Input={
                    <Input
                      id="companyName"
                      placeholder="Enter your company name"
                      {...field}
                    />
                  }
                  id="companyName"
                />
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <InputWithLabel
                  label="Website"
                  isRequired
                  Input={
                    <Input
                      id="website"
                      placeholder="Enter your website name"
                      {...field}
                    />
                  }
                  id="website"
                />
              )}
            />

            <LocationSelectGroup control={control} setValue={form.setValue} />

            <Button className="bg-accent-foreground h-10 rounded-md">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </AuthWrapper>
  );
};
