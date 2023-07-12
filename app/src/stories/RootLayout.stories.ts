import type { Meta, StoryObj } from '@storybook/react';
import { RootLayout } from '../layouts/RootLayout';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta: Meta<typeof RootLayout> = {
  title: 'RootLayout',
  component: RootLayout,
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof RootLayout>;

export const Basic: Story = {};
