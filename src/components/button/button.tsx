'use client';

import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './button.module.css';

type Props = {
  variant?: 'filled' | 'outlined' | 'elevated';
  size?: 'sm' | 'm' | 'l' | 'xl';
  icon?: React.ReactNode;
  type?: 'button'|'submit'|'reset'
  loading?: boolean;
  loadingText?: string;
  delay?: number;
};

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'value'
> &
  Props;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'filled',
      size = 'm',
      type = 'button',
      icon,
      children,
      className,
      loading,
      loadingText,
      delay = 300,
      onClick,
      ...props
    },
    ref
  ) => {
    const [activeLoading, setActiveLoading] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);


    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading) {
        e.preventDefault();
        return;
      }
      if (onClick) {
        onClick(e);
      }
    };


    if (loading && !timer) {
      const time = setTimeout(() => {
        setActiveLoading(true);
      }, delay);
      setTimer(time);
    }
    if (!loading && activeLoading) {
      setActiveLoading(false);
      setTimer(null);
    }
    if (!loading && timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          styles.button,
          styles[`button-variant-${variant}`],
          styles[`button-size-${size}`],
          className,
          {
            [styles['only-icon']]: icon && typeof children === 'undefined',
            [styles.loading]: activeLoading,
          }
        )}
        onClick={handleClick}
        {...props}
      >
        {icon && !activeLoading && <span className={styles.icon}>{icon}</span>}
        {activeLoading && loadingText ? loadingText : children}        
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
