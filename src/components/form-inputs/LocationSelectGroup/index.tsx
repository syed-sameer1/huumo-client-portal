import { FormField } from '@/components/ui/form';
import { InputWithLabel } from '../InputWithLabel';
import { SelectOptions } from '../SelectOptions';
import { useLocationSelects } from './useLocationSelect';
import { LocationSelectParams } from './types';

export const LocationSelectGroup = ({
  control,
  setValue,
}: LocationSelectParams) => {
  const { countries, states, cities, isStateDisabled, isCityDisabled } =
    useLocationSelects({ control, setValue });
  console.log({ countries, states, cities, isStateDisabled, isCityDisabled });
  return (
    <>
      {/* Country */}
      <FormField
        control={control}
        name="country"
        render={({ field }) => (
          <InputWithLabel
            label="Country"
            isRequired
            id="country"
            Input={
              <SelectOptions
                options={countries}
                placeholder="Select your country"
                field={field}
              />
            }
          />
        )}
      />

      {/* State */}
      <FormField
        control={control}
        name="state"
        render={({ field }) => (
          <InputWithLabel
            label="State"
            isRequired
            id="state"
            Input={
              <SelectOptions
                options={states}
                placeholder="Select your state"
                field={field}
                disabled={isStateDisabled}
              />
            }
          />
        )}
      />

      {/* City */}
      <FormField
        control={control}
        name="city"
        render={({ field }) => (
          <InputWithLabel
            label="City"
            isRequired
            id="city"
            Input={
              <SelectOptions
                options={cities}
                placeholder="Select your city"
                field={field}
                disabled={isCityDisabled}
              />
            }
          />
        )}
      />
    </>
  );
};
