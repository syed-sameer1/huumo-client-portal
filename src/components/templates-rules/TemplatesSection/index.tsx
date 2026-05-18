'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { TemplatesTable } from './TemplatesTable';
import { acknowledgementTemplatesMock, overdueTemplatesMock } from './mockData';
import type { TemplateRow } from './types';

function filterTemplates(rows: TemplateRow[], q: string): TemplateRow[] {
  const s = q.trim().toLowerCase();
  if (!s) return rows;
  return rows.filter((r) =>
    [r.template, r.type, r.followUpFrequency, r.lastUpdated].some((field) =>
      field.toLowerCase().includes(s),
    ),
  );
}

export const TemplatesSection = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('searchValue') ?? '';

  const acknowledgementFiltered = useMemo(
    () => filterTemplates(acknowledgementTemplatesMock, searchValue),
    [searchValue],
  );
  const overdueFiltered = useMemo(
    () => filterTemplates(overdueTemplatesMock, searchValue),
    [searchValue],
  );

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Acknowledgement templates</h2>
        <TemplatesTable data={acknowledgementFiltered} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Overdue templates</h2>
        <TemplatesTable data={overdueFiltered} />
      </section>
    </div>
  );
};
