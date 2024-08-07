'use client';

import React, { useState } from 'react';
import Modal from '../modal/modal';
import { useQuery } from '@tanstack/react-query';
import { CartType } from '@/types/CartType';
import { queryKeys } from '@/shared/constant';
import { Products } from '@/shared/products';
import styles from './cart-modal.module.css';
import clsx from 'clsx';
import commonQueryClient from '@/shared/getQueryClient';

const CartModal = () => {
  const { data } = useQuery<CartType>({
    queryKey: [queryKeys.cart],
  });
  const { data: cartModal } = useQuery<{ open: boolean }>({
    queryKey: [queryKeys.cartModal],
  });

  const setClose = () => {
    commonQueryClient.setQueryData([queryKeys.cartModal], { open: false });
  };
  if (!(cartModal && cartModal.open)) {
    return null;
  }
  return (
    <Modal isOpen={cartModal.open} showClose={true} onClose={() => setClose()}>
      <div className={clsx(styles.cartModal, styles.grid)}>
        <span>Caption</span>
        <span>Count</span>
        <span>Total Price</span>
      </div>
      {data &&
        data.products &&
        Object.entries(data.products).map((p) => {
          const productInfo = Products.filter(
            (product) => product.id === Number(p[0])
          );
          const { caption, price } = productInfo[0];
          return (
            <div className={styles.grid} key={p[0]}>
              <span>{caption}</span>
              <span>{p[1]}</span>
              <span>{p[1] * price}</span>
            </div>
          );
        })}
    </Modal>
  );
};

export default CartModal;
