import { describe, test, expect, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import Modal from './modal';

describe('Modal', () => {
  test('renders modal component when isOpen is true', () => {
    const { getByText } = render(
      <Modal isOpen={true}>
        <div>Modal Content</div>
      </Modal>
    );

    const modalContent = getByText('Modal Content');
    expect(modalContent).not.toBeNull();
  });

  test('does not render modal component when isOpen is false', () => {
    const { queryByText } = render(
      <Modal isOpen={false}>
        <div>Modal Content</div>
      </Modal>
    );

    const modalContent = queryByText('Modal Content');
    expect(modalContent).toBeNull();
  });

  test('calls onClose when the close button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByRole } = render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>
    );

    const closeButton = getByRole('button');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});

