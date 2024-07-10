'use client';

import clsx from 'clsx';
import React from 'react';

import styles from './clickable-span.module.css';

export type EventStopPropagation = 'none' | 'click'|'touch'|'all';

export type SpanProps = {
  className?: string;
  ariaLabel?:string;
  children: React.ReactNode;
  stopPropagation?: EventStopPropagation;
  onClick: (e?: any) => void;
};

const Span: React.FC<SpanProps> = ({
  children,
  className,
  ariaLabel,
  stopPropagation = 'none',
  onClick,
}) => {
  return (
    <span
      className={clsx(styles.span, className)}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onClick();
        }
      }}
      onClick={(e) => {
        if (stopPropagation === 'all' || stopPropagation === 'click') {
          e.preventDefault();
          e.stopPropagation();
        }
        onClick(e);
      }}
      onTouchStart={(e) => {
        if (stopPropagation === 'all' || stopPropagation === 'touch') {
          e.stopPropagation();
        }
      }}
    >
      {children}
    </span>
  );
};

Span.displayName = 'Span';

export default Span;
