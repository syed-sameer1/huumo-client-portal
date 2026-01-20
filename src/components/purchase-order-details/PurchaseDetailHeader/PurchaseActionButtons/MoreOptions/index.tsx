import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';

export const MoreOptions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-49 mr-4 mt-5">
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
