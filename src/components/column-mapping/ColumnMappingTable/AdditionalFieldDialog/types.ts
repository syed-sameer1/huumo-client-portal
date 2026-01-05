import { AddFieldValues } from '@/schema/columnMappingSchema';

export interface AdditionalFieldDialogProps {
  open: boolean;
  onClose: () => void;
  onAddField: (data: AddFieldValues) => void;
}
