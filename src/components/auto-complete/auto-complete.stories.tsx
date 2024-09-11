import { Meta, StoryObj } from '@storybook/react';

import AutoComplete from './auto-complete';

export default {
  title: 'Button',
  component: AutoComplete,
  tags: ['autodocs'],
} as Meta<typeof AutoComplete>;

type Story = StoryObj<typeof AutoComplete>;

export const Default: Story = {
  args: {
    suggestions:[]
  },
};

