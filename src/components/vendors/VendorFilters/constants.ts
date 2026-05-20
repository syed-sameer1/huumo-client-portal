/** Allowed `sortBy` keys for GET /vendor (e.g. `?sortBy=vendorName&sortOrder=ASC`). */
export const VENDOR_SORT_FIELDS = [
  'vendorName',
  'vendorEmail',
  'totalSpend',
  'confirmationRate',
  'performanceScore',
  'riskLevel',
] as const;

export type VendorSortField = (typeof VENDOR_SORT_FIELDS)[number];

export type VendorSortOrder = 'ASC' | 'DESC';

export type VendorFiltersState = {
  /** Same URL key as purchase orders (`searchValue`). */
  searchValue: string;
  confirmationRateMin: number;
  confirmationRateMax: number;
  performanceScoreMin: number;
  performanceScoreMax: number;
  /** Quick bar: High Risk, Low Confirmation Rate, High Spend */
  quickPresets: string[];
  /** Drawer Sort By: High Risk Vendors, Missing Email, Top Spend Vendors */
  drawerSort: string[];
  vendorId?: string;
  sortBy: '' | VendorSortField;
  sortOrder: '' | VendorSortOrder;
};

export const DEFAULT_VENDOR_FILTERS: VendorFiltersState = {
  searchValue: '',
  confirmationRateMin: 0,
  confirmationRateMax: 100,
  performanceScoreMin: 0,
  performanceScoreMax: 100,
  quickPresets: [],
  drawerSort: [],
  sortBy: '',
  sortOrder: '',
};

const VENDOR_SORT_FIELD_SET = new Set<string>(VENDOR_SORT_FIELDS);

export function isVendorSortField(value: string): value is VendorSortField {
  return VENDOR_SORT_FIELD_SET.has(value);
}

export function normalizeVendorSortOrder(value: string): VendorSortOrder | '' {
  const upper = value.toUpperCase();
  if (upper === 'ASC') return 'ASC';
  if (upper === 'DESC') return 'DESC';
  return '';
}

export function getVendorSortDirection(
  sortBy: '' | VendorSortField,
  sortOrder: '' | VendorSortOrder,
  field: VendorSortField,
): false | VendorSortOrder {
  if (sortBy !== field) return false;
  return sortOrder === 'DESC' ? 'DESC' : sortOrder === 'ASC' ? 'ASC' : false;
}

/** One sort at a time: new column → ASC; same column cycles ASC → DESC → off. */
export function toggleVendorSort(
  sortBy: '' | VendorSortField,
  sortOrder: '' | VendorSortOrder,
  field: VendorSortField,
): { sortBy: '' | VendorSortField; sortOrder: '' | VendorSortOrder } {
  if (sortBy !== field) {
    return { sortBy: field, sortOrder: 'ASC' };
  }
  if (sortOrder === 'ASC') {
    return { sortBy: field, sortOrder: 'DESC' };
  }
  return { sortBy: '', sortOrder: '' };
}

export function vendorSortToApiQuery(
  sortBy: '' | VendorSortField,
  sortOrder: '' | VendorSortOrder,
): { sortBy?: string; sortOrder?: VendorSortOrder } {
  if (!sortBy) return {};
  return {
    sortBy,
    sortOrder: sortOrder === 'DESC' ? 'DESC' : 'ASC',
  };
}

export const VENDOR_QUICK_PRESET_ORDER = [
  'high-risk',
  'low-confirmation-rate',
  'high-spend',
] as const;

export const VENDOR_DRAWER_SORT_ORDER = [
  'high-risk',
  'missing-email',
  'low-confirmation-rate',
  'high-spend',
] as const;

export const VENDOR_PRESET_META: Record<
  string,
  { label: string; shortLabel: string; drawerCount?: number }
> = {
  'high-risk': {
    label: 'High Risk Vendors',
    shortLabel: 'High Risk',
  },
  'low-confirmation-rate': {
    label: 'Low Confirmation Rate',
    shortLabel: 'Low Confirmation Rate',
  },
  'low-performance': {
    label: 'Low Performance',
    shortLabel: 'Low Performance',
  },
  'missing-email': {
    label: 'Missing Email',
    shortLabel: 'Missing Email',
  },
  'high-spend': {
    label: 'High Spend',
    shortLabel: 'High Spend',
  },
  'top-spend': {
    label: 'High Spend',
    shortLabel: 'High Spend',
  },
};

export function toggleInFilterArray(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

function parseIntOr(value: string | null, fallback: number): number {
  if (value === null || value === '') return fallback;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

/** Prefer full query keys; fall back to legacy short keys for older bookmarks. */
function parseSliderFromSearchParams(
  searchParams: URLSearchParams,
  key: string,
  legacyKey: string,
  fallback: number,
): number {
  const primary = searchParams.get(key);
  if (primary !== null && primary !== '') return parseIntOr(primary, fallback);
  return parseIntOr(searchParams.get(legacyKey), fallback);
}

type VendorApiQuery = {
  searchValue?: string;
  confirmationRateMin?: number;
  confirmationRateMax?: number;
  performanceScoreMin?: number;
  performanceScoreMax?: number;
  riskLevel?: string;
  sortBy?: string;
  sortOrder?: VendorSortOrder;
  missingEmail?: boolean;
  vendorId?: string;
};

/** Params sent to GET /vendor (excluding limit/pageNumber). */
export function vendorFiltersToApiQuery(f: VendorFiltersState): VendorApiQuery {
  const out: VendorApiQuery = {};
  if (f.searchValue.trim()) out.searchValue = f.searchValue.trim();
  if (f.vendorId) out.vendorId = f.vendorId;
  if (f.confirmationRateMin !== 0 || f.confirmationRateMax !== 100) {
    out.confirmationRateMin = f.confirmationRateMin;
    out.confirmationRateMax = f.confirmationRateMax;
  }
  if (f.performanceScoreMin !== 0 || f.performanceScoreMax !== 100) {
    out.performanceScoreMin = f.performanceScoreMin;
    out.performanceScoreMax = f.performanceScoreMax;
  }

  const highRisk =
    f.quickPresets.includes('high-risk') || f.drawerSort.includes('high-risk');
  if (highRisk) {
    out.riskLevel = 'high';
  }

  if (f.sortBy) {
    Object.assign(out, vendorSortToApiQuery(f.sortBy, f.sortOrder));
  } else {
    const wantsTotalSpend =
      f.quickPresets.includes('high-spend') ||
      f.drawerSort.includes('high-spend') ||
      f.drawerSort.includes('top-spend');
    const wantsConfirmation =
      f.quickPresets.includes('low-confirmation-rate') ||
      f.drawerSort.includes('low-confirmation-rate');
    if (wantsTotalSpend) {
      out.sortBy = 'totalSpend';
    } else if (wantsConfirmation) {
      out.sortBy = 'confirmationRate';
    }
  }

  if (f.drawerSort.includes('missing-email')) {
    out.missingEmail = true;
  }
  return out;
}

/** URL facets use the same keys/values as GET /vendors (not internal preset ids). */
export function vendorFiltersToSearchParams(
  f: VendorFiltersState,
  page?: number,
): URLSearchParams {
  const params = new URLSearchParams();
  if (page === 1) {
    params.delete('page');
  } else {
    params.set('page', String(page));
  }
  if (f.searchValue) params.set('searchValue', f.searchValue);
  if (f.vendorId) params.set('vendorId', String(f.vendorId));
  if (f.confirmationRateMin !== 0 || f.confirmationRateMax !== 100) {
    params.set('confirmationRateMin', String(f.confirmationRateMin));
    params.set('confirmationRateMax', String(f.confirmationRateMax));
  }
  if (f.performanceScoreMin !== 0 || f.performanceScoreMax !== 100) {
    params.set('performanceScoreMin', String(f.performanceScoreMin));
    params.set('performanceScoreMax', String(f.performanceScoreMax));
  }
  const facets = vendorFiltersToApiQuery(f);
  if (facets.riskLevel) params.set('riskLevel', facets.riskLevel);
  if (f.sortBy) {
    params.set('sortBy', f.sortBy);
    params.set('sortOrder', f.sortOrder === 'DESC' ? 'DESC' : 'ASC');
  } else if (facets.sortBy) {
    params.set('sortBy', facets.sortBy);
  }
  if (facets.missingEmail === true) params.set('missingEmail', 'true');
  return params;
}

export function searchParamsToVendorFilters(
  searchParams: URLSearchParams,
): VendorFiltersState {
  const base = {
    searchValue: searchParams.get('searchValue') ?? '',
    confirmationRateMin: parseSliderFromSearchParams(
      searchParams,
      'confirmationRateMin',
      'crMin',
      0,
    ),
    vendorId: searchParams.get('vendorId') ?? '',
    confirmationRateMax: parseSliderFromSearchParams(
      searchParams,
      'confirmationRateMax',
      'crMax',
      100,
    ),
    performanceScoreMin: parseSliderFromSearchParams(
      searchParams,
      'performanceScoreMin',
      'psMin',
      0,
    ),
    performanceScoreMax: parseSliderFromSearchParams(
      searchParams,
      'performanceScoreMax',
      'psMax',
      100,
    ),
  };

  const quickPresets: string[] = [];
  let drawerSort: string[] = [];

  const sortByRaw = searchParams.get('sortBy') ?? '';
  const sortBy = isVendorSortField(sortByRaw) ? sortByRaw : '';
  const sortOrder = sortBy
    ? normalizeVendorSortOrder(searchParams.get('sortOrder') ?? '') || 'ASC'
    : '';

  const riskLevelParam = searchParams.get('riskLevel');
  if (riskLevelParam === 'high') {
    quickPresets.push('high-risk');
    drawerSort.push('high-risk');
  }

  if (sortBy === 'confirmationRate') {
    quickPresets.push('low-confirmation-rate');
    drawerSort.push('low-confirmation-rate');
  } else if (sortBy === 'totalSpend') {
    quickPresets.push('high-spend');
    drawerSort.push('high-spend');
  }

  drawerSort = drawerSort.map((id) => (id === 'top-spend' ? 'high-spend' : id));
  drawerSort = [...new Set(drawerSort)];

  const missingEmailParam = searchParams.get('missingEmail');
  if (
    missingEmailParam === 'true' ||
    missingEmailParam === '1' ||
    missingEmailParam === 'yes'
  ) {
    drawerSort.push('missing-email');
  }

  return {
    ...base,
    quickPresets: [...new Set(quickPresets)],
    drawerSort: [...new Set(drawerSort)],
    sortBy,
    sortOrder,
  };
}

export function vendorSliderIsDefault(f: VendorFiltersState): boolean {
  return (
    f.confirmationRateMin === 0 &&
    f.confirmationRateMax === 100 &&
    f.performanceScoreMin === 0 &&
    f.performanceScoreMax === 100
  );
}

/** Presets or sliders only (search does not toggle quick bar vs chips, like PO). */
export function hasVendorFilterSelection(f: VendorFiltersState): boolean {
  return (
    f.quickPresets.length > 0 ||
    f.drawerSort.length > 0 ||
    !vendorSliderIsDefault(f)
  );
}

export function hasVendorSearchOrFilters(f: VendorFiltersState): boolean {
  return (
    Boolean(f.searchValue.trim()) ||
    hasVendorFilterSelection(f) ||
    Boolean(f.sortBy)
  );
}

export function getPresetLabel(id: string): string {
  return VENDOR_PRESET_META[id]?.label ?? id;
}

export function getPresetShortLabel(id: string): string {
  return VENDOR_PRESET_META[id]?.shortLabel ?? id;
}

export function activeVendorDrawerCount(f: VendorFiltersState): number {
  let n = f.drawerSort.length;
  if (
    f.confirmationRateMin !== 0 ||
    f.confirmationRateMax !== 100 ||
    f.performanceScoreMin !== 0 ||
    f.performanceScoreMax !== 100
  ) {
    n += 1;
  }
  return n;
}
