import type { Meta, StoryObj } from '@storybook/react';
import SvgRenderer from '../components/SvgRenderer';

const meta: Meta<typeof SvgRenderer> = {
  title: '组件/SvgRenderer',
  component: SvgRenderer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    svgContent: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    className: { control: 'text' },
    style: { control: 'object' },
    viewBox: { control: 'text' },
    fill: { control: 'color' },
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SvgRenderer>;

// 默认样例
export const 默认: Story = {
  args: {
    svgContent: '<circle cx="12" cy="12" r="10" />',
    width: '50px',
    height: '50px',
    fill: 'blue',
  },
};

// 自定义图标
export const 自定义图标: Story = {
  args: {
    svgContent: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />',
    width: '64px',
    height: '64px',
    viewBox: '0 0 24 24',
    fill: 'none',
    style: { 
      stroke: '#9333ea', 
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    title: '层级图标',
  },
};

// 复杂SVG
export const 复杂SVG: Story = {
  args: {
    svgContent: `
      <g>
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#f0f9ff" stroke="#0ea5e9" stroke-width="2" />
        <circle cx="12" cy="12" r="6" fill="#0ea5e9" />
        <path d="M12 8v8M8 12h8" stroke="white" stroke-width="2" stroke-linecap="round" />
      </g>
    `,
    width: '100px',
    height: '100px',
    viewBox: '0 0 24 24',
    title: '添加按钮',
  },
};

// 渐变示例
export const 渐变示例: Story = {
  args: {
    svgContent: `
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#8b5cf6" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#gradient)" />
    `,
    width: '80px',
    height: '80px',
    title: '渐变圆形',
  },
};

// 图表示例
export const 简单图表: Story = {
  args: {
    svgContent: `
      <g transform="translate(0, 50) scale(1, -1)">
        <rect x="5" y="0" width="10" height="20" fill="#3b82f6" />
        <rect x="25" y="0" width="10" height="35" fill="#3b82f6" />
        <rect x="45" y="0" width="10" height="15" fill="#3b82f6" />
        <rect x="65" y="0" width="10" height="40" fill="#3b82f6" />
        <rect x="85" y="0" width="10" height="25" fill="#3b82f6" />
      </g>
      <line x1="0" y1="50" x2="100" y2="50" stroke="#374151" />
    `,
    width: '100px',
    height: '60px',
    viewBox: '0 0 100 60',
    title: '柱状图',
  },
}; 