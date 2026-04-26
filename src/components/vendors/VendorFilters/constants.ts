export type VendorFiltersState = {
  /** Same URL key as purchase orders (`searchValue`). */
  searchValue: string;
  confirmationRateMin: number;
  confirmationRateMax: number;
  performanceScoreMin: number;
  performanceScoreMax: number;
  /** Preset keys, multi-select; synced between quick bar and drawer */
  presets: string[];
};

export const DEFAULT_VENDOR_FILTERS: VendorFiltersState = {
  searchValue: '',
  confirmationRateMin: 0,
  confirmationRateMax: 100,
  performanceScoreMin: 0,
  performanceScoreMax: 100,
  presets: [],
};

export const VENDOR_PRESET_IDS = [
  'high-risk',
  'low-confirmation-rate',
  'low-performance',
  'missing-email',
  'high-spend',
] as const;

export type VendorPresetId = (typeof VENDOR_PRESET_IDS)[number];

export const VENDOR_PRESET_META: Record<
  string,
  { label: string; shortLabel: string; drawerCount?: number }
> = {
  'high-risk': {
    label: 'High Risk Vendors',
    shortLabel: 'High Risk',
    drawerCount: 8,
  },
  'low-confirmation-rate': {
    label: 'Low Confirmation Rate',
    shortLabel: 'Low Confirmation Rate',
  },
  'low-performance': {
    label: 'Low Performance',
    shortLabel: 'Low Performance',
    drawerCount: 3,
  },
  'missing-email': {
    label: 'Missing Email',
    shortLabel: 'Missing Email',
    drawerCount: 8,
  },
  'high-spend': {
    label: 'Top Spend Vendors',
    shortLabel: 'High Spend',
    drawerCount: 8,
  },
};

/** Outside quick bar — subset of presets */
export const VENDOR_QUICK_PRESET_ORDER: VendorPresetId[] = [
  'high-risk',
  'low-confirmation-rate',
  'high-spend',
];

/** Drawer “Sort By” chips (all presets) */
export const VENDOR_DRAWER_PRESET_ORDER: VendorPresetId[] = [
  'high-risk',
  'low-confirmation-rate',
  'low-performance',
  'missing-email',
  'high-spend',
];

export function toggleInFilterArray(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

function parseIntOr(value: string | null, fallback: number): number {
  if (value === null || value === '') return fallback;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

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
  if (f.confirmationRateMin !== 0 || f.confirmationRateMax !== 100) {
    params.set('crMin', String(f.confirmationRateMin));
    params.set('crMax', String(f.confirmationRateMax));
  }
  if (f.performanceScoreMin !== 0 || f.performanceScoreMax !== 100) {
    params.set('psMin', String(f.performanceScoreMin));
    params.set('psMax', String(f.performanceScoreMax));
  }
  f.presets.forEach((p) => params.append('preset', p));
  return params;
}

export function searchParamsToVendorFilters(
  searchParams: URLSearchParams,
): VendorFiltersState {
  return {
    searchValue: searchParams.get('searchValue') ?? '',
    confirmationRateMin: parseIntOr(searchParams.get('crMin'), 0),
    confirmationRateMax: parseIntOr(searchParams.get('crMax'), 100),
    performanceScoreMin: parseIntOr(searchParams.get('psMin'), 0),
    performanceScoreMax: parseIntOr(searchParams.get('psMax'), 100),
    presets: searchParams.getAll('preset'),
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
  return f.presets.length > 0 || !vendorSliderIsDefault(f);
}

export function hasVendorSearchOrFilters(f: VendorFiltersState): boolean {
  return Boolean(f.searchValue.trim()) || hasVendorFilterSelection(f);
}

export function getPresetLabel(id: string): string {
  return VENDOR_PRESET_META[id]?.label ?? id;
}

export function getPresetShortLabel(id: string): string {
  return VENDOR_PRESET_META[id]?.shortLabel ?? id;
}

export function activeVendorDrawerCount(f: VendorFiltersState): number {
  let n = f.presets.length;
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

/** Params sent to GET /vendor (excluding limit/pageNumber). */
export function vendorFiltersToApiQuery(f: VendorFiltersState) {
  const out: {
    searchValue?: string;
    confirmationRateMin?: number;
    confirmationRateMax?: number;
    performanceScoreMin?: number;
    performanceScoreMax?: number;
    presets?: string[];
  } = {};
  if (f.searchValue.trim()) out.searchValue = f.searchValue.trim();
  if (f.confirmationRateMin !== 0 || f.confirmationRateMax !== 100) {
    out.confirmationRateMin = f.confirmationRateMin;
    out.confirmationRateMax = f.confirmationRateMax;
  }
  if (f.performanceScoreMin !== 0 || f.performanceScoreMax !== 100) {
    out.performanceScoreMin = f.performanceScoreMin;
    out.performanceScoreMax = f.performanceScoreMax;
  }
  if (f.presets.length > 0) out.presets = f.presets;
  return out;
}
