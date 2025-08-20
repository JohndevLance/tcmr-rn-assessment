import { Control, RegisterOptions } from 'react-hook-form';

export interface SharedInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions;
  error?: string;
}
