import { StoryObj, Meta } from '@storybook/react';

import Tooltip from './product-card';

export default {
  title: 'Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} as Meta<typeof Tooltip>;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: <span>Content</span>,
    children: <span>hove me</span>,
  },
};

export const ActiveContent: Story = {
  args: {
    content: 'active content',
    children: <span>hove me</span>,
    activeContent: true,
  },
};
