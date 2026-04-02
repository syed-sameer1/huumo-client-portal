import { GradientRingSpinner } from '@/components/gradient-loader';
import { cn } from '@/lib/utils';

export const LoadingSkeleton = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-20 h-full pt-20',
        className,
      )}
    >
      <GradientRingSpinner />
      <span className="text-lg font-semibold">{text}</span>
    </div>
  );
};
