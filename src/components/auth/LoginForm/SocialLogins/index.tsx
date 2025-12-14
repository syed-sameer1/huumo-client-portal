import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const SocialLogins = () => {
  return (
    <div className="flex justify-between gap-3">
      <Button className="border-muted bg-background text-foreground w-full gap-2 hover:bg-background transition-shadow duration-200 hover:shadow-md">
        <Image
          src="/images/google-icon.svg"
          width={16}
          height={16}
          alt="google"
        />
        Google
      </Button>
      <Button className="border-muted bg-background text-foreground w-full gap-2 hover:bg-background transition-shadow duration-200 hover:shadow-md">
        <Image
          src="/images/outlook-icon.svg"
          width={16}
          height={16}
          alt="google"
        />
        Outlook
      </Button>
    </div>
  );
};
