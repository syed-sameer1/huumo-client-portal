export const PerformanceScoreChip = ({ value }: { value: number }) => {
  if (value >= 90) {
    return (
      <div className="bg-[#DEFFDF] text-[#10834B] pt-1.5 pr-4 pb-1.5 pl-4 font-semibold rounded-full w-fit">
        {value}
      </div>
    );
  }
  if (value >= 50) {
    return (
      <div className="bg-[#FFF4D4] text-[#916E02] pt-1.5 pr-4 pb-1.5 pl-4 font-semibold rounded-full w-fit">
        {value}
      </div>
    );
  }
  return (
    <div className="bg-[#FFEEEE] text-[#C94040] pt-1.5 pr-4 pb-1.5 pl-4 font-semibold rounded-full w-fit">
      {value}
    </div>
  );
};
