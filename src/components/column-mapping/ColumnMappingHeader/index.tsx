import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Info } from 'lucide-react';

export const ColumnMappingHeader = ({
  headerIncluded = false,
  onHeaderIncludedChange,
}: {
  headerIncluded?: boolean;
  onHeaderIncludedChange?: (checked: boolean) => void;
} = {}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="space-y-3">
        <h3 className="font-semibold text-[24px]">Column Mapping</h3>
        <div className="text-sm">
          Map columns from your file to Huumo fields.
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <Info size={18} className="text-[#71717A]" />
        <Label className="text-foreground text-sm font-normal">
          Headers are included
        </Label>
        <Switch
          checked={headerIncluded}
          onCheckedChange={onHeaderIncludedChange}
          className="text-[#34C759] data-[state=checked]:bg-[#34C759]"
        />
      </div>
    </div>
  );
};
