import clsx from 'clsx';
import React, { forwardRef, ChangeEvent, useId, useRef } from 'react';

import styles from './input.module.css';

type Props = {
  label?: string;
  icon?: React.ReactNode;
  prefix?: string;
  hint?: string;
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
  allowClear?: boolean;
  value: string;
  innerPlaceholder?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  autoComplete?: string;
  enterKeyHint?: React.InputHTMLAttributes<HTMLInputElement>['enterKeyHint'];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;  
  onPressEnter?: () => void;  
} & (
  | { placeholder: string; value: null }
  | { placeholder?: string; value: string }
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & Props;

/* eslint-disable react/prop-types */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      value,
      onPressEnter,
      onChange,
      prefix,
      icon,
      hint,
      disabled,
      className,
      hasError,
      type = 'text',
      placeholder,
      innerPlaceholder,
      enterKeyHint,
      name,
      autoComplete,
      ...props
    },
  ) => {
    const localRef = useRef<HTMLInputElement | null>(null);

    const inputId = useId();
    
    if (innerPlaceholder) {
      placeholder = ' ';
    }

    return (
      <div
        className={clsx(styles.inputWrapper, {
          [styles.error]: hasError,
          [styles.hasInnerPlaceholder]: innerPlaceholder,
        })}
      >
        {label && (
          <label htmlFor={`input${inputId}`} className={styles.label}>
            {label}
          </label>
        )}
        <div
          className={clsx(
            styles.input,
            className,
            { [styles.filled]: !disabled },
            { [styles.disabled]: disabled }
          )}
          tabIndex={0}
          role="button"
          {...(innerPlaceholder && {
            onClick: () => {
              localRef?.current?.focus();
            },
          })}
        >
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          {icon && <span className={styles.icon}>{icon}</span>}
          <input
            id={`input${inputId}`}
            aria-label="input"
            type={type}
            disabled={disabled}
            enterKeyHint={enterKeyHint}
            value={value}
            onChange={onChange}            
            placeholder={placeholder}            
            onKeyUp={(e) => {
              if (e.key === 'Enter' && onPressEnter) {
                onPressEnter();
              }
            }}
            name={name}
            autoComplete={autoComplete}
            {...props}
          />          
          {innerPlaceholder && (
            <span className={styles.innerPlaceholder}>{innerPlaceholder}</span>
          )}
        </div>
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
