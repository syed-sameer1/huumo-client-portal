'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { RolesFilters, type RolesFiltersState } from '../RolesFilters';
import { RolesTable } from '../RolesTable';
import { EmptyScreen } from '@/components/empty-screen';
import { useRolesUsersData } from '@/hooks/client';
import { RolesSkeleton } from './RolesSkeleton';
import {
  hasRolesSearchOrFilters,
  rolesFiltersToSearchParams,
  searchParamsToRolesFilters,
} from '../RolesFilters/constants';

export const RolesSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => searchParamsToRolesFilters(searchParams),
    [searchParams],
  );

  const page = useMemo(() => {
    const raw = searchParams.get('page');
    const n = raw ? Number.parseInt(raw, 10) : 1;
    return Number.isFinite(n) && n >= 1 ? n : 1;
  }, [searchParams]);

  const setRolesFilters = useCallback(
    (next: RolesFiltersState) => {
      const p = rolesFiltersToSearchParams(next, 1);
      router.replace(`${pathname}?${p.toString()}`, { scroll: false });
    },
    [router, pathname],
  );

  const handlePageChange = useCallback(
    (pageIndex: number) => {
      const p = rolesFiltersToSearchParams(filters, pageIndex + 1);
      router.push(`${pathname}?${p.toString()}`, { scroll: true });
    },
    [filters, pathname, router],
  );

  const { data, isLoading, isFetching } = useRolesUsersData(page, filters);
  const hasFilters = hasRolesSearchOrFilters(filters);
  const isEmptyUnfiltered = !data?.users.length && !hasFilters && !isLoading;

  if (isLoading) return <RolesSkeleton />;

  if (isEmptyUnfiltered) {
    return (
      <EmptyScreen
        title="No Roles Right Now"
        description="You have nothing on your list yet."
        subDescription="Add new role"
      />
    );
  }

  return (
    <div className="space-y-6">
      <RolesFilters filters={filters} onFiltersChange={setRolesFilters} />
      <RolesTable
        filters={filters}
        pageIndex={page - 1}
        onPageChange={handlePageChange}
        users={data?.users ?? []}
        totalUsers={data?.totalUsers ?? 0}
        isFetching={isFetching}
      />
    </div>
  );
};
