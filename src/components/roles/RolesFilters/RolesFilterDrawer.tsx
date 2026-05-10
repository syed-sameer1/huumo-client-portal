'use client';

import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  DEFAULT_ROLES_FILTERS,
  ROLE_OPTIONS,
  STATUS_OPTIONS,
  type RoleFilterId,
  type RoleStatusFilterId,
  type RolesFiltersState,
  isFullRoleSelection,
  isFullStatusSelection,
} from './constants';

const ROLE_ROWS: { id: RoleFilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'admin', label: 'Admin' },
  { id: 'member', label: 'Member' },
];

const STATUS_ROWS: { id: RoleStatusFilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'inActive', label: 'Inactive' },
  { id: 'pending', label: 'Pending' },
];

export function RolesFilterDrawer({
  open,
  onOpenChange,
  filters,
  onApply,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: RolesFiltersState;
  onApply: (filters: RolesFiltersState) => void;
}) {
  const [draft, setDraft] = useState<RolesFiltersState>(filters);

  useEffect(() => {
    setDraft(filters);
  }, [filters]);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) setDraft(filters);
    onOpenChange(isOpen);
  };

  const toggleItem = <T,>(list: T[], item: T): T[] =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const onRolesToggle = (id: RoleFilterId) => {
    setDraft((prev) => ({
      ...prev,
      roles: toggleItem(prev.roles, id),
    }));
  };

  const onStatusToggle = (id: RoleStatusFilterId) => {
    setDraft((prev) => ({
      ...prev,
      statuses: toggleItem(prev.statuses, id),
    }));
  };

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetContent side="right" className="flex flex-col overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Filters</SheetTitle>
          <SheetDescription className="sr-only">
            Filter roles by role type and account status
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-8 py-6">
          <div className="space-y-3">
            <div className="font-semibold">Roles</div>
            <div className="space-y-3 pl-0.5">
              {ROLE_ROWS.map(({ id, label }) => {
                const checked = draft.roles.includes(id);
                return (
                  <div key={id} className="flex items-center gap-2">
                    <Checkbox
                      id={`role-${id}`}
                      checked={checked}
                      onCheckedChange={() => {
                        onRolesToggle(id);
                      }}
                      className="border-[#20A665] data-[state=checked]:bg-[#20A665] data-[state=checked]:border-[#20A665]"
                    />
                    <Label
                      htmlFor={`role-${id}`}
                      className="font-normal cursor-pointer"
                    >
                      {label}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-semibold">Status</div>
            <div className="space-y-3 pl-0.5">
              {STATUS_ROWS.map(({ id, label }) => {
                const checked = draft.statuses.includes(id);
                return (
                  <div key={id} className="flex items-center gap-2">
                    <Checkbox
                      id={`status-${id}`}
                      checked={checked}
                      onCheckedChange={() => onStatusToggle(id)}
                      className="border-[#20A665] data-[state=checked]:bg-[#20A665] data-[state=checked]:border-[#20A665]"
                    />
                    <Label
                      htmlFor={`status-${id}`}
                      className="font-normal cursor-pointer"
                    >
                      {label}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex  gap-3 border-t pt-4">
          <Button
            variant="outline"
            className="h-11 w-full"
            onClick={() => {
              onApply({
                ...DEFAULT_ROLES_FILTERS,
                searchValue: filters.searchValue,
              });
              onOpenChange(false);
            }}
          >
            Clear Filters
          </Button>
          <Button
            className="h-11 w-full bg-background-secondary hover:bg-background-secondary/90"
            onClick={() => {
              let roles = draft.roles;
              let statuses = draft.statuses;
              if (roles.includes('all') || isFullRoleSelection(roles)) {
                roles = [...ROLE_OPTIONS];
              }
              if (statuses.includes('all') || isFullStatusSelection(statuses)) {
                statuses = [...STATUS_OPTIONS];
              }
              onApply({
                ...draft,
                roles,
                statuses,
                searchValue: filters.searchValue,
              });
              onOpenChange(false);
            }}
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
