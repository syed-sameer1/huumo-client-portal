import { DatePicker } from '@/components/form-inputs/date-picker';
import { SearchFilter } from './SearchFilter';

export const POLineItemsFilters = () => {
  return (
    <div className="flex justify-between items-center">
      <SearchFilter />
      <DatePicker />
    </div>
  );
};
