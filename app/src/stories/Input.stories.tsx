import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/Input';
import { HiKey, HiMail } from 'react-icons/hi';

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Login: Story = {
  args: {
    icon: <HiMail />,
    id: 'login',
    placeholder: 'your@email.com',
  },
};

export const Password: Story = {
  args: {
    icon: <HiKey />,
    id: 'password',
    placeholder: 'Enter password',
  },
};
