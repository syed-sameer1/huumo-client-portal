import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export const ColumnMappingFooter = () => {
  return (
    <div className="flex justify-end items-center gap-3 mt-10">
      <div className="flex items-center gap-3">
        <Checkbox id="save" />
        <Label htmlFor="save" className="text-secondary-foreground text-sm">
          Save mapping as default for future uploads
        </Label>
      </div>
      <Button className="bg-background-secondary">Save & Continue</Button>
    </div>
  );
};
