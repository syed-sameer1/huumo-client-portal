export const ColumnMappingHeader = () => {
  return (
    <div className="grid grid-cols-[2fr_1fr_2fr_2fr_40px] text-sm text-secondary-foreground border-b pb-3">
      <div>Template Property</div>
      <div>Mapping</div>
      <div className="text-center">CSV Column</div>
      <div className="text-center">Sample Data</div>
      <div />
    </div>
  );
};
