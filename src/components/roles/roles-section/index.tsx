'use client';

import { RolesFilters } from '../RolesFilters';
import { RolesTable } from '../RolesTable';
import { EmptyScreen } from '@/components/empty-screen';
import { useUsersData } from '@/hooks/client';
import { RolesSkeleton } from './RolesSkeleton';

export const RolesSection = () => {
  const { data, isLoading } = useUsersData(1);
  const isEmpty = !data?.users.length;

  if (isLoading) return <RolesSkeleton />;

  if (isEmpty) {
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
      <RolesFilters />
      <RolesTable />
    </div>
  );
};
