import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { POOptionsCardProps } from './types';

export const POOptionsCard = ({
  purchaseOption,
  selectedPurchaseOption,
  onSelectPurchaseOption,
}: POOptionsCardProps) => {
  const { image, title, id } = purchaseOption;
  return (
    <Button
      variant="ghost"
      onClick={() => onSelectPurchaseOption(id)}
      className={`px-3 py-4 border rounded-2xl ${selectedPurchaseOption === id ? 'border-accent-foreground' : 'border-[#E4E4E7]'}  h-35 items-center flex flex-col justify-center gap-3`}
    >
      <Image src={`/images/${image}`} width={45} height={45} alt={title} />
      <div className="text-[14px] font-medium text-foreground">{title}</div>
    </Button>
  );
};
