import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

export const SendFollowUpButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-md  h-10 bg-background-secondary w-37.5 text-[14px]">
          Send Follow-Up
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-49 mr-4">
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-secondary-foreground text-sm py-1.5 h-8.25">
            Review
          </DropdownMenuItem>
          <DropdownMenuItem className="text-secondary-foreground text-sm py-1.5 h-8.25">
            Edit PO Details
          </DropdownMenuItem>
          <DropdownMenuItem className="text-secondary-foreground text-sm py-1.5 h-8.25">
            Send manual Follow-up
          </DropdownMenuItem>
          <DropdownMenuItem className="text-secondary-foreground text-sm py-1.5 h-8.25">
            Mark as Escalated
          </DropdownMenuItem>
          <DropdownMenuItem className="text-secondary-foreground text-sm py-1.5 h-8.25">
            Mark as Closed
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
