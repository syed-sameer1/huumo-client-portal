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

/** Shown above the table until a status or secondary flag is applied; then replaced by removable chips. */
export const QUICK_FILTER_PRESET_BAR = [
  { label: 'Overdue', statusValue: 'overdue' },
  { label: 'Missing Vendor Info', statusValue: 'missing-vendor-info' },
  { label: 'Open Follow-ups', statusValue: 'follow-up' },
  { label: 'Acknowledge', statusValue: 'acknowledge' },
  { label: 'Review', statusValue: 'review' },
] as const;

export type PurchaseOrderFilters = {
  searchValue: string;
  orderDateFrom: string;
  orderDateTo: string;
  dueDateFrom: string;
  dueDateTo: string;
  /** Selected PO statuses (multi-select); synced with drawer and quick presets. */
  statuses: string[];
  secondaryFlags: string[];
  quickFilters: string[];
};

export const DEFAULT_FILTERS: PurchaseOrderFilters = {
  searchValue: '',
  orderDateFrom: '',
  orderDateTo: '',
  dueDateFrom: '',
  dueDateTo: '',
  statuses: [],
  secondaryFlags: [],
  quickFilters: [],
};

export function toggleInFilterArray(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

export function filtersToParams(
  filters: PurchaseOrderFilters,
): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.searchValue) params.set('searchValue', filters.searchValue);
  if (filters.orderDateFrom) params.set('orderDateFrom', filters.orderDateFrom);
  if (filters.orderDateTo) params.set('orderDateTo', filters.orderDateTo);
  if (filters.dueDateFrom) params.set('dueDateFrom', filters.dueDateFrom);
  if (filters.dueDateTo) params.set('dueDateTo', filters.dueDateTo);
  filters.statuses.forEach((s) => params.append('status', s));
  filters.secondaryFlags.forEach((f) => params.append('secondaryFlag', f));
  filters.quickFilters.forEach((q) => params.append('quickFilter', q));
  return params;
}

export function getStatusLabel(value: string): string | undefined {
  if (!value) return undefined;
  const opt = STATUS_OPTIONS.find((o) => o.value === value);
  return opt?.label;
}

export function getSecondaryFlagLabel(value: string): string {
  const opt = SECONDARY_FLAG_OPTIONS.find((o) => o.value === value);
  return opt?.label ?? value;
}

export function paramsToFilters(params: URLSearchParams): PurchaseOrderFilters {
  const statusesFromUrl = params.getAll('status');
  return {
    searchValue: params.get('searchValue') ?? '',
    orderDateFrom: params.get('orderDateFrom') ?? '',
    orderDateTo: params.get('orderDateTo') ?? '',
    dueDateFrom: params.get('dueDateFrom') ?? '',
    dueDateTo: params.get('dueDateTo') ?? '',
    statuses: statusesFromUrl,
    secondaryFlags: params.getAll('secondaryFlag'),
    quickFilters: params.getAll('quickFilter'),
  };
}
