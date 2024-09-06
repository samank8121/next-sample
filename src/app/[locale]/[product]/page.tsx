'use client';

import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { euro, queryKeys } from '@/shared/constant';
import { FiStar } from 'react-icons/fi';
import clsx from 'clsx';
import IncreaseDecrease from '@/components/increase-decrease/increase-decrease';
import { useTranslations } from 'next-intl';
import { useCart } from '@/shared/hooks/useCart';
import { useQuery } from '@tanstack/react-query';
import { GetProductsType } from '@/types/ProductType';
import { GET_PRODUCTS } from '@/shared/graphql/products';
import request from 'graphql-request';

export default function Product({
  params,
}: {
  params: { locale: string; product: string };
}) {
  const t = useTranslations('Product');
  const { changeProduct, getProductCount } = useCart();
  const { data, isLoading } = useQuery<GetProductsType>({
    queryKey: [queryKeys.product, params.product],
    queryFn: async () =>
      request(process.env.NEXT_PUBLIC_API_ADDRESS!, GET_PRODUCTS, {
        slug: params.product,
      }),
  });

  const onChangeProduct = (productid: number, value: number) => {
    changeProduct(productid, value);
  };

  if (isLoading || !data) {
    return null;
  }
  const { id, caption, imageSrc, rate, price, weight, description } =
    data.products[0];
  return (
    <div className={styles.product}>
      <div className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={caption}
          fill
          loading='lazy'
          style={{ objectFit: 'cover', margin: 'auto' }}
        />
      </div>
      <div className={styles.info}>
        <h1>{caption}</h1>
        <div className={styles.weightRate}>
          <span>{weight}</span>
          <span>|</span>
          <span
            className={clsx(styles.rateContainer, {
              [styles.hidden]: rate === 0,
            })}
          >
            <FiStar className={styles.star} />
            <span className={styles.rate}>{rate}</span>
          </span>
          <span>|</span>
          <div className={styles.price}>{`${price} ${euro}`}</div>
        </div>
        {price !== 0 ? (
          <IncreaseDecrease
            className={styles.add}
            value={getProductCount(id)}
            addBtnText={t('add')}
            onChange={(value) => {
              onChangeProduct(id, value);
            }}
          />
        ) : (
          <div className={styles.add} />
        )}
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: description ?? '' }}
        />
      </div>
    </div>
  );
}
