import type { User } from '@/service/users';

export type RoleFilterId = 'all' | 'admin' | 'member';
export type RoleStatusFilterId = 'all' | 'active' | 'inActive' | 'pending';

export type RolesFiltersState = {
  searchValue: string;
  roles: RoleFilterId[];
  statuses: RoleStatusFilterId[];
};

export const DEFAULT_ROLES_FILTERS: RolesFiltersState = {
  searchValue: '',
  roles: [],
  statuses: [],
};

export const ROLE_OPTIONS: RoleFilterId[] = ['admin', 'member'];
export const STATUS_OPTIONS: RoleStatusFilterId[] = [
  'active',
  'inActive',
  'pending',
];

export function isFullRoleSelection(roles: RoleFilterId[]): boolean {
  return (
    roles.length === ROLE_OPTIONS.length &&
    ROLE_OPTIONS.every((r) => roles.includes(r))
  );
}

export function isFullStatusSelection(statuses: RoleStatusFilterId[]): boolean {
  return (
    statuses.length === STATUS_OPTIONS.length &&
    STATUS_OPTIONS.every((s) => statuses.includes(s))
  );
}

function rolesStateToApiRoles(roles: RoleFilterId[]): string[] | undefined {
  if (roles.length === 0) return undefined;
  if (roles.includes('all') || isFullRoleSelection(roles)) {
    return [...ROLE_OPTIONS];
  }
  const specific = roles.filter(
    (r): r is 'admin' | 'member' => r === 'admin' || r === 'member',
  );
  if (specific.length === 0) return undefined;
  return specific;
}

function statusesStateToApiStatuses(
  statuses: RoleStatusFilterId[],
): string[] | undefined {
  if (statuses.length === 0) return undefined;
  if (statuses.includes('all') || isFullStatusSelection(statuses)) {
    return [...STATUS_OPTIONS];
  }
  const specific = statuses.filter(
    (s): s is Exclude<RoleStatusFilterId, 'all'> => s !== 'all',
  );
  if (specific.length === 0) return undefined;
  return specific;
}

/** Query params for GET /user (matches URL param names). Full/"all" role or status still sends every value to the API. */
export function rolesFiltersToApiParams(f: RolesFiltersState): {
  searchValue?: string;
  role?: string[];
  status?: string[];
} {
  const q = f.searchValue.trim();
  const out: { searchValue?: string; role?: string[]; status?: string[] } = {};
  if (q) out.searchValue = q;
  const roleForApi = rolesStateToApiRoles(f.roles);
  if (roleForApi) out.role = roleForApi;
  const statusForApi = statusesStateToApiStatuses(f.statuses);
  if (statusForApi) out.status = statusForApi;
  return out;
}

export function getUserStatusCategory(user: User): RoleStatusFilterId {
  const s = (user.status ?? '').toLowerCase();
  if (s === 'active') return 'active';
  if (s === 'inactive') return 'inActive';
  return 'pending';
}

export function applyRolesFilters(users: User[], f: RolesFiltersState): User[] {
  const q = f.searchValue.trim().toLowerCase();
  const roleEff =
    f.roles.length > 0 && !isFullRoleSelection(f.roles) ? f.roles : null;
  const statusEff =
    f.statuses.length > 0 && !isFullStatusSelection(f.statuses)
      ? f.statuses
      : null;

  return users.filter((u) => {
    if (q) {
      const name = (u.name ?? '').toLowerCase();
      const email = (u.email ?? '').toLowerCase();
      if (!name.includes(q) && !email.includes(q)) return false;
    }
    if (roleEff) {
      const role = (u.role ?? '').toLowerCase();
      if (!roleEff.some((r) => r === role)) return false;
    }
    if (statusEff) {
      if (!statusEff.includes(getUserStatusCategory(u))) return false;
    }
    return true;
  });
}

export function activeRolesDrawerCount(f: RolesFiltersState): number {
  let n = 0;
  if (f.roles.length > 0 && !isFullRoleSelection(f.roles)) {
    n += f.roles.length;
  }
  if (f.statuses.length > 0 && !isFullStatusSelection(f.statuses)) {
    n += f.statuses.length;
  }
  return n;
}

export function hasRolesDrawerSelection(f: RolesFiltersState): boolean {
  return activeRolesDrawerCount(f) > 0;
}

export function hasRolesSearchOrFilters(f: RolesFiltersState): boolean {
  return Boolean(f.searchValue.trim()) || hasRolesDrawerSelection(f);
}

function parseRoleParam(v: string): RoleFilterId | null {
  const x = v.toLowerCase();
  if (x === 'admin' || x === 'member') return x;
  return null;
}

function parseStatusParam(v: string): RoleStatusFilterId | null {
  const x = v.toLowerCase();
  if (x === 'active') return 'active';
  if (x === 'inactive') return 'inActive';
  if (x === 'pending') return 'pending';
  return null;
}

export function rolesFiltersToSearchParams(
  f: RolesFiltersState,
  page?: number,
): URLSearchParams {
  const params = new URLSearchParams();
  if (page === undefined || page === 1) {
    params.delete('page');
  } else {
    params.set('page', String(page));
  }
  if (f.searchValue.trim()) params.set('searchValue', f.searchValue.trim());
  f.roles.forEach((r) => {
    if (r !== 'all') {
      params.append('role', r);
    } else {
      params.delete('role');
      params.append('role', 'admin');
      params.append('role', 'member');
    }
  });
  f.statuses.forEach((s) => {
    if (s !== 'all') {
      params.append('status', s);
    } else {
      params.delete('status');
      params.append('status', 'active');
      params.append('status', 'inActive');
      params.append('status', 'pending');
    }
  });
  return params;
}

export function searchParamsToRolesFilters(
  searchParams: URLSearchParams,
): RolesFiltersState {
  const roles = searchParams
    .getAll('role')
    .map(parseRoleParam)
    .filter((r): r is RoleFilterId => r !== null);
  const statuses = searchParams
    .getAll('status')
    .map(parseStatusParam)
    .filter((s): s is RoleStatusFilterId => s !== null);

  const uniqRoles = [...new Set(roles)];
  const uniqStatuses = [...new Set(statuses)];
  return {
    searchValue: searchParams.get('searchValue') ?? '',
    roles: uniqRoles,
    statuses: uniqStatuses,
  };
}
