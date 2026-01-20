import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const InboxThreadCard = ({
  message,
  selectedMessage,
  onSetSelectedMessage,
}: {
  message: any;
  selectedMessage: any;
  onSetSelectedMessage: any;
}) => {
  const { date, subject, preview, id } = message;
  return (
    <Button
      onClick={() => onSetSelectedMessage(message.id)}
      variant="ghost"
      className={cn(
        'w-full border rounded-md p-2 py-3 h-fit flex flex-col items-start gap-1 text-left',
        selectedMessage === id && 'bg-muted',
      )}
    >
      <div className="text-xs text-muted-foreground">{date}</div>

      <div className="font-medium text-accent-foreground text-xs">
        {subject}
      </div>

      <div className="text-muted-foreground line-clamp-2 overflow-hidden whitespace-break-spaces font-normal mt-2 text-xs">
        {preview}
      </div>
    </Button>
  );
};
