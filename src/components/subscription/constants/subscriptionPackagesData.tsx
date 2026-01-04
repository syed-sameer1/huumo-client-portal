export const subscriptionPackagesData = [
  {
    id: 1,
    packageTitle: 'Lite',
    description: 'Access basic features with limited usage.',
    benefits: [
      {
        id: 1,
        title: '1 Sub-user',
        description: 'Perfect for a single user.',
      },
      {
        id: 2,
        title: '200 POs/month',
        description: 'Ideal for small operations.',
      },
      {
        id: 3,
        title: 'CSV Import Only',
        description: 'Simple, manual data upload',
      },
    ],
    isRecommended: false,
    hasPrice: true,
    price: '17.99',
    actionLabel: 'Start Free Trial',
  },
  {
    id: 2,
    packageTitle: 'Pro',
    description: 'Access basic features with limited usage.',
    benefits: [
      {
        id: 4,
        title: '3 Sub-user',
        description: 'Perfect for small company.',
      },
      {
        id: 5,
        title: '2000 POs/month',
        description: 'Ideal for small operations.',
      },
      {
        id: 6,
        title: 'CSV Import & Google Sheet Link',
        description: 'Simple, streamlined work',
      },
    ],
    isRecommended: true,
    hasPrice: true,
    price: '17.99',
    actionLabel: 'Start Free Trial',
  },
  {
    id: 3,
    packageTitle: 'Enterprise',
    description: 'Access basic features with limited usage.',
    benefits: [
      {
        id: 8,
        title: 'Multiple Sub-user',
        description: 'Perfect for big organizations.',
      },
      {
        id: 9,
        title: 'Unlimited POs/month',
        description: 'Smooth operations',
      },
      {
        id: 10,
        title: 'CSV Import, Google Sheet Link & ERP',
        description: 'Faster Integrations',
      },
    ],
    isRecommended: false,
    hasPrice: false,
    actionLabel: 'Book Demo',
  },
];
