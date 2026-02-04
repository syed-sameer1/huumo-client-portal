import { RISK_LEVEL } from '../types';

export const RiskScoreChip = ({ value }: { value: RISK_LEVEL }) => {
  if (value === RISK_LEVEL.low) {
    return (
      <div className="py-1.5 px-4 bg-[#DEFFDF] rounded-full text-[#10834B] font-semibold w-fit">
        Low
      </div>
    );
  }
  if (value === RISK_LEVEL.medium) {
    return (
      <div className="py-1.5 px-4 bg-[#FFF4D4] rounded-full text-[#916E02] font-semibold w-fit">
        Medium
      </div>
    );
  }
  return (
    <div className="py-1.5 px-4 bg-[#FFEEEE] rounded-full text-[#C94040] font-semibold w-fit">
      Medium
    </div>
  );
};
