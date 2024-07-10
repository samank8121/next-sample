import { StoryFn, Meta } from '@storybook/react';

import Span, { SpanProps } from './clickable-span';

export default {
  title: 'Clickable Span',
  component: Span,
  tags: ['autodocs'],
} as Meta<typeof Span>;

const Template: StoryFn<typeof Span> = (args: SpanProps) => <Span {...args}/>;

export const Default = Template.bind({});
