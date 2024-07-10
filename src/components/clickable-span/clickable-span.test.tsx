import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';
import Span from './clickable-span';

describe('Span component', () => {
  it('renders children and responds to click and enter key', () => {
    const mockOnClick = jest.fn();

    const { getByText } = render(
      <Span onClick={mockOnClick} className="custom-class">
        Test Content
      </Span>
    );

    // Check if the children are rendered
    expect(getByText('Test Content')).toBeInTheDocument();

    // Simulate a click
    fireEvent.click(getByText('Test Content'));
    // Check if onClick was called
    expect(mockOnClick).toHaveBeenCalledTimes(1);

    // Simulate pressing the Enter key
    fireEvent.keyDown(getByText('Test Content'), { key: 'Enter' });
    // Check if onClick was called again
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });
});
