import { mockData } from '../PurchaseDetailHeader/mockData';
import { PurchaseDetailCardConfig } from './contants';

export const DetailCard = ({
  details,
  id,
}: {
  details: typeof mockData;
  id: string;
}) => {
  const selectedCard =
    PurchaseDetailCardConfig[id as keyof typeof PurchaseDetailCardConfig];
  console.log({ details, id });
  const { iconColor, Icon, iconBg, title, formatter } = selectedCard;
  console.log(details, id);
  return (
    <div className="border-[#E4E4E7] rounded-[6px] p-3 flex-1 min-h-27.5 border space-y-2">
      <div
        style={{ backgroundColor: iconBg }}
        className="w-8.5 h-8.5 rounded-full flex items-center justify-center"
      >
        <Icon style={{ color: iconColor }} size={14} />
      </div>
      <div className="text-muted-foreground text-xs font-medium">{title}</div>
      <div className="text-sm font-medium">{formatter(details[id])}</div>
    </div>
  );
};
