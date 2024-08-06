import { QueryClient } from '@tanstack/react-query';

const commonQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 10 * (60 * 1000), 
      queryFn: () => ({}),
    },
  },
});

export default commonQueryClient;
