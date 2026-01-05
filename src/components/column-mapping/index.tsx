import { ColumnContainer } from './ColumnContainer';
import { ColumnMappingHeader } from './ColumnMappingHeader';
import { ColumnMappingTable } from './ColumnMappingTable';

export const ColumnMapping = () => {
  return (
    <ColumnContainer>
      <ColumnMappingHeader />
      <ColumnMappingTable />
    </ColumnContainer>
  );
};
