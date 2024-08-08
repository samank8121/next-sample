import { CartType } from '@/types/CartType';
import commonQueryClient from '../getQueryClient';
import { queryKeys } from '../constant';

export const useCart = () => {
  const changeProduct = (productid: number, value: number) => {
    const currentKey = productid.toString();
    commonQueryClient.setQueryData<CartType>(
      [queryKeys.cart],
      (oldData?: CartType) => {
        if (oldData) {
          const products = { ...oldData.products, [currentKey]: value };

          const sum = Object.entries(products).reduce(
            (accumulator, currentValue) => accumulator + currentValue[1],
            0
          );

          return {
            products: Object.fromEntries(
              Object.entries(products).filter(([, value]) => value !== 0)
            ),
            totalCount: sum,
          };
        }
        return {
          products: { [currentKey]: value },
          totalCount: 1,
        };
      }
    );
  };

  return {changeProduct};
};
