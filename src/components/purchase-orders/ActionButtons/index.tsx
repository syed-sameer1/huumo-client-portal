import { Button } from '@/components/ui/button';
import { routeUrls } from '@/constants/urls';
import Link from 'next/link';

export const ActionButtons = () => {
  return (
    <div className="flex gap-4 items-center">
      <Button
        className="rounded-md  h-10 bg-background-primary-light text-accent-foreground"
        size="sm"
      >
        Export Sample File
      </Button>
      <Button
        className="bg-background-secondary w-37.5 h-10 rounded-md"
        asChild
      >
        <Link href={routeUrls.selectImportMethod}>Add PO</Link>
      </Button>
    </div>
  );
};
