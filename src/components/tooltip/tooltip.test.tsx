import { describe, it, expect } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import Tooltip from './tooltip';

describe('Tooltip component', () => {
  it('renders without errors', () => {
    const { getByText } = render(
      <Tooltip content="Hello World">
        <button type="button">Hover me</button>
      </Tooltip>
    );

    expect(getByText('Hover me')).toBeTruthy();
  });

  it('displays tooltip when hovering', () => {
    const { getByText, getByTestId } = render(
      <Tooltip content="Hello World">
        <button type="button" data-testid="tooltip-trigger">
          Hover me
        </button>
      </Tooltip>
    );

    const tooltipTrigger = getByTestId('tooltip-trigger');

    fireEvent.mouseEnter(tooltipTrigger);

    const tooltip = getByText('Hello World');

    expect(tooltip).toBeTruthy();
  });

  it('hides tooltip when mouse leaves', () => {
    const { queryByText, getByTestId } = render(
      <Tooltip content="Hello World">
        <button type="button" data-testid="tooltip-trigger">
          Hover me
        </button>
      </Tooltip>
    );

    const tooltipTrigger = getByTestId('tooltip-trigger');

    fireEvent.mouseEnter(tooltipTrigger);
    fireEvent.mouseLeave(tooltipTrigger);

    const tooltip = queryByText('Hello World');

    expect(tooltip).not.toBeTruthy();
  });
});
