import { LoadingButton } from '@/components/LoadingButton';

export const ColumnMappingFooter = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex justify-end items-center gap-3 mt-10">
      <LoadingButton
        type="submit"
        className="bg-background-secondary"
        loading={isLoading}
      >
        Save & Continue
      </LoadingButton>
    </div>
  );
};
