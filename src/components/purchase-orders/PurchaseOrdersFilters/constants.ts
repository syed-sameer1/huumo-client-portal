export const STATUS_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Acknowledged', value: 'acknowledge' },
  { label: 'Review', value: 'review' },
  { label: 'Open Follow-Ups', value: 'follow-up' },
  { label: 'Escalated', value: 'escalated' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Missing Vendor Info', value: 'missing-vendor-info' },
  { label: 'Closed', value: 'closed' },
] as const;

export const SECONDARY_FLAG_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Past Due', value: 'past-due' },
  { label: 'Needs Review', value: 'needs-review' },
  { label: 'Open Follow-Ups', value: 'open-follow-ups' },
  { label: 'Escalated', value: 'escalated' },
  { label: 'Automation Paused', value: 'automation-paused' },
] as const;

export const QUICK_FILTERS = [
  { label: 'Needs Action', value: 'needs-action' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Missing Vendor Info', value: 'missing-vendor-info' },
  { label: 'Open Follow-Ups', value: 'follow-up' },
  { label: 'Acknowledged', value: 'acknowledge' },
] as const;

export type PurchaseOrderFilters = {
  searchValue: string;
  orderDateFrom: string;
  orderDateTo: string;
  dueDateFrom: string;
  dueDateTo: string;
  status: string;
  secondaryFlags: string[];
  quickFilters: string[];
};

export const DEFAULT_FILTERS: PurchaseOrderFilters = {
  searchValue: '',
  orderDateFrom: '',
  orderDateTo: '',
  dueDateFrom: '',
  dueDateTo: '',
  status: '',
  secondaryFlags: [],
  quickFilters: [],
};

export function filtersToParams(
  filters: PurchaseOrderFilters,
): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.searchValue) params.set('searchValue', filters.searchValue);
  if (filters.orderDateFrom) params.set('orderDateFrom', filters.orderDateFrom);
  if (filters.orderDateTo) params.set('orderDateTo', filters.orderDateTo);
  if (filters.dueDateFrom) params.set('dueDateFrom', filters.dueDateFrom);
  if (filters.dueDateTo) params.set('dueDateTo', filters.dueDateTo);
  if (filters.status) params.set('status', filters.status);
  filters.secondaryFlags.forEach((f) => params.append('secondaryFlag', f));
  filters.quickFilters.forEach((q) => params.append('quickFilter', q));
  return params;
}

export function paramsToFilters(params: URLSearchParams): PurchaseOrderFilters {
  return {
    searchValue: params.get('searchValue') ?? '',
    orderDateFrom: params.get('orderDateFrom') ?? '',
    orderDateTo: params.get('orderDateTo') ?? '',
    dueDateFrom: params.get('dueDateFrom') ?? '',
    dueDateTo: params.get('dueDateTo') ?? '',
    status: params.get('status') ?? '',
    secondaryFlags: params.getAll('secondaryFlag'),
    quickFilters: params.getAll('quickFilter'),
  };
}
