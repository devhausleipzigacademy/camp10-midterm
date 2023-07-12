import type { Meta, StoryObj } from '@storybook/react';
import UserInfo from '../components/UserInfo';

const meta: Meta<typeof UserInfo> = {
    component: UserInfo,
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    },
  };
  
  export default meta;
  
  type Story = StoryObj<typeof UserInfo>;
  
  export const Basic: Story = {};