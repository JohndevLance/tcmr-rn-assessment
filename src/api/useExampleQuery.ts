import { useQuery } from '@tanstack/react-query';

export function useExampleQuery() {
  return useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      // Replace with your API call
      return Promise.resolve('Hello from React Query!');
    },
  });
}
