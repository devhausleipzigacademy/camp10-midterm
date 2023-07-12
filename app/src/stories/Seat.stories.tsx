import type { Meta, StoryObj } from '@storybook/react';
import Seat from '../components/Seat';

const meta: Meta<typeof Seat> = {
  title: 'Seat',
  component: Seat,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    backgrounds: {
      default: 'dark',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Seat>;

export const Basic: Story = {
  args: {
    isSelected: false,
    isReserved: false
  }
};
