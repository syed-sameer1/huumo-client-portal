'use client';

import { useMemo } from 'react';
import { useEmailTemplates } from '@/tanstack/templates/useEmailTemplates';
import { TemplatesTable } from './TemplatesTable';
import { TemplatesTableSkeleton } from './TemplatesTableSkeleton';
import { emailTemplateToRow } from './utils';

export const TemplatesSection = () => {
  const { data, isLoading, isError } = useEmailTemplates();
  const rows = useMemo(
    () => (data?.templates ?? []).map(emailTemplateToRow),
    [data?.templates],
  );

  if (isLoading) {
    return (
      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Acknowledgement templates</h2>
          <TemplatesTableSkeleton />
        </section>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-destructive">
          Unable to load templates. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Templates</h2>
        <TemplatesTable data={rows} />
      </section>
    </div>
  );
};
