import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FollowUpStatusChipConfig } from '../../constants/followUpStatusChip';
import { Badge } from '@/components/ui/badge';

type FollowUpStatusKey = keyof typeof FollowUpStatusChipConfig;

export const FollowUpThreadCard = ({
  message,
  selectedMessage,
  onSetSelectedMessage,
}: {
  message: any;
  selectedMessage: any;
  onSetSelectedMessage: any;
}) => {
  const { date, subject, preview, id, status } = message;
  const { label, bgColor } =
    FollowUpStatusChipConfig[status as FollowUpStatusKey];
  return (
    <Button
      onClick={() => onSetSelectedMessage(message.id)}
      variant="ghost"
      className={cn(
        'w-full border rounded-md p-2 py-3 h-fit flex flex-col items-start gap-1 text-left',
        selectedMessage === id && 'bg-muted',
      )}
    >
      <div className="flex justify-between w-full">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">{date}</div>
          <div className="font-medium text-accent-foreground text-xs">
            {subject}
          </div>
        </div>

        <Badge
          style={{ backgroundColor: bgColor }}
          className="rounded-[583px] font-normal px-3 py-1.5 h-7"
        >
          {label}
        </Badge>
      </div>

      <div className="text-muted-foreground line-clamp-2 overflow-hidden whitespace-break-spaces font-normal mt-2 text-xs">
        {preview}
      </div>
    </Button>
  );
};
