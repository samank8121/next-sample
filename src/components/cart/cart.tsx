'use client';

import clsx from 'clsx';
import React from 'react';
import { FiShoppingCart  } from 'react-icons/fi';
import styles from './cart.module.css';
import Span from '../clickable-span/clickable-span';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/constant';
import { CartType } from '@/types/CartType';
export type EventStopPropagation = 'none' | 'click'|'touch'|'all';

export type CartProps = {
  className?: string;
};

const Cart: React.FC<CartProps> = ({
  className
}) => {
  const { data } = useQuery<CartType>({
    queryKey: [queryKeys.cart],    
  });
  const onClick=()=>{
   //open modal
  }

  return (
    <Span className={clsx(styles.cart, className)} onClick={onClick}>
      <FiShoppingCart />
      <span className={styles.items}>
        {data && data.totalCount ? data.totalCount : 0}
      </span>
    </Span>
  );
};

Cart.displayName = 'Cart';

export default Cart;
