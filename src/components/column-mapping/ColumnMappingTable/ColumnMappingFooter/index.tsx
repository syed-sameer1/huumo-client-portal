import { LoadingButton } from '@/components/LoadingButton';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export const ColumnMappingFooter = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex justify-end items-center gap-3 mt-10">
      <div className="flex items-center gap-3">
        <Checkbox id="save" />
        <Label htmlFor="save" className="text-secondary-foreground text-sm">
          Save mapping as default for future uploads
        </Label>
      </div>
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
