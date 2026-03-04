'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const FREQUENCY_OPTIONS = [
  { value: '1', label: '1 day after PO creation' },
  { value: '2', label: '2 days after PO creation' },
  { value: '3', label: '3 days after PO creation' },
  { value: '5', label: '5 days after PO creation' },
  { value: '7', label: '7 days after PO creation' },
];

interface FollowUpRuleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FollowUpRuleModal({ open, onOpenChange }: FollowUpRuleModalProps) {
  const [frequency, setFrequency] = useState('3');
  const [threshold, setThreshold] = useState([60]);

  const handleSave = () => {
    // TODO: persist when API is ready
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Follow-up Rule</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-2">
          <div className="space-y-2">
            <Label className="text-foreground font-medium">
              Follow-up #2 Frequency
            </Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {FREQUENCY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-foreground font-medium">
              AI Confidence Threshold
            </Label>
            <Slider
              value={threshold}
              onValueChange={setThreshold}
              min={0}
              max={100}
              step={1}
            />
            <p className="text-sm text-muted-foreground">{threshold[0]}%</p>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              type="button"
              className="bg-[#52a46d] hover:bg-[#438e5b]"
              onClick={handleSave}
            >
              Save changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
