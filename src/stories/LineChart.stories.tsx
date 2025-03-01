import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from '../components/LineChart';

const meta: Meta<typeof LineChart> = {
  title: 'Chart/LineChart',
  component: LineChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    data: { control: 'object' },
    xAxisDataKey: { control: 'text' },
    lines: { control: 'object' },
    excludeDataKeys: { control: 'object' },
    marginLeft: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginRight: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginTop: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginBottom: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    showLegend: { control: 'boolean' },
    width: { control: { type: 'number', min: 200, max: 1200, step: 10 } },
    height: { control: { type: 'number', min: 100, max: 800, step: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof LineChart>;

const singleLineData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];

const multiLineData = [
  { month: 'January', desktop: 186, mobile: 123, tablet: 86 },
  { month: 'February', desktop: 305, mobile: 142, tablet: 97 },
  { month: 'March', desktop: 237, mobile: 201, tablet: 112 },
  { month: 'April', desktop: 73, mobile: 94, tablet: 68 },
  { month: 'May', desktop: 209, mobile: 158, tablet: 103 },
  { month: 'June', desktop: 214, mobile: 187, tablet: 115 },
];

export const 单条线: Story = {
  args: {
    data: singleLineData,
    xAxisDataKey: 'month',
    lines: [{ dataKey: 'desktop', name: '桌面端' }],
  },
};

export const 带标题和副标题: Story = {
  args: {
    title: '月度访问量统计',
    subtitle: '2023年上半年数据统计',
    data: singleLineData,
    xAxisDataKey: 'month',
    lines: [{ dataKey: 'desktop', name: '桌面端' }],
  },
};

export const 多条线: Story = {
  args: {
    title: '各终端月度访问量',
    subtitle: '2023年上半年数据统计',
    data: multiLineData,
    xAxisDataKey: 'month',
    lines: [
      { dataKey: 'desktop', name: '桌面端' },
      { dataKey: 'mobile', name: '移动端' },
      { dataKey: 'tablet', name: '平板端' },
    ],
  },
};

export const 自动生成线条: Story = {
  args: {
    title: '各终端月度访问量',
    subtitle: '自动根据数据生成线条',
    data: multiLineData,
    xAxisDataKey: 'month',
  },
};

export const 排除特定数据: Story = {
  args: {
    title: '月度访问量统计',
    subtitle: '排除了平板端数据',
    data: multiLineData,
    xAxisDataKey: 'month',
    excludeDataKeys: ['tablet'],
  },
};

export const 自定义样式: Story = {
  args: {
    title: '月度访问量统计',
    subtitle: '2023年上半年数据统计',
    data: singleLineData,
    xAxisDataKey: 'month',
    lines: [
      {
        dataKey: 'desktop',
        name: '桌面端',
        color: '#8b5cf6',
        strokeWidth: 3,
        showDot: true,
        type: 'monotone',
      },
    ],
    showLegend: false,
  },
};
