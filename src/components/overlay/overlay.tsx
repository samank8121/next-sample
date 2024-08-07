'use client';

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import styles from './overlay.module.css';

type OverLayProps = {
  isOpen: boolean;
  className?: string;
  children: React.ReactNode;
};

const OverLay: React.FC<OverLayProps> = ({
  isOpen,
  className,
  children,

}) => {
  const [isMounted, setIsMounted] = useState(isOpen);

  useEffect(() => {
    setIsMounted(isOpen);
  }, [isOpen]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div
        className={clsx(styles.overlay, className)}
      />
      {children}
    </>
  );
};

OverLay.displayName = 'OverLay';

export default OverLay;
