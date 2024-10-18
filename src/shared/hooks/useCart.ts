/* eslint-disable react-hooks/exhaustive-deps */
import { CartType } from '@/types/CartType';
import commonQueryClient from '../getQueryClient';
import { queryKeys } from '../constant';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import {
  CHANGE_PRODUCT_OF_CART,
  GET_CARTS,
  GetCartsType,
} from '@/shared/graphql/cart';
import { useAuthentication } from './useAuthentication';
import { useEffect, useState } from 'react';

export const useCart = () => {
  const { getHeader, checkLoginStatus } = useAuthentication();
  const [loginStatus, setLoginStatus] = useState(checkLoginStatus());

  const { data, refetch } = useQuery<CartType>({
    queryKey: [queryKeys.cart],
    queryFn: async () => {
      const headers = getHeader();
      const results = await request<GetCartsType>(
        process.env.NEXT_PUBLIC_API_ADDRESS!,
        GET_CARTS,
        {},
        headers
      );
      const products: { [key: string]: number } = {};
      let totalCount = 0;
      results.carts.forEach((c) => {
        c.cartProducts.forEach((cp) => {
          const { id } = cp.product;
          products[id] = cp.productCount;
          totalCount += cp.productCount;
        });
      });
      return { products, totalCount };
    },
    enabled: loginStatus,
  });
  useEffect(() => {
    const value = checkLoginStatus();
    if (value !== loginStatus) {
      setLoginStatus(value);
      if (value) {
        refetch();
      }
    }
  }, [checkLoginStatus]);

  const changeProduct = async (productid: number, value: number) => {
    const currentKey = productid.toString();
    const headers = getHeader();
    await request(
      process.env.NEXT_PUBLIC_API_ADDRESS!,
      CHANGE_PRODUCT_OF_CART,
      { productId: productid, count: value },
      headers
    );
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
  const getProductCount = (productid: number): number => {
    if (data && data.products) {
      const result = Object.entries(data.products).filter(
        (key) => key[0].toString() === productid.toString()
      );
      return result && result.length > 0 ? (result[0][1] as number) : 0;
    } else return 0;
  };

  return { changeProduct, getProductCount };
};
