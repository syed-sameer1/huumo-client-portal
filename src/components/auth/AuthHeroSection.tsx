import Image from 'next/image';

export const AuthHeroSection = () => {
  return (
    <div className="w-175 bg-background-primary-light flex flex-col items-center relative pt-12 gap-10 px-3">
      <div>
        <div className="text-[40px] text-accent-foreground font-semibold mb-4">
          Huumo
        </div>
        <div className="text-base text-secondary-foreground">
          <div>
            <span className="font-semibold">Automate</span> the chase.{' '}
            <span className="font-semibold">Accelerate</span> your POs.{' '}
          </div>
          <div>
            <span className="font-semibold">AI-driven follow-ups</span> that
            keep your supply chain moving without delays.
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/images/auth/auth-image.svg"
          width={544}
          height={544}
          alt="auth-image"
        />
      </div>
    </div>
  );
};
