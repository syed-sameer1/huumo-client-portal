import {
  BookUserIcon,
  Box,
  ChartSpline,
  DollarSign,
  LayoutDashboardIcon,
  Settings,
  Users,
} from 'lucide-react';

export const getRoutes = () => [
  {
    label: 'Dashboard',
    href: '/dashboard',
    Icon: LayoutDashboardIcon,
  },
  {
    label: 'Purchase Orders',
    href: '/purchase-orders',
    Icon: Box,
  },
  {
    label: 'Vendors',
    href: '/vendors',
    Icon: BookUserIcon,
  },
  {
    label: 'Roles',
    href: '/roles',
    Icon: Users,
  },
  {
    label: 'Billings',
    href: '/billings',
    Icon: DollarSign,
  },
  {
    label: 'Reports & Insights',
    href: '/reports-insights',
    Icon: ChartSpline,
  },
  {
    label: 'Settings',
    href: '/settings',
    Icon: Settings,
    subRoutes: [
      {
        label: 'Integration',
        href: '/integration',
      },
      {
        label: 'Templates and Rules',
        href: '/templates-rules',
      },
      {
        label: 'Support',
        href: '/support',
      },
    ],
  },
];
