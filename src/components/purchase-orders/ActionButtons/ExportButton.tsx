import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ExporetButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-md  h-10 bg-background-primary-light text-accent-foreground"
          size="sm"
        >
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-49" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-secondary-foreground text-sm py-1.5 h-8.25">
            Export Sample File
          </DropdownMenuItem>
          <DropdownMenuItem className="text-secondary-foreground text-sm py-1.5 h-8.25">
            Export PO data as CSV
          </DropdownMenuItem>
          <DropdownMenuItem className="text-secondary-foreground text-sm py-1.5 h-8.25">
            Export PO data as PDF
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
