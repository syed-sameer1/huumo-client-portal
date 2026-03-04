'use client';

import { TemplatesTable } from './TemplatesTable';
import { acknowledgementTemplatesMock, overdueTemplatesMock } from './mockData';

export const TemplatesSection = () => {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Acknowledgement templates</h2>
        <TemplatesTable data={acknowledgementTemplatesMock} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Overdue templates</h2>
        <TemplatesTable data={overdueTemplatesMock} />
      </section>
    </div>
  );
};
