import { describe, it, expect } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import IncreaseDecrease from './increase-decrease';

describe('IncreaseDecrease Component', () => {
  it('renders with custom button name', () => {
    const { getByRole } = render(
      <IncreaseDecrease addBtnText="Add" />
    );
    // Check if the component renders with the default props
    expect(getByRole('button').textContent).toEqual('Add');
  });

  it('renders with custom value', () => {
    const { getByText } = render(
      <IncreaseDecrease value={3} addBtnText="Custom Add" maxValue={5} />
    );
    expect(getByText('3')).toBeTruthy();
  });

  it('increments and decrements the value', () => {
    const { getByText, getByRole, getByTestId } = render(
      <IncreaseDecrease addBtnText="Add" />
    );
    const addBtn = getByRole('button', { name: 'Add' });
    // Click the "Add" button and check if the value increases
    fireEvent.click(addBtn);
    expect(getByText('1')).toBeTruthy();

    const decrementBtn = getByTestId('decrease');
    const incrementBtn = getByTestId('increase');

    // Click the "Increment" button and check if the value increases again
    fireEvent.click(incrementBtn);
    expect(getByText('2')).toBeTruthy();

    // Click the "Decrement" button and check if the value decreases
    fireEvent.click(decrementBtn);
    expect(getByText('1')).toBeTruthy();
  });
});
