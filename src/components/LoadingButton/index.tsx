import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import clsx from 'clsx';

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
  loading?: boolean;
};

export const LoadingButton = ({
  children,
  loading = false,
  disabled,
  className,
  ...rest
}: LoadingButtonProps) => {
  return (
    <Button
      {...rest}
      disabled={loading || disabled}
      aria-busy={loading}
      className={clsx('relative h-fit', className)}
    >
      <span className={loading ? 'invisible' : 'visible'}>{children}</span>

      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      )}
    </Button>
  );
};
