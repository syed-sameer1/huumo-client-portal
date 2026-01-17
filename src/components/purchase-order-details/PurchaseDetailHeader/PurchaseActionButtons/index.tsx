import { Button } from '@/components/ui/button';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

export const SendFollowUpButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-md  h-10 bg-background-secondary w-37.5 text-[14px]">
          Send Follow-Up
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
