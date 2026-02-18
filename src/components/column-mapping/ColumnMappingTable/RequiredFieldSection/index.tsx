import { MappingRow } from '../MappingRow';
import { REQUIRED_FIELDS } from './constants';

export const RequiredFieldSection = ({ headers }: { headers: any }) => {
  return (
    <div>
      {REQUIRED_FIELDS.map((field, index) => (
        <MappingRow
          key={field.id}
          name={`required.${field.id}`}
          label={field.label}
          sample={field.sample}
          id={field.id}
          required
          showBorder={index !== REQUIRED_FIELDS.length - 1}
          headers={headers}
        />
      ))}
    </div>
  );
};
