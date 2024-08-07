'use client';

import clsx from 'clsx';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FiX } from 'react-icons/fi';

import OverLay from '../overlay/overlay';

import styles from './modal.module.css';

type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  showClose?: boolean;
  className?: string;
};

const Modal: React.FC<ModalProps & PropsWithChildren> = ({
  isOpen,
  onClose,
  showClose = false,
  className,
  children,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(isOpen);

    document.body.classList.remove('overflow-hidden');
  }, [isOpen]);
  const handleModalClose = () => {
    setIsMounted(false);
    if (onClose) {
      onClose();
    }
  };
  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.code === 'Escape') {
        setIsMounted(false);
        if (onClose) {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay isOpen={isMounted}>
          <div className={styles.modalContainer}>
            <div className={clsx(styles.modal, className)}>
              <div className={styles.scroll}>
                {showClose && (
                  <div className={styles.modalCloseContainer}>
                    <button
                      type='button'
                      className={styles.modalClose}
                      onClick={handleModalClose}
                    >
                      <FiX />
                    </button>
                  </div>
                )}
                {children}
              </div>
            </div>
          </div>
        </OverLay>,
        document.getElementsByTagName('body')[0]
      )}
    </>
  );
};

Modal.displayName = 'Modal';

export default Modal;
