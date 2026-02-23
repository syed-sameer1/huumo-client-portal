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
import Link from 'next/link';
import { POLinkedItems } from './POLinkedItems';
import { useVendorDetails } from '@/hooks/vendors';

const responsiveness = [
  {
    title: 'Responsiveness',
    sections: [
      {
        value: '20%',
        Icon: CircleCheckBig,
        description: 'Confirmation Rate',
      },
      {
        value: '2 days',
        Icon: Clock3,
        description: 'Avg Response Time',
      },
    ],
  },
  {
    title: 'Automation Activity',
    sections: [
      {
        value: '12',
        Icon: Mail,
        description: 'Follow-up Emails',
      },
      {
        value: '32',
        Icon: MessageSquareWarning,
        description: 'Escalation Messages',
      },
    ],
  },
  {
    title: 'Risk',
    sections: [
      {
        value: '67  ',
        Icon: TimerReset,
        description: 'Overdue PO',
      },
      {
        value: 'High',
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
  console.log({ data, isPending });

  const vendor = data?.vendor;

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
          <div>Loading..</div>
        ) : (
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
                <div className="font-semibold text-[16px]">$450</div>
                <div>Total Spend</div>
              </div>
            </div>
            <div className="space-y-4">
              {responsiveness.map(({ title, sections }) => (
                <div key={title} className="space-y-2">
                  <div className="text-secondary-foreground">{title}</div>
                  <div className="flex">
                    {sections.map(({ description, Icon, value }) => (
                      <div
                        key={value}
                        className="b-[#E4E4E7] border p-3 space-y-1 rounded-[6px] flex-1"
                      >
                        <Icon className="text-[#20A665]" size={20} />
                        <div className="text-[16px] font-semibold">{value}</div>
                        <div>{description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-[18px] font-semibold">
                  POs linked to vendor
                </div>
                <Link href="#" className="text-[#20A665] text-[14px]">
                  View All
                </Link>
              </div>
              <POLinkedItems />
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
