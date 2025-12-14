import { ControllerRenderProps } from 'react-hook-form';

export interface SelectOptionsProps {
  options: {
    value: string;
    label: string;
  }[];
  placeholder: string;
  disabled?: boolean;
  field: ControllerRenderProps<any>;
}
