import { Column } from '@tanstack/react-table';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

type SortOrder = 'ASC' | 'DESC';

function getSortDirection<TField extends string>(
  sortBy: '' | TField,
  sortOrder: '' | SortOrder,
  field: TField,
): false | SortOrder {
  if (sortBy !== field || !sortOrder) return false;
  return sortOrder;
}

type ServerSortableHeaderProps<TField extends string = string> = {
  column: Column<any, any>;
  title: string;
  sortField: TField;
  sortBy: '' | TField;
  sortOrder: '' | SortOrder;
  onSortChange: (field: TField) => void;
};

type ClientSortableHeaderProps = {
  column: Column<any, any>;
  title: string;
  sortField?: never;
  sortBy?: never;
  sortOrder?: never;
  onSortChange?: never;
};

export function SortableHeader<TField extends string = string>(
  props: ServerSortableHeaderProps<TField> | ClientSortableHeaderProps,
) {
  const { column, title } = props;

  if (props.onSortChange) {
    const sorted = getSortDirection(
      props.sortBy,
      props.sortOrder,
      props.sortField,
    );

    return (
      <button
        type="button"
        onClick={() => props.onSortChange(props.sortField)}
        className="flex items-center gap-2 font-medium"
        title="Click to sort ascending; click again for descending, then clear"
      >
        {title}
        {!sorted && <ArrowUpDown className="h-4 w-4 text-muted-foreground" />}
        {sorted === 'ASC' && <ArrowUp className="h-4 w-4" />}
        {sorted === 'DESC' && <ArrowDown className="h-4 w-4" />}
      </button>
    );
  }

  const sorted = column.getIsSorted();

  return (
    <button
      type="button"
      onClick={() => column.toggleSorting(sorted === 'asc')}
      className="flex items-center gap-2 font-medium"
    >
      {title}
      {!sorted && <ArrowUpDown className="h-4 w-4 text-muted-foreground" />}
      {sorted === 'asc' && <ArrowUp className="h-4 w-4" />}
      {sorted === 'desc' && <ArrowDown className="h-4 w-4" />}
    </button>
  );
}
