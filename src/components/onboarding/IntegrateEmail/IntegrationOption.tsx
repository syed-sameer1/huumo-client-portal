import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import Image from 'next/image';

export const IntegrationOption = ({ logo, onConnect, title, description }) => {
  return (
    <div className="border p-4 space-y-2 rounded-2xl boxShadow-[0px 1px 2px 0px #0000000D]">
      <div className="flex justify-between">
        <Image
          src={`/images/integration/${logo}`}
          width={45}
          height={45}
          alt="gmail"
        />
        <Button
          className="bg-[#FAFAFA] text-accent-foreground hover:bg-transparent"
          onClick={onConnect}
        >
          Connect
        </Button>
      </div>
      <div className="text-[16px] font-medium">{title}</div>
      <div>{description}</div>
    </div>
  );
};
