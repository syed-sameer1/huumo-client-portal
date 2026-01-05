export const mockData = [
  {
    filterName: 'po-search',
    type: 'search',
    description: '',
    placeholder: 'Search by PO number, vendor, or by email',
    options: [],
  },
  {
    filterName: 'order-date',
    type: 'date',
    description: 'when PO was created',
    placeholder: '',
    title: 'Order Date',
    options: [],
  },
  {
    filterName: 'due-date',
    type: 'date',
    description: 'when vendor is expected to deliver',
    placeholder: '',
    title: 'Due Date',
    options: [],
  },
  {
    filterName: 'status',
    type: 'multiselect',
    placeholder: 'Select status',
    options: [
      {
        label: 'All',
        value: 'all',
        quantity: 45,
      },
      {
        label: 'Acknowledge',
        value: 'acknowledge',
        quantity: 5,
      },
      {
        label: 'Review',
        value: 'review',
        quantity: 5,
      },
      {
        label: 'Open Follow-Ups',
        value: 'follow-up',
        quantity: 15,
      },
      {
        label: 'Escalated',
        value: 'escalated',
        quantity: 20,
      },
      {
        label: 'Overdue',
        value: 'overdue',
        quantity: 5,
      },
      {
        label: 'Missing Vendor Info',
        value: 'missing-vendor',
        quantity: 10,
      },
      {
        label: 'Closed',
        value: 'closed',
        quantity: 30,
      },
    ],
  },
];
