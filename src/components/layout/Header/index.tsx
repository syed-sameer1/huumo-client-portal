import { NotificationsDropdown } from './NotificationsDropdown';
import { ProfileDropdown } from './ProfileDropdown';

export const Header = () => {
  return (
    <div className="flex h-19 flex-row-reverse pt-4 pr-8 pb-4 pl-8 bg-background-primary-light border-b-[#E4E4E7] border-b gap-4 items-center">
      <ProfileDropdown />
      <NotificationsDropdown />
    </div>
  );
};
