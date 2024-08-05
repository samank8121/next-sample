import { StoryObj, Meta } from '@storybook/react';

import IncreaseDecrease from './increase-decrease';

export default {
  title: 'IncreaseDecrease',
  component: IncreaseDecrease,
  tags: ['autodocs'],
} as Meta<typeof IncreaseDecrease>;

type Story = StoryObj<typeof IncreaseDecrease>;

export const Default: Story = {
  args: {
    value: 0,
    addBtnText: 'Add',
  },
};

