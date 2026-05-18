'use client';

import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Table } from '@tanstack/react-table';
import { ChevronRight } from 'lucide-react';

type Props<TData> = {
  table: Table<TData>;
  total: number;
  pageSizeOptions?: number[];
};

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

function getVisiblePages(
  currentOneBased: number,
  totalPages: number,
): (number | 'ellipsis')[] {
  if (totalPages <= 0) return [];
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const left = Math.max(2, currentOneBased - 1);
  const right = Math.min(totalPages - 1, currentOneBased + 1);

  const result: (number | 'ellipsis')[] = [1];

  if (left > 2) {
    result.push('ellipsis');
  }

  for (let p = left; p <= right; p++) {
    if (p !== 1 && p !== totalPages) {
      result.push(p);
    }
  }

  if (right < totalPages - 1) {
    result.push('ellipsis');
  }

  result.push(totalPages);
  return result;
}

export function DataTablePagination<TData>({
  table,
  total,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
}: Props<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = pageIndex + 1;
  const pages = getVisiblePages(current, pageCount);

  const mergedSizeOptions = [...new Set([...pageSizeOptions, pageSize])].sort(
    (a, b) => a - b,
  );

  return (
    <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center justify-end mr-4 mt-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Rows per page:</span>
        <Select
          value={String(pageSize)}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-9 w-[72px] rounded-md h-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {mergedSizeOptions.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ShadPagination className="mx-0 w-auto justify-end">
        <PaginationContent className="flex flex-wrap items-center gap-1 sm:gap-2">
          <PaginationItem>
            <button
              type="button"
              aria-label="Go to previous page"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              className={cn(
                'inline-flex items-center px-2 py-1.5 text-sm transition-colors',
                table.getCanPreviousPage()
                  ? 'text-foreground hover:text-foreground/90'
                  : 'cursor-not-allowed text-muted-foreground/70',
              )}
            >
              Previous
            </button>
          </PaginationItem>

          {pages.map((page, index) =>
            page === 'ellipsis' ? (
              <PaginationItem key={`e-${index}`}>
                <span
                  className="flex h-9 min-w-9 items-center justify-center px-1 text-sm text-muted-foreground"
                  aria-hidden
                >
                  ...
                </span>
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    table.setPageIndex(page - 1);
                  }}
                  isActive={current === page}
                  size="default"
                  className={cn(
                    'min-w-9 px-3 h-fit',
                    current === page &&
                      'rounded-md border border-input bg-background font-normal shadow-none',
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <button
              type="button"
              aria-label="Go to next page"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              className={cn(
                'inline-flex items-center gap-1 px-2 py-1.5 text-sm transition-colors',
                table.getCanNextPage()
                  ? 'text-foreground hover:text-foreground/90'
                  : 'cursor-not-allowed text-muted-foreground/70',
              )}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </PaginationItem>
        </PaginationContent>
      </ShadPagination>
    </div>
  );
}
