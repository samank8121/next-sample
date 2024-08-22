import React from 'react';
import { describe, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Button from './button';

describe('Button', () => {
  it('should render the heading', () => {
    render(
      <Button>
        <h1>Button</h1>
      </Button>
    );

    // Assert
    screen.getByRole('heading', { name: /Button/i });
  });
});
