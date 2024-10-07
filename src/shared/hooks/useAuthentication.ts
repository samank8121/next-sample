import { queryKeys } from '../constant';
import { useQuery } from '@tanstack/react-query';
import { AuthType } from '@/types/AuthType';
import commonQueryClient from '../getQueryClient';
import { usePathname, useRouter } from 'next/navigation';

export const useAuthentication = () => {
  const { data } = useQuery<AuthType>({
    queryKey: [queryKeys.userInfo],
  });
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = () => {
    console.log('isAuthenticated');
    if (data && data.token) {
      return true;
    }
    else
    {
      commonQueryClient.setQueryData([queryKeys.historyPage], pathname);
      router.push('login');
    }
  };
 
  return {isAuthenticated};
};
