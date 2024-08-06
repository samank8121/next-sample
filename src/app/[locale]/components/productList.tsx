'use client';

import React from 'react';
import ProductCard from '@/components/product-card/product-card';
import { Products } from '@/shared/products';
import { CartType } from '@/types/CartType';
import commonQueryClient from '@/shared/getQueryClient';
import { queryKeys } from '@/shared/constant';
import styles from '../page.module.css';
import { useQuery } from '@tanstack/react-query';

const ProductList = () => {
  const { data } = useQuery<CartType>({
    queryKey: [queryKeys.cart],
  });

  const onChangeProduct = (productid: number, value: number) => {
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
            products: products,
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
  const getCount = (productid: number) => {
    if (data && data.products) {
      const result = Object.entries(data.products).filter(
        (key) => key[0] === productid.toString()
      );
      return result && result.length > 1 ? result[0][1] : 0;
    } else return 0;
  };
  return (
    <div className={styles.cardList}>
      {Products.map((p, index) => (
        <ProductCard
          key={index}
          product={p}
          value={getCount(p.id)}
          onChange={(value) => {
            onChangeProduct(p.id, value);
          }}
        ></ProductCard>
      ))}
    </div>
  );
};

export default ProductList;
