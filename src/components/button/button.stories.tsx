import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FiHeart } from 'react-icons/fi';

import Button from './button';

export default {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'button',
    icon: <FiHeart />,
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'button',
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'button',
  },
};

export const Loading: Story = {
  args: {
    children: 'button',
    loading: true,
    loadingText: 'Loading ...',
  },
};
