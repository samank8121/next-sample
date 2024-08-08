'use client';

import React from 'react';
import Modal from '../modal/modal';
import { useQuery } from '@tanstack/react-query';
import { CartType } from '@/types/CartType';
import { euro, queryKeys } from '@/shared/constant';
import { Products } from '@/shared/data/products';
import styles from './cart-modal.module.css';
import commonQueryClient from '@/shared/getQueryClient';
import { ModalCartType } from '@/types/ModalTypes';
import { useTranslations } from 'next-intl';
import IncreaseDecrease from '../increase-decrease/increase-decrease';
import { useCart } from '@/shared/hooks/useCart';

const CartModal = () => {
  const t = useTranslations('Cart');
  const { changeProduct } = useCart();
  const { data } = useQuery<CartType>({
    queryKey: [queryKeys.cart],
  });
  const { data: cartModal } = useQuery<ModalCartType>({
    queryKey: [queryKeys.cartModal],
  });

  const setClose = () => {
    commonQueryClient.setQueryData([queryKeys.cartModal], { open: false });
  };
  if (!(cartModal && cartModal.open)) {
    return null;
  }
  const onChangeProduct = (productid: number, value: number) => {
    changeProduct(productid, value);
  };
  return (
    <Modal
      className={styles.cartModal}
      isOpen={cartModal.open}
      showClose={true}
      onClose={() => setClose()}
    >
      <div className={styles.grid}>
        <span>{t('caption')}</span>
        <span>{t('count')}</span>
        <span>{t('totalPrice')}</span>
      </div>
      {!(data && data.products) ||
        (data && data.totalCount === 0 && (
          <span className={styles.empty}>There is nothing here!</span>
        ))}
      {data &&
        data.products &&
        Object.entries(data.products).map((p) => {
          const currProductId = Number(p[0]);
          const productInfo = Products.filter(
            (product) => product.id === currProductId
          );
          const { caption, price } = productInfo[0];
          return (
            <div className={styles.grid} key={currProductId}>
              <span>{caption}</span>
              <span>
                <IncreaseDecrease
                  className={styles.add}
                  value={p[1]}
                  onChange={(value) => {
                    onChangeProduct(currProductId, value);
                  }}
                />
              </span>
              <span>
                {p[1] * price} {euro}
              </span>
            </div>
          );
        })}
    </Modal>
  );
};

export default CartModal;
