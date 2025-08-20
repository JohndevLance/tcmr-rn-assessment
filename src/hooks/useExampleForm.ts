import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
});

export function useExampleForm() {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '' },
  });
}
