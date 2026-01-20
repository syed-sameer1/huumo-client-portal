export const inboxThreads = [
  {
    id: 'thread-1',
    date: '2025-12-28T18:45:30Z',
    subject: 'Clarification Required',
    preview:
      'Hi, we were reviewing the final PO draft and noticed that the quantity for Item B-204 (Industrial Fasteners) differs from the submitted estimate...',
    isUnread: true,
    sender: 'ABC Supplier',
    poNumber: 'PO-4582',
  },
  {
    id: 'thread-2',
    date: '2025-12-28T18:45:30Z',
    subject: 'Updated Delivery Schedule',
    preview:
      'Hello, we’ve revised the delivery schedule to accommodate the changes in your project timeline. The new plan outlines two phases...',
    isUnread: false,
    sender: 'ABC Supplier',
    poNumber: 'PO-4582',
  },
  {
    id: 'thread-3',
    date: '2025-12-28T18:45:30Z',
    subject: 'Invoice INV-2291',
    preview:
      'Good afternoon, please find attached the invoice corresponding to PO #4582. The document includes a breakdown of unit pricing...',
    isUnread: false,
    sender: 'ABC Supplier',
    poNumber: 'PO-4582',
  },
  {
    id: 'thread-4',
    date: '2025-12-28T18:45:30Z',
    subject: 'Request for Approval: Updated Vendor Terms',
    preview:
      'As discussed during our previous meeting, we’ve incorporated the new contractual adjustments—specifically around after-delivery...',
    isUnread: false,
    sender: 'ABC Supplier',
    poNumber: 'PO-4582',
  },
  {
    id: 'thread-5',
    date: '2025-12-28T18:45:30Z',
    subject: 'Shipment Update – Batch #21 Processing Completed',
    preview:
      'Hi team, this is to inform you that Batch #21 has completed final quality inspection and has been cleared for dispatch...',
    isUnread: false,
    sender: 'ABC Supplier',
    poNumber: 'PO-4582',
  },
];

// thread.ts
export const emailThread = {
  threadId: 'thread-1',
  supplierName: 'ABC Supplier',
  poNumber: 'PO-4582',
  messages: [
    {
      id: 'msg-1',
      sender: 'supplier',
      senderName: 'ABC Supplier',
      timestamp: '2025-12-28T18:45:30Z',
      content:
        'Hi, we’ve updated PO #4582 with the corrected quantities and aligned the pricing to reflect the changes. We also adjusted the expected delivery window based on our inventory review.',
    },
    {
      id: 'msg-2',
      sender: 'internal',
      senderName: 'You',
      timestamp: '2025-12-28T18:45:30Z',
      content:
        'Thanks for the quick update. I’ll review the revised PO and compare it against the internal notes. If anything looks off, I’ll highlight it and get back to you shortly. Otherwise, we should be good to proceed.',
    },
    {
      id: 'msg-3',
      sender: 'supplier',
      senderName: 'ABC Supplier',
      timestamp: '2025-12-28T18:45:30Z',
      content:
        'Great. In addition to that, we need to confirm whether you prefer a single consolidated shipment or two phased shipments. Breaking them into batches may help reduce the receiving load on your warehouse team, but it may also extend the total delivery window by a day or two.',
    },
    {
      id: 'msg-4',
      sender: 'internal',
      senderName: 'You',
      timestamp: '2025-12-28T18:45:30Z',
      content:
        'Let’s go with the phased shipments. It aligns better with our internal rollout schedule, and it’ll prevent congestion on the receiving dock.',
    },
    {
      id: 'msg-5',
      sender: 'supplier',
      senderName: 'ABC Supplier',
      timestamp: '2025-12-28T18:45:30Z',
      content:
        'Understood. We’ll finalize the phased schedule and send it over within the hour.',
    },
  ],
};
