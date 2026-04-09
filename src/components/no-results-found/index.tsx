import Image from 'next/image';

export const NoResultFound = ({
  message = 'No results found',
  showDescription = true,
}: {
  message?: string;
  showDescription?: boolean;
}) => {
  return (
    <div className="flex items-center justify-center flex-col gap-4">
      <div className="w-[295px] h-[265px] relative">
        <Image
          src="/images/no-result-found.svg"
          alt="no-result-found"
          layout="fill"
        />
      </div>
      <div className="text-center space-y-2">
        <div className="text-[#080A0D] text-[20px] font-semibold">
          {message}
        </div>
        {showDescription && (
          <div className="text-[#414651] text-sm">
            Try applying different filters.
          </div>
        )}
      </div>
    </div>
  );
};
