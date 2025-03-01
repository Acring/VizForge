import type { Meta, StoryObj } from '@storybook/react';
import HelloWorld from '../components/HelloWorld';

const meta: Meta<typeof HelloWorld> = {
  title: 'Common/HelloWorld',
  component: HelloWorld,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    textColor: {
      control: 'color',
    },
    fontSize: {
      control: 'text',
    },
    style: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof HelloWorld>;

// 默认故事
export const 默认: Story = {
  args: {
    name: '世界',
    textColor: '#2563eb',
    fontSize: '1.5rem',
  },
};

// 自定义名称
export const 自定义名称: Story = {
  args: {
    name: 'Storybook',
    textColor: '#2563eb',
    fontSize: '1.5rem',
  },
};

// 红色主题
export const 红色主题: Story = {
  args: {
    name: '世界',
    textColor: '#dc2626',
    fontSize: '1.5rem',
  },
};

// 大字体
export const 大字体: Story = {
  args: {
    name: '世界',
    textColor: '#2563eb',
    fontSize: '2.25rem',
  },
};

// 自定义样式
export const 自定义样式: Story = {
  args: {
    name: '世界',
    textColor: '#9333ea',
    fontSize: '1.875rem',
    style: {
      fontWeight: 'normal',
      textDecoration: 'underline',
    },
  },
};
