import { FollowUpBox } from './FollowUpBox';
import { Inbox } from './Inbox';

export const FollowUps = () => {
  return (
    <div className="flex gap-5">
      <Inbox />
      <FollowUpBox />
    </div>
  );
};
