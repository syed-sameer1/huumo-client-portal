import { Field, FieldLabel } from '@/components/ui/field';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import {
  BadgeAlert,
  CircleCheckBig,
  Clock3,
  Mail,
  MessageSquareWarning,
  TimerReset,
} from 'lucide-react';
import { POLinkedItems } from './POLinkedItems';
import { VendorDetailsSkeleton } from './VendorDetailsSkeleton';
import { useVendorDetails } from '@/hooks/vendors';
import { VendorDetailsType } from '@/types/vendors';
import { Button } from '@/components/ui/button';
import { routeUrls } from '@/constants/urls';
import { useRouter } from 'next/navigation';

const responsiveness = [
  {
    title: 'Responsiveness',
    sections: [
      {
        id: 'confirmationRate',
        Icon: CircleCheckBig,
        description: 'Confirmation Rate',
      },
      {
        id: 'avgResponseTime',
        Icon: Clock3,
        description: 'Avg Response Time',
      },
    ],
  },
  {
    title: 'Automation Activity',
    sections: [
      {
        id: 'totalFollowupsSent',
        Icon: Mail,
        description: 'Follow-up Emails',
      },
      {
        id: 'escalationMessages',
        Icon: MessageSquareWarning,
        description: 'Escalation Messages',
      },
    ],
  },
  {
    title: 'Risk',
    sections: [
      {
        id: 'overduePOs',
        Icon: TimerReset,
        description: 'Overdue PO',
      },
      {
        id: 'riskLevel',
        Icon: BadgeAlert,
        description: 'Risk Level',
      },
    ],
  },
];

export const VendorDetails = ({
  open,
  handleClose,
  vendorId,
}: {
  open: boolean;
  handleClose: () => void;
  vendorId: number | null;
}) => {
  const { data, isPending } = useVendorDetails(vendorId!);
  const router = useRouter();
  const vendor = data?.vendor;
  const poItems = data?.vendor?.latestPurchaseOrders;

  if (!vendorId) return null;

  const getVendorDetailsValue = (id: keyof VendorDetailsType) => {
    const idValue = vendor?.[id];
    if (idValue === undefined) return '-';
    if (id === 'confirmationRate') return vendor?.confirmationRate + '%';
    if (id === 'avgResponseTime') return vendor?.avgResponseTime + ' days';
    if (id === 'followUpEmails') return vendor?.followUpEmails + ' emails';
    if (id === 'escalationMessages')
      return vendor?.escalationMessages + ' messages';
    if (id === 'overduePOs') return vendor?.overduePOs;
    if (id === 'riskLevel') return vendor?.riskLevel;
    if (id === 'totalFollowupsSent') return vendor?.totalFollowupsSent;
  };

  const handleViewAll = () => {
    if (!vendor) return;
    router.push(`${routeUrls.purchaseOrdersRoute}?vendorId=${vendor.id}`);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="min-w-146 h-screen rounded-none px-5 pb-8 overflow-auto"
      >
        <SheetHeader className="flex flex-row items-center justify-between mb-0">
          <SheetTitle className="mb-0 text-[24px] font-semibold">
            Vendor Details
          </SheetTitle>
        </SheetHeader>
        {isPending ? (
          <VendorDetailsSkeleton />
        ) : vendor ? (
          <div className="py-4 space-y-6 overflow-y-auto">
            <Field orientation="horizontal" className="w-fit">
              <Switch id="automation" />
              <FieldLabel htmlFor="automation" className="text-[16px]">
                Automation
              </FieldLabel>
            </Field>
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="font-semibold text-[16px]">{vendor?.name}</div>
                <div>{vendor?.email ? vendor?.email : '-'}</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-[16px]">
                  $ {vendor?.totalSpend}
                </div>
                <div>Total Spend</div>
              </div>
            </div>
            <div className="space-y-4">
              {responsiveness.map(({ title, sections }) => (
                <div key={title} className="space-y-2">
                  <div className="text-secondary-foreground">{title}</div>
                  <div className="flex">
                    {sections.map(({ description, Icon, id }) => {
                      const value = getVendorDetailsValue(
                        id as keyof VendorDetailsType,
                      );
                      return (
                        <div
                          key={value}
                          className="b-[#E4E4E7] border p-3 space-y-1 rounded-[6px] flex-1"
                        >
                          <Icon className="text-[#20A665]" size={20} />
                          <div className="text-[16px] font-semibold capitalize">
                            {value}
                          </div>
                          <div>{description}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-[18px] font-semibold">
                  POs linked to vendor
                </div>
                {!!poItems?.length && (
                  <Button
                    variant="ghost"
                    onClick={handleViewAll}
                    className="text-[#20A665] text-[14px]"
                  >
                    View All
                  </Button>
                )}
              </div>
              <POLinkedItems vendorId={vendorId} />
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};
