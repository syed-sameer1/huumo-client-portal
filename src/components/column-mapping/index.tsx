'use client';

import { Suspense } from 'react';
import { ColumnContainer } from './ColumnContainer';
import { ColumnMappingHeader } from './ColumnMappingHeader';
import { ColumnMappingTable } from './ColumnMappingTable';

export const ColumnMapping = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ColumnContainer>
        <ColumnMappingHeader />
        <ColumnMappingTable />
      </ColumnContainer>
    </Suspense>
  );
};
