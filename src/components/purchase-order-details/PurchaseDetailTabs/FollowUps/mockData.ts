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
    status: 'scheduled',
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
    status: 'sent',
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
    status: 'scheduled',
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
    status: 'scheduled',
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
    status: 'scheduled',
  },
];

// thread.ts
export const emailThread = {
  threadId: 'thread-1',
  supplierName: 'ABC Supplier',
  poNumber: 'PO-4582',
  subject: 'Follow-up on Purchase Order #PO-0019',
  id: 'msg-1',
  sender: 'supplier',
  senderName: 'ABC Supplier',
  timestamp: '2025-12-28T18:45:30Z',
  scheduledDate: '2025-12-28T18:45:30Z',
  content: `<p>Dear <strong>ABC Suppliers,</strong></p>

<p>
  I hope this email finds you well.
</p>

<p>
  I am writing to follow up on the status of Purchase Order #PO-0019, which was
  placed on <strong>12-09-2025</strong>. As we approach the due date of
  09-11-2025, I would like to kindly request an update regarding the progress of
  the order. Understanding that these things can sometimes experience delays,
  we want to ensure that everything is proceeding as expected.
</p>

<p>
  Could you please confirm if there have been any changes or delays that may
  impact the delivery? If there are any challenges on your side, please do let
  us know so that we can address them promptly. Additionally, if you require any
  further information from our end to assist with processing or shipping, don’t
  hesitate to reach out.
</p>

<p>
  We highly appreciate your cooperation and look forward to receiving your
  update soon. Timely delivery is crucial for our planning, and we value your
  support in helping us meet our operational deadlines.
</p>

<p>
  Thank you in advance for your attention to this matter. We look forward to
  hearing from you.
</p>

<p>
  Best regards,<br />
  <strong>Nividia Corp.</strong>
</p>
`,
};
