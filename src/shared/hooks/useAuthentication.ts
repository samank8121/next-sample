import { queryKeys } from '../constant';
import { useQuery } from '@tanstack/react-query';
import { AuthType } from '@/types/AuthType';
import commonQueryClient from '../getQueryClient';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export const useAuthentication = () => {
  const { data } = useQuery<AuthType>({
    queryKey: [queryKeys.userInfo],
  });
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const isAuthenticated = () => {
    if (data && data.login) {
      return true;
    }
    else
    {
      commonQueryClient.setQueryData([queryKeys.historyPage], pathname);
      router.push(`${locale}/login`);
    }
  };
 
  return {isAuthenticated};
};
