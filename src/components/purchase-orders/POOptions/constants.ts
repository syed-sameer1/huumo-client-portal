export const PO_VALUES = {
  UPLOAD_CSV: 'upload-csv',
  GOOGLE_SHEET: 'google-sheet',
  ERP_INTEGRATION: 'erp-integration',
  TEXT_MANUAL: 'text-manual',
};

export const PO_OPTIONS = [
  {
    title: 'Upload CSV file',
    image: 'csv-logo.svg',
    id: PO_VALUES.UPLOAD_CSV,
  },
  {
    title: 'Import from Google Sheets',
    image: 'google-sheet-logo.svg',
    id: PO_VALUES.GOOGLE_SHEET,
  },
  {
    title: 'ERP Integration',
    image: 'erp-integration-logo.svg',
    id: PO_VALUES.ERP_INTEGRATION,
  },
  {
    title: 'Add Manually',
    image: 'text-manual-logo.svg',
    id: PO_VALUES.TEXT_MANUAL,
  },
];
