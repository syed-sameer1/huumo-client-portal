import { MappingRow } from '../MappingRow';
import { MappingField } from '../MappingRow/types';

export const RequiredFieldSection = ({
  headers,
  requiredFields,
  errors,
}: {
  headers: any;
  requiredFields: MappingField[];
  errors: any;
}) => {
  return (
    <div>
      {requiredFields.map((field, index) => (
        <MappingRow
          key={field.id}
          name={field.name || ''}
          label={field.label}
          sample={field.sample}
          id={field.id}
          required
          showBorder={index !== requiredFields.length - 1}
          headers={headers}
          errors={errors}
        />
      ))}
    </div>
  );
};
