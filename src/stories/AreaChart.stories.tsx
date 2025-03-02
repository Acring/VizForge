import type { Meta, StoryObj } from '@storybook/react';
import { AreaChart } from '../components/AreaChart';

const meta: Meta<typeof AreaChart> = {
  title: 'Chart/AreaChart',
  component: AreaChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    data: { control: 'object' },
    xAxisDataKey: { control: 'text' },
    areas: { control: 'object' },
    excludeDataKeys: { control: 'object' },
    marginLeft: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginRight: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginTop: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginBottom: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    showLegend: { control: 'boolean' },
    stacked: { control: 'boolean' },
    useGradient: { control: 'boolean' },
    width: { control: { type: 'number', min: 200, max: 1200, step: 10 } },
    height: { control: { type: 'number', min: 100, max: 800, step: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof AreaChart>;

const singleAreaData = [
  { month: '一月', 访问量: 186 },
  { month: '二月', 访问量: 305 },
  { month: '三月', 访问量: 237 },
  { month: '四月', 访问量: 73 },
  { month: '五月', 访问量: 209 },
  { month: '六月', 访问量: 214 },
];

const multiAreaData = [
  { month: '一月', 桌面端: 186, 移动端: 123, 平板端: 86 },
  { month: '二月', 桌面端: 305, 移动端: 142, 平板端: 97 },
  { month: '三月', 桌面端: 237, 移动端: 201, 平板端: 112 },
  { month: '四月', 桌面端: 73, 移动端: 94, 平板端: 68 },
  { month: '五月', 桌面端: 209, 移动端: 158, 平板端: 103 },
  { month: '六月', 桌面端: 214, 移动端: 187, 平板端: 115 },
];

export const 单个面积: Story = {
  args: {
    data: singleAreaData,
    xAxisDataKey: 'month',
    areas: [{ dataKey: '访问量', name: '网站访问量' }],
    useGradient: true,
  },
};

export const 带标题和副标题: Story = {
  args: {
    title: '月度访问量统计',
    subtitle: '2023年上半年数据统计',
    data: singleAreaData,
    xAxisDataKey: 'month',
    areas: [{ dataKey: '访问量', name: '网站访问量' }],
    useGradient: true,
  },
};

export const 多个面积: Story = {
  args: {
    title: '各终端月度访问量',
    subtitle: '2023年上半年数据统计',
    data: multiAreaData,
    xAxisDataKey: 'month',
    areas: [
      { dataKey: '桌面端', name: '桌面端' },
      { dataKey: '移动端', name: '移动端' },
      { dataKey: '平板端', name: '平板端' },
    ],
    useGradient: true,
  },
};

export const 堆叠面积: Story = {
  args: {
    title: '各终端月度访问量（堆叠）',
    subtitle: '2023年上半年数据统计',
    data: multiAreaData,
    xAxisDataKey: 'month',
    areas: [
      { dataKey: '桌面端', name: '桌面端' },
      { dataKey: '移动端', name: '移动端' },
      { dataKey: '平板端', name: '平板端' },
    ],
    stacked: true,
    useGradient: true,
  },
};

export const 自动生成面积: Story = {
  args: {
    title: '各终端月度访问量',
    subtitle: '自动根据数据生成面积',
    data: multiAreaData,
    xAxisDataKey: 'month',
    useGradient: true,
  },
};

export const 排除特定数据: Story = {
  args: {
    title: '月度访问量统计',
    subtitle: '排除了平板端数据',
    data: multiAreaData,
    xAxisDataKey: 'month',
    excludeDataKeys: ['平板端'],
    useGradient: true,
  },
};

export const 自定义样式: Story = {
  args: {
    title: '月度访问量统计',
    subtitle: '2023年上半年数据统计',
    data: singleAreaData,
    xAxisDataKey: 'month',
    areas: [
      {
        dataKey: '访问量',
        name: '网站访问量',
        fillColor: '#8b5cf6',
        strokeColor: '#6d28d9',
        strokeWidth: 3,
        showDot: true,
        type: 'monotone',
        useGradient: true,
      },
    ],
    showLegend: false,
  },
};

export const 无渐变效果: Story = {
  args: {
    title: '月度访问量统计',
    subtitle: '无渐变填充效果',
    data: singleAreaData,
    xAxisDataKey: 'month',
    areas: [
      {
        dataKey: '访问量',
        name: '网站访问量',
        fillColor: '#8b5cf6',
        strokeColor: '#6d28d9',
        fillOpacity: 0.6,
      },
    ],
    useGradient: false,
  },
};

export const 混合渐变效果: Story = {
  args: {
    title: '各终端月度访问量',
    subtitle: '混合渐变和非渐变效果',
    data: multiAreaData,
    xAxisDataKey: 'month',
    areas: [
      {
        dataKey: '桌面端',
        name: '桌面端',
        useGradient: true,
        fillColor: '#3b82f6',
        strokeColor: '#2563eb',
      },
      {
        dataKey: '移动端',
        name: '移动端',
        useGradient: false,
        fillColor: '#ef4444',
        strokeColor: '#dc2626',
        fillOpacity: 0.4,
      },
      {
        dataKey: '平板端',
        name: '平板端',
        useGradient: true,
        fillColor: '#10b981',
        strokeColor: '#059669',
      },
    ],
  },
};
