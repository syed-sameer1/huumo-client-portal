import { OrderInformationConfig } from './orderInformationConfig';

export const OrderInformationCard = ({ id, value }) => {
  const selectedValue = value[id];
  const { title, Icon, formatter } = OrderInformationConfig[id];

  return (
    <div className="border border-[#E4E4E7] bg-[#F9F9F9] rounded-[6px] p-4">
      <div className="flex gap-2 items-start">
        <Icon className="text-[#20A665]" />
        <div className="flex flex-col gap-2">
          <div className="text-secondary-foreground leading-none">{title}</div>
          <div className="font-medium">{formatter(value)}</div>
        </div>
      </div>
    </div>
  );
};
