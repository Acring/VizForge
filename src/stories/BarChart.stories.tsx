import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from '../components/BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Chart/BarChart',
  component: BarChart,

  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    data: { control: 'object' },
    xAxisDataKey: { control: 'text' },
    bars: { control: 'object' },
    excludeDataKeys: { control: 'object' },
    marginLeft: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginRight: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginTop: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginBottom: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    barGap: { control: { type: 'number', min: 0, max: 20, step: 1 } },
    showLegend: { control: 'boolean' },
    stacked: { control: 'boolean' },
    width: { control: { type: 'number', min: 200, max: 1200, step: 10 } },
    height: { control: { type: 'number', min: 100, max: 800, step: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof BarChart>;

const singleBarData = [
  { category: '食品', sales: 1200 },
  { category: '电子', sales: 1800 },
  { category: '服装', sales: 1400 },
  { category: '家居', sales: 1100 },
  { category: '美妆', sales: 1600 },
  { category: '图书', sales: 900 },
];

const multiBarData = [
  { category: '食品', 一季度: 1200, 二季度: 1400, 三季度: 1100 },
  { category: '电子', 一季度: 1800, 二季度: 1600, 三季度: 2000 },
  { category: '服装', 一季度: 1400, 二季度: 1200, 三季度: 1500 },
  { category: '家居', 一季度: 1100, 二季度: 1300, 三季度: 1200 },
  { category: '美妆', 一季度: 1600, 二季度: 1700, 三季度: 1800 },
  { category: '图书', 一季度: 900, 二季度: 950, 三季度: 1000 },
];

export const 单组柱状: Story = {
  args: {
    data: singleBarData,
    xAxisDataKey: 'category',
    bars: [{ dataKey: 'sales', name: '销售额' }],
  },
};

export const 带标题和副标题: Story = {
  args: {
    title: '各品类销售额',
    subtitle: '2023年销售数据统计',
    data: singleBarData,
    xAxisDataKey: 'category',
    bars: [{ dataKey: 'sales', name: '销售额' }],
  },
};

export const 多组柱状: Story = {
  args: {
    title: '各品类季度销售额',
    subtitle: '2023年销售数据统计',
    data: multiBarData,
    xAxisDataKey: 'category',
    bars: [
      { dataKey: '一季度', name: '一季度' },
      { dataKey: '二季度', name: '二季度' },
      { dataKey: '三季度', name: '三季度' },
    ],
  },
};

export const 自定义柱子间距: Story = {
  args: {
    title: '各品类季度销售额（宽间距）',
    subtitle: '2023年销售数据统计',
    data: multiBarData,
    xAxisDataKey: 'category',
    barGap: 12,
    bars: [
      { dataKey: '一季度', name: '一季度' },
      { dataKey: '二季度', name: '二季度' },
      { dataKey: '三季度', name: '三季度' },
    ],
  },
};

export const 堆叠柱状: Story = {
  args: {
    title: '各品类季度销售额（堆叠）',
    subtitle: '2023年销售数据统计',
    data: multiBarData,
    xAxisDataKey: 'category',
    stacked: true,
    bars: [
      { dataKey: '一季度', name: '一季度' },
      { dataKey: '二季度', name: '二季度' },
      { dataKey: '三季度', name: '三季度' },
    ],
  },
};

export const 自动生成柱状: Story = {
  args: {
    title: '各品类季度销售额',
    subtitle: '自动根据数据生成柱状',
    data: multiBarData,
    xAxisDataKey: 'category',
  },
};

export const 排除特定数据: Story = {
  args: {
    title: '各品类季度销售额',
    subtitle: '排除了三季度数据',
    data: multiBarData,
    xAxisDataKey: 'category',
    excludeDataKeys: ['三季度'],
  },
};

export const 自定义样式: Story = {
  args: {
    title: '各品类销售额',
    subtitle: '2023年销售数据统计',
    data: singleBarData,
    xAxisDataKey: 'category',
    bars: [
      {
        dataKey: 'sales',
        name: '销售额',
        color: '#8b5cf6',
        barSize: 30,
        radius: [8, 8, 0, 0],
      },
    ],
    showLegend: false,
  },
};
