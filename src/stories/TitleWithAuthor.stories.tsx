import type { Meta, StoryObj } from '@storybook/react';
import TitleWithAuthor from '../components/TitleWithAuthor';

const meta: Meta<typeof TitleWithAuthor> = {
  title: '组件/TitleWithAuthor',
  component: TitleWithAuthor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    author: { control: 'text' },
    tagline: { control: 'text' },
    textColor: { control: 'color' },
    backgroundColor: { control: 'text' },
    style: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof TitleWithAuthor>;

// 默认故事
export const 默认: Story = {
  args: {
    title: 'Palette',
    subtitle: '创意设计工具',
    author: 'MCP',
    tagline: 'GO FIRST. GO FARTHER.',
    textColor: '#f7f6dc',
    backgroundColor: 'linear-gradient(135deg, #1e40af 0%, #4b5563 50%, #111827 100%)',
  },
};

// 红色主题
export const 红色主题: Story = {
  args: {
    title: 'Vision',
    subtitle: '未来视觉',
    author: 'Design Lab',
    tagline: 'CRAFTING THE FUTURE',
    textColor: '#fff5f5',
    backgroundColor: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #f43f5e 100%)',
  },
};

// 绿色主题
export const 绿色主题: Story = {
  args: {
    title: 'Nature',
    subtitle: '自然之美',
    author: 'EcoStudio',
    tagline: 'SUSTAINABLE DESIGN',
    textColor: '#f0fdf4',
    backgroundColor: 'linear-gradient(135deg, #14532d 0%, #15803d 50%, #4ade80 100%)',
  },
};

// 仅标题
export const 仅标题: Story = {
  args: {
    title: 'Minimalist',
    backgroundColor: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
    textColor: '#ffffff',
  },
};

// 带副标题
export const 带副标题: Story = {
  args: {
    title: 'Design System',
    subtitle: '构建一致的用户体验',
    backgroundColor: 'linear-gradient(135deg, #075985 0%, #0ea5e9 100%)',
    textColor: '#ffffff',
  },
};

// 自定义样式
export const 自定义样式: Story = {
  args: {
    title: 'Custom',
    subtitle: '创新定制',
    author: 'Style Lab',
    tagline: 'BREAKING BOUNDARIES',
    textColor: '#fffbeb',
    backgroundColor: 'linear-gradient(135deg, #3730a3 0%, #8b5cf6 100%)',
    style: {
      height: '400px',
      borderRadius: '2rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    },
  },
}; 