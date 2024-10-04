import React from 'react';
import { describe, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

//import Autocomplete from './auto-complete';

describe('Autocomplete', () => {
  it('should render the heading', () => {
    render(
      <></>
      // <Autocomplete suggestions={[]}>
      // </Autocomplete>
    );

    // Assert
    screen.getByRole('heading', { name: /Autocomplete/i });
  });
});
