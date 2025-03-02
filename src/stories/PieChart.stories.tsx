import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from '../components/PieChart';

const meta: Meta<typeof PieChart> = {
  title: 'Chart/PieChart',
  component: PieChart,

  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    data: { control: 'object' },
    slice: { control: 'object' },
    showLegend: { control: 'boolean' },
    showLabels: { control: 'boolean' },
    innerRadius: { control: { type: 'number', min: 0, max: 200, step: 1 } },
    outerRadius: { control: 'text' },
    startAngle: { control: { type: 'number', min: 0, max: 360, step: 1 } },
    endAngle: { control: { type: 'number', min: 0, max: 360, step: 1 } },
    marginLeft: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginRight: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginTop: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginBottom: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    width: { control: { type: 'number', min: 200, max: 1200, step: 10 } },
    height: { control: { type: 'number', min: 100, max: 800, step: 10 } },
    cx: { control: 'text' },
    cy: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PieChart>;

const salesData = [
  { name: '食品', value: 1200 },
  { name: '电子', value: 1800 },
  { name: '服装', value: 1400 },
  { name: '家居', value: 1100 },
  { name: '美妆', value: 1600 },
  { name: '图书', value: 900 },
];

const marketShareData = [
  { category: '公司A', share: 35 },
  { category: '公司B', share: 25 },
  { category: '公司C', share: 20 },
  { category: '公司D', share: 15 },
  { category: '其他', share: 5 },
];

export const 基础饼图: Story = {
  args: {
    data: salesData,
  },
};

export const 带标题和副标题: Story = {
  args: {
    title: '各品类销售额占比',
    subtitle: '2023年销售数据统计',
    data: salesData,
  },
};

export const 自定义名称和值字段: Story = {
  args: {
    title: '市场份额分布',
    subtitle: '2023年第四季度',
    data: marketShareData,
    slice: {
      nameKey: 'category',
      dataKey: 'share',
    },
  },
};

export const 环形图: Story = {
  args: {
    title: '各品类销售额占比',
    subtitle: '环形图展示',
    data: salesData,
    innerRadius: 60,
    outerRadius: 80,
  },
};

export const 半环形图: Story = {
  args: {
    title: '各品类销售额占比',
    subtitle: '半环形图展示',
    data: salesData,
    innerRadius: 60,
    outerRadius: 80,
    startAngle: 180,
    cx: '50%',
    cy: '80%',
    endAngle: 0,
  },
};

export const 无标签: Story = {
  args: {
    title: '各品类销售额占比',
    subtitle: '无标签展示',
    data: salesData,
    showLabels: false,
  },
};

export const 无图例: Story = {
  args: {
    title: '各品类销售额占比',
    subtitle: '无图例展示',
    data: salesData,
    showLegend: false,
  },
};

export const 自定义尺寸: Story = {
  args: {
    title: '各品类销售额占比',
    subtitle: '自定义尺寸展示',
    data: salesData,
    width: 400,
    height: 400,
  },
};
