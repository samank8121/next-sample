'use client';

import clsx from 'clsx';
import React, { useState, FC, useEffect } from 'react';
import styles from './product-card.module.css';
import Image from 'next/image';
import { FiStar } from 'react-icons/fi';
import IncreaseDecrease from '../increase-decrease/increase-decrease';

export type ProductCardType = {
  id: number;
  caption: string;
  imageSrc?: string;
  rate: number;
  price: number;
  unit: string;
  discount?: number;
  weight?: string;
  brand?: string;
};
interface ProductCardProps {
  product: ProductCardType;
  value?: number;
  showAdd?: boolean;
  enableDeleteAlert?: boolean;
  showFav?: boolean;
  className?: string;
  onChange?: (value: number) => void;
}
const ProductCard: FC<ProductCardProps> = ({
  product: {
    id,
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
  const [currectValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const onChangeProduct = (count: number) => {    
    setCurrentValue(count);
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
        <IncreaseDecrease
          className={styles.add}
          value={currectValue}
          addBtnText='add'
          onChange={onChangeProduct}
        />
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
            {price === 0 ? 'outofStock' : price}
          </span>
          {price !== 0 && (
            <>
              <span className={styles.unit}>{unit}</span>
            </>
          )}
        </div>

        <span className={styles.caption}>{caption}</span>
        {weight && <div className={styles.weight}>{weight}</div>}
        {brand && <div className={styles.brand}>{brand}</div>}
      </div>
    </>
  );
};

export default ProductCard;
