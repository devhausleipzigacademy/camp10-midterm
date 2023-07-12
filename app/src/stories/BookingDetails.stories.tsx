import type { Meta, StoryObj } from '@storybook/react';
import BookingDetails from '../components/BookingDetails';

const meta: Meta<typeof BookingDetails> = {
  title: 'BookingDetails',
  component: BookingDetails,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;

type Story = StoryObj<typeof BookingDetails> & {
  args: { isDisabled: boolean; isActive: boolean; children: string };
};

export const Basic: Story = {
  args: { isDisabled: false, isActive: false, children: 'Label' },
};
export const Active: Story = {
  args: { isDisabled: false, isActive: true, children: 'Label' },
};

export const Disabled: Story = {
  args: { isDisabled: true, isActive: false, children: 'Label' },
};
