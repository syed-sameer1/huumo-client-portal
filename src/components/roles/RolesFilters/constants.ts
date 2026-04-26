import type { User } from '@/service/users';

export type RoleFilterId = 'all' | 'admin' | 'member';
export type RoleStatusFilterId = 'invitation' | 'access' | 'deactivated';

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

const ROLE_OPTIONS: RoleFilterId[] = ['admin', 'member'];
const STATUS_OPTIONS: RoleStatusFilterId[] = [
  'invitation',
  'access',
  'deactivated',
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

/** True when we must load all pages and filter in memory (API has no filter params). */
export function needsRolesClientAggregation(f: RolesFiltersState): boolean {
  const q = f.searchValue.trim();
  const roleEff =
    f.roles.length > 0 && !isFullRoleSelection(f.roles) ? f.roles : [];
  const statusEff =
    f.statuses.length > 0 && !isFullStatusSelection(f.statuses)
      ? f.statuses
      : [];
  return Boolean(q) || roleEff.length > 0 || statusEff.length > 0;
}

export function getUserStatusCategory(user: User): RoleStatusFilterId {
  const s = (user.status ?? '').toLowerCase();
  if (s === 'active') return 'access';
  if (s === 'inactive') return 'deactivated';
  return 'invitation';
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
  if (x === 'invitation' || x === 'access' || x === 'deactivated') return x;
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
  f.roles.forEach((r) => params.append('role', r));
  f.statuses.forEach((s) => params.append('status', s));
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
