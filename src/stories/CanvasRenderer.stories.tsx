import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: '组件/CanvasRenderer',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '这是一个基于 node-canvas 渲染的 Canvas 组件，可以通过传入 JavaScript 代码字符串来绘制各种图形和图表。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    drawCode: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    className: { control: 'text' },
    style: { control: 'object' },
    backgroundColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Node-Canvas 渲染示例
export const NodeCanvas示例: Story = {
 render: () => {
  return <div>
    由node-canvas渲染的Canvas组件，可以传入JavaScript代码字符串来绘制各种图形和图表。
  </div>
 }
}; 