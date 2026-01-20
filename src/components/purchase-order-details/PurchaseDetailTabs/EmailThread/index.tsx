import { Inbox } from './Inbox';
import { EmailBox } from './Inbox/EmailBox';

export const EmailThread = () => {
  return (
    <div className="flex gap-5">
      <Inbox />
      <EmailBox />
    </div>
  );
};
