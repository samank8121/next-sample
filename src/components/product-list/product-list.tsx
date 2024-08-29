'use client';

import React from 'react';
import ProductCard from '@/components/product-card/product-card';
import { Products } from '@/shared/data/products';
import styles from './product-list.module.css';
import { useCart } from '@/shared/hooks/useCart';

const ProductList = () => {
  const { changeProduct, getProductCount } = useCart();

  const onChangeProduct = (productid: number, value: number) => {
    changeProduct(productid, value);
  };
  
  return (
    <div className={styles.productList}>
      {Products.map((p, index) => (
        <ProductCard
          key={index}
          product={p}
          value={getProductCount(p.id)}
          onChange={(value) => {
            onChangeProduct(p.id, value);
          }}
        />
      ))}
    </div>
  );
};

export default ProductList;
