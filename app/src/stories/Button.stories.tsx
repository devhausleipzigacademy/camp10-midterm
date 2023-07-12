import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button> & {
  args: { variant: string; size: string;};
};

export const Primary: Story = {
  args: { variant: 'primary', size: 'default' },
};

/*export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    variant: { control: 'boolean' },
    size: { control: 'boolean' },
    status: { control: 'text' },

  }, as: Meta,

  const Template: StoryObj = (args) => <Button {...args} />,

  export const Variant = Template.bind({});
  Primary.args = {
    primary: true,
    label: 'Button',
  },

  export const Status = Template.bind({});
  Secondary.args = {
    secondary: true,
    label: 'Button',
  },    }

  export const = Template.bind({});
  Secondary.args = {
    secondary: true,
    label: 'Button',
  },    }*/
