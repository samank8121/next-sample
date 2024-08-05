import clsx from 'clsx';
import React from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

import Button from '../button/button';

import styles from './increase-decrease.module.css';

type IncreaseDecreaseProps = {
  value?: number;
  addBtnText?: string;
  maxValue?: number;
  alternativeText?: string;
  className?: string;
  onChange?: (value: number) => void;
};

const IncreaseDecrease: React.FC<IncreaseDecreaseProps> = ({
  value = 0,
  addBtnText,
  maxValue = 999,
  alternativeText,
  onChange,
  className,
}) => {
  const onChanging = (newValue: number) => {
    if (newValue <= maxValue) {
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  return (
    <div className={clsx(styles.increaseDecreaseContainer, className)}>
      {value === 0 && (
        <Button
          size="l"
          name="Add"
          className={clsx(styles.addBtn, { [styles.addBtnText]: addBtnText })}
          onClick={() => {
            onChanging(1);
          }}
          icon={<FiPlus strokeWidth={3} />}
        >
          {addBtnText}
        </Button>
      )}
      {value !== 0 && (
        <div className={styles.increaseDecrease}>
          <Button
            size="sm"
            className={styles.iconContainer}
            data-testid="decrease"
            onClick={() => {
              onChanging(value - 1);
            }}
            icon={
              value === 1 ? (
                <FiTrash2 className={styles.icon} />
              ) : (
                <FiMinus className={styles.icon} />
              )
            }
          />
          <span className={styles.value}>{alternativeText ?? value}</span>
          <Button
            size="sm"
            className={styles.iconContainer}
            data-testid="increase"
            onClick={() => {
              onChanging(value + 1);
            }}
            icon={<FiPlus className={styles.icon} />}
          />
        </div>
      )}
    </div>
  );
};

IncreaseDecrease.displayName = 'IncreaseDecrease';
export default IncreaseDecrease;
