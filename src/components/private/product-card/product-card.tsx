'use client';

import clsx from 'clsx';
import React, { FC } from 'react';
import styles from './product-card.module.css';
import Image from 'next/image';
import { FiStar } from 'react-icons/fi';
import IncreaseDecrease from '@/components/increase-decrease/increase-decrease';
import { ProductType } from '@/types/ProductType';
import { useTranslations, useLocale } from 'next-intl';
import { euro } from '@/shared/constant';
import Link from 'next/link';

interface ProductCardProps {
  product: ProductType;
  value?: number;
  showAdd?: boolean;
  enableDeleteAlert?: boolean;
  showFav?: boolean;
  className?: string;
  onChange?: (value: number) => void;
  onClick?: () => void;
}
const ProductCard: FC<ProductCardProps> = ({
  product: { caption, imageSrc, rate, price, discount, weight, slug },
  value,
  className,
  onChange,
}) => {
  const t = useTranslations('Product');
  const locale = useLocale();
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

        <Link className={styles.imageContainer} href={`${locale}/${slug}`}>
          <Image
            src={imageSrc}
            alt={caption}
            fill
            loading='lazy'
            style={{ objectFit: 'cover', margin: 'auto' }}
            draggable={false}
            onDragStart={(event) => {
              event.preventDefault();
            }}
          />
        </Link>
        <div className={styles.content}>
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
            className={clsx(styles.rateContainer, {
              [styles.hidden]: rate === 0,
            })}
          >
            <FiStar className={styles.star} />
            <span className={styles.rate}>{rate}</span>
          </div>
          <div className={styles.priceContainer}>
            <span className={styles.price}>
              {price === 0 ? t('outofStock') : price}
            </span>
            {price !== 0 && <span className={styles.price}>{euro}</span>}
          </div>

          <span className={styles.caption}>{caption}</span>
          {weight && <div className={styles.weight}>{weight}</div>}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
