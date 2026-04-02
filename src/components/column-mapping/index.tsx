'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import { ColumnContainer } from './ColumnContainer';
import { ColumnMappingHeader } from './ColumnMappingHeader';
import { ColumnMappingTable } from './ColumnMappingTable';

export const ColumnMapping = () => {
  const [headerIncluded, setHeaderIncluded] = useState(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ColumnContainer>
        <ColumnMappingHeader
          headerIncluded={headerIncluded}
          onHeaderIncludedChange={setHeaderIncluded}
        />
        <ColumnMappingTable headerIncluded={headerIncluded} />
      </ColumnContainer>
    </Suspense>
  );
};
