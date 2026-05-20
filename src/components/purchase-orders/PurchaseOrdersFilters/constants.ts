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

/** Allowed `sortBy` field names for GET /purchase-order (e.g. `?sortBy=poNumber&sortOrder=ASC`). */
export const PURCHASE_ORDER_SORT_FIELDS = [
  'poNumber',
  'vendorName',
  'vendorEmail',
  'site',
  'buyer',
  'account',
  'orderDate',
  'dueDate',
  'totalQuantity',
  'totalValue',
  'dueIn',
  'overdueBy',
  'lastUpdate',
] as const;

export type PurchaseOrderSortField =
  (typeof PURCHASE_ORDER_SORT_FIELDS)[number];

export type PurchaseOrderSortParam = PurchaseOrderSortField;

export type PurchaseOrderSortOrder = 'ASC' | 'DESC';

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
  vendorId: string;
  /** Active sort column, e.g. `poNumber`. */
  sortBy: '' | PurchaseOrderSortField;
  /** `ASC` or `DESC` when `sortBy` is set. */
  sortOrder: '' | PurchaseOrderSortOrder;
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
  vendorId: '',
  sortBy: '',
  sortOrder: '',
};

const SORT_FIELD_SET = new Set<string>(PURCHASE_ORDER_SORT_FIELDS);

export function isPurchaseOrderSortParam(
  value: string,
): value is PurchaseOrderSortParam {
  return SORT_FIELD_SET.has(value);
}

export function normalizePurchaseOrderSortOrder(
  value: string,
): PurchaseOrderSortOrder | '' {
  const upper = value.toUpperCase();
  if (upper === 'ASC') return 'ASC';
  if (upper === 'DESC') return 'DESC';
  return '';
}

export function isPurchaseOrderSortOrder(
  value: string,
): value is PurchaseOrderSortOrder {
  return normalizePurchaseOrderSortOrder(value) !== '';
}

export function getPurchaseOrderSortDirection(
  sortBy: '' | PurchaseOrderSortField,
  sortOrder: '' | PurchaseOrderSortOrder,
  field: PurchaseOrderSortField,
): false | PurchaseOrderSortOrder {
  if (sortBy !== field) return false;
  return sortOrder === 'DESC' ? 'DESC' : sortOrder === 'ASC' ? 'ASC' : false;
}

/** One sort at a time: new column → ASC; same column cycles ASC → DESC → off. */
export function togglePurchaseOrderSort(
  sortBy: '' | PurchaseOrderSortField,
  sortOrder: '' | PurchaseOrderSortOrder,
  field: PurchaseOrderSortField,
): {
  sortBy: '' | PurchaseOrderSortField;
  sortOrder: '' | PurchaseOrderSortOrder;
} {
  if (sortBy !== field) {
    return { sortBy: field, sortOrder: 'ASC' };
  }
  if (sortOrder === 'ASC') {
    return { sortBy: field, sortOrder: 'DESC' };
  }
  return { sortBy: '', sortOrder: '' };
}

export function purchaseOrderSortToApiQuery(
  sortBy: '' | PurchaseOrderSortField,
  sortOrder: '' | PurchaseOrderSortOrder,
): { sortBy?: string; sortOrder?: PurchaseOrderSortOrder } {
  if (!sortBy) return {};
  return {
    sortBy,
    sortOrder: sortOrder === 'DESC' ? 'DESC' : 'ASC',
  };
}

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
  if (filters.vendorId) params.set('vendorId', filters.vendorId);
  filters.statuses.forEach((s) => params.append('status', s));
  filters.secondaryFlags.forEach((f) => params.append('secondaryFlag', f));
  filters.quickFilters.forEach((q) => params.append('quickFilter', q));
  if (filters.sortBy) {
    params.set('sortBy', filters.sortBy);
    params.set('sortOrder', filters.sortOrder === 'DESC' ? 'DESC' : 'ASC');
  }
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
    vendorId: params.get('vendorId') ?? '',
    ...(() => {
      const sortByRaw = params.get('sortBy') ?? '';
      const sortBy = isPurchaseOrderSortParam(sortByRaw) ? sortByRaw : '';
      if (!sortBy) return { sortBy: '' as const, sortOrder: '' as const };
      const orderRaw = params.get('sortOrder') ?? '';
      const sortOrder = normalizePurchaseOrderSortOrder(orderRaw) || 'ASC';
      return { sortBy, sortOrder };
    })(),
  };
}
