'use client';

import clsx from 'clsx';
import React, { useState, ReactNode } from 'react';

import styles from './tooltip.module.css';

export type TooltipProps = {
  placement?: 'top' | 'bottom' | 'left' | 'right';
  content: ReactNode;
  className?: string;
  children: ReactNode;
  activeContent?: boolean;
  onHideTooltip?: () => void;
};

const Tooltip: React.FC<TooltipProps> = ({
  placement = 'top',
  content,
  className,
  children,
  activeContent,
  onHideTooltip,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => {
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
    if (onHideTooltip) {
      onHideTooltip();
    }
  };

  return (
    <div
      className={clsx(styles.tooltipContainer, {
        [styles.activeContent]: activeContent,
      })}
    >
      <div
        className={styles.tooltipTrigger}
        onMouseEnter={showTooltip}
        onMouseLeave={() => {
          if (!activeContent) {
            hideTooltip();
          }
        }}
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={clsx(styles.tooltip, styles[placement], className)}
          onMouseEnter={() => {
            if (activeContent) {
              showTooltip();
            }
          }}
          onMouseLeave={() => {
            if (activeContent) {
              hideTooltip();
            }
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};
Tooltip.displayName = 'Tooltip';

export default Tooltip;
