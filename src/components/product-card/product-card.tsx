'use client';

import clsx from 'clsx';
import React, { FC } from 'react';
import styles from './product-card.module.css';
import Image from 'next/image';
import { FiStar } from 'react-icons/fi';
import IncreaseDecrease from '../increase-decrease/increase-decrease';
import { ProductType } from '@/types/ProductType';
import { useTranslations } from 'next-intl';
import { euro } from '@/shared/constant';

interface ProductCardProps {
  product: ProductType;
  value?: number;
  showAdd?: boolean;
  enableDeleteAlert?: boolean;
  showFav?: boolean;
  className?: string;
  onChange?: (value: number) => void;
}
const ProductCard: FC<ProductCardProps> = ({
  product: {
    caption,
    imageSrc,
    rate,
    price,
    unit,
    discount,
    weight,
    brand,
  },
  value,
  className,
  onChange
}) => {
  const t = useTranslations('Product');

  const onChangeProduct = (count: number) => {
    if (onChange) {
      onChange(count);
    }
  };
  return (
    <>
      <div className={clsx(styles.card, className)}>
        <div className={styles.top}>
          {discount && (
            <div className={clsx(styles.top, styles.discount)}>
              {`-${discount}%`}
            </div>
          )}
        </div>

        {imageSrc && (
          <Image
            src={imageSrc}
            alt={caption}
            width={170}
            height={170}
            loading='lazy'
            style={{ objectFit: 'contain', margin: 'auto' }}
            draggable={false}
            onDragStart={(event) => {
              event.preventDefault();
            }}
          />
        )}
        {!imageSrc && (
          <div className={styles.iconPlaceholder}>
            <Image src='next.svg' alt='default' width={170} height={170} />
          </div>
        )}
        {price !== 0 ? (
          <IncreaseDecrease
            className={styles.add}
            value={value}
            addBtnText={t('add')}
            onChange={onChangeProduct}
          />
        ) : (
          <div className={styles.add} />
        )}
        <div
          className={clsx(styles.ratePlaceholder, {
            [styles.hidden]: rate === 0,
          })}
        >
          <FiStar className={styles.star} />
          <span className={styles.rate}>{rate}</span>
        </div>
        <div className={styles.pricePlaceHolder}>
          <span className={styles.price}>
            {price === 0 ? t('outofStock') : price}
          </span>
          {price !== 0 && <span className={styles.price}>{euro}</span>}
        </div>

        <span className={styles.caption}>{caption}</span>
        {weight && (
          <div className={styles.weight}>
            {weight} {unit}
          </div>
        )}
        {brand && <div className={styles.brand}>{brand}</div>}
      </div>
    </>
  );
};

export default ProductCard;
