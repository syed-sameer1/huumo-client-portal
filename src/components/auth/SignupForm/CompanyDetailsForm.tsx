import { Form, FormField } from '@/components/ui/form';
import { AuthWrapper } from '../AuthWrapper';
import { InputWithLabel } from '@/components/form-inputs/InputWithLabel';
import { useForm } from 'react-hook-form';
import { CompanyDetailsSchemaValues } from '../types';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyDetailsSchema } from '@/schema/authSchema';
import { SelectOptions } from '@/components/form-inputs/SelectOptions';
import { Button } from '@/components/ui/button';

export const CompanyDetailsForm = ({
  onContinue,
}: {
  onContinue: () => void;
}) => {
  const form = useForm<CompanyDetailsSchemaValues>({
    defaultValues: {
      companyName: '',
      website: '',
      country: '',
      state: '',
      city: '',
    },
    resolver: zodResolver(companyDetailsSchema),
  });

  const { handleSubmit } = form;

  const onSubmit = (values: CompanyDetailsSchemaValues) => {
    console.log(values);
    onContinue();
  };

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
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <InputWithLabel
                  label="Country"
                  isRequired
                  id="country"
                  Input={
                    <SelectOptions
                      options={[
                        {
                          value: 'united-states',
                          label: 'United states',
                        },
                        {
                          value: 'pakistan',
                          label: 'Pakistan',
                        },
                      ]}
                      placeholder="Select your country"
                      field={field}
                    />
                  }
                />
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <InputWithLabel
                  label="State"
                  isRequired
                  id="state"
                  Input={
                    <SelectOptions
                      options={[
                        {
                          value: 'united-states',
                          label: 'United states',
                        },
                        {
                          value: 'pakistan',
                          label: 'Pakistan',
                        },
                      ]}
                      placeholder="Select your state"
                      field={field}
                      disabled={!form.getValues('country')}
                    />
                  }
                />
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <InputWithLabel
                  label="City"
                  isRequired
                  id="city"
                  Input={
                    <SelectOptions
                      options={[
                        {
                          value: 'united-states',
                          label: 'United states',
                        },
                        {
                          value: 'pakistan',
                          label: 'Pakistan',
                        },
                      ]}
                      placeholder="Select your city"
                      field={field}
                      disabled={!form.getValues('country')}
                    />
                  }
                />
              )}
            />
            <Button className="bg-accent-foreground h-10 rounded-md">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </AuthWrapper>
  );
};
