import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Modal from './modal';

export default {
  title: 'Modal',
  component: Modal,
  tags: ['autodocs'],
} as Meta<typeof Modal>;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {
      // do nothing.
    },
    children: <>test</>,
  },
};
