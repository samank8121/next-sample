'use client';

import React from 'react';
import ProductCard from '@/components/product-card/product-card';
import { Products } from '@/shared/data/products';
import { CartType } from '@/types/CartType';
import { queryKeys } from '@/shared/constant';
import styles from '../page.module.css';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '@/shared/hooks/useCart';

const ProductList = () => {
  const { changeProduct } = useCart();
  const { data } = useQuery<CartType>({
    queryKey: [queryKeys.cart],
  });

  const onChangeProduct = (productid: number, value: number) => {
    changeProduct(productid, value);
  };
  const getCount = (productid: number) => {
    if (data && data.products) {
      const result = Object.entries(data.products).filter(
        (key) => key[0].toString() === productid.toString()
      );
      return result && result.length > 0 ? result[0][1] : 0;
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
        />
      ))}
    </div>
  );
};

export default ProductList;
