import { BookUserIcon, MailIcon, PhoneIcon, UserRound } from 'lucide-react';
import { DetailsContentWrapper } from '../DetailsContentWrapper';

const vendorInformationDetails = [
  {
    title: 'Vendor',
    Icon: BookUserIcon,
    value: 'ABC Supplier Ltd.',
  },
  {
    title: 'Email Address',
    Icon: MailIcon,
    value: 'abcsupplier@gmail.com',
  },
  {
    title: 'Alternate Contact',
    Icon: PhoneIcon,
    value: '009445612',
  },
];

export const VendorInformation = () => {
  return (
    <DetailsContentWrapper title="Vendor Information" Icon={UserRound}>
      <div>
        {vendorInformationDetails.map(({ title, Icon, value }) => (
          <div className="flex items-start gap-3 pt-2 pb-5" key={value}>
            <Icon size={20} className="text-background-secondary" />
            <div className="space-y-2">
              <div className="leading-none text-muted-foreground">{title}</div>
              <div className="font-medium">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </DetailsContentWrapper>
  );
};
