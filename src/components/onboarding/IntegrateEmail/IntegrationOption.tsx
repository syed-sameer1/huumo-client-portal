import Image from 'next/image';
import { IntegrationOptionsProps } from './types';
import { LoadingButton } from '@/components/LoadingButton';

export const IntegrationOption = ({
  logo,
  onConnect,
  title,
  description,
  loading,
}: IntegrationOptionsProps) => {
  return (
    <div className="border p-4 space-y-2 rounded-2xl boxShadow-[0px 1px 2px 0px #0000000D]">
      <div className="flex justify-between">
        <Image
          src={`/images/integration/${logo}`}
          width={45}
          height={45}
          alt="gmail"
        />
        <LoadingButton
          className="bg-[#FAFAFA] text-accent-foreground hover:bg-transparent"
          onClick={onConnect}
          loading={loading}
        >
          Connect
        </LoadingButton>
      </div>
      <div className="text-[16px] font-medium">{title}</div>
      <div>{description}</div>
    </div>
  );
};
