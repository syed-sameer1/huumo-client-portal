import { cn } from '@/lib/utils';

const SPINNER_GREEN = '#5DAE7B';

/** Ring spinner: solid green arc fading into light/transparent (matches brand green). */
export function GradientRingSpinner({
  className,
  size = 200,
}: {
  className?: string;
  size?: number;
}) {
  const ringThickness = 10;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('animate-spin rounded-full', className)}
      style={{
        width: size,
        height: size,
        background: `conic-gradient(
          from 270deg,
          ${SPINNER_GREEN} 0deg,
          ${SPINNER_GREEN} 100deg,
          rgba(93, 174, 123, 0.35) 200deg,
          rgba(93, 174, 123, 0.06) 280deg,
          ${SPINNER_GREEN} 360deg
        )`,
        WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${ringThickness}px), #000 calc(100% - ${ringThickness}px + 0.5px))`,
        mask: `radial-gradient(farthest-side, transparent calc(100% - ${ringThickness}px), #000 calc(100% - ${ringThickness}px + 0.5px))`,
      }}
    />
  );
}
