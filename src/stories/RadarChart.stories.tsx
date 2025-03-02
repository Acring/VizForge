import type { Meta, StoryObj } from '@storybook/react';
import { RadarChart } from '../components/RadarChart';

const meta: Meta<typeof RadarChart> = {
  title: 'Chart/RadarChart',
  component: RadarChart,

  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    data: { control: 'object' },
    radars: { control: 'object' },
    angleAxisDataKey: { control: 'text' },
    excludeDataKeys: { control: 'object' },
    showLegend: { control: 'boolean' },
    showGrid: { control: 'boolean' },
    showRadiusAxis: { control: 'boolean' },
    marginLeft: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginRight: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginTop: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginBottom: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    width: { control: { type: 'number', min: 200, max: 1200, step: 10 } },
    height: { control: { type: 'number', min: 100, max: 800, step: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof RadarChart>;

const skillsData = [
  { subject: '数学', A: 120, B: 110, C: 140 },
  { subject: '语文', A: 98, B: 130, C: 100 },
  { subject: '英语', A: 86, B: 130, C: 90 },
  { subject: '物理', A: 99, B: 100, C: 120 },
  { subject: '化学', A: 85, B: 90, C: 110 },
  { subject: '生物', A: 65, B: 85, C: 100 },
];

const productData = [
  { feature: '性能', product1: 90, product2: 60 },
  { feature: '价格', product1: 80, product2: 95 },
  { feature: '外观', product1: 70, product2: 80 },
  { feature: '耐用性', product1: 85, product2: 65 },
  { feature: '易用性', product1: 75, product2: 90 },
];

export const 基础雷达图: Story = {
  args: {
    data: skillsData,
    angleAxisDataKey: 'subject',
  },
};

export const 带标题和副标题: Story = {
  args: {
    title: '学生能力评估',
    subtitle: '三名学生在各科目的表现',
    data: skillsData,
    angleAxisDataKey: 'subject',
  },
};

export const 自定义雷达配置: Story = {
  args: {
    title: '产品比较',
    subtitle: '两款产品在不同特性上的评分',
    data: productData,
    angleAxisDataKey: 'feature',
    radars: [
      {
        dataKey: 'product1',
        name: '产品A',
        strokeColor: 'hsl(var(--chart-1))',
        fillColor: 'hsl(var(--chart-1))',
        fillOpacity: 0.5,
      },
      {
        dataKey: 'product2',
        name: '产品B',
        strokeColor: 'hsl(var(--chart-2))',
        fillColor: 'hsl(var(--chart-2))',
        fillOpacity: 0.5,
      },
    ],
  },
};

export const 无网格: Story = {
  args: {
    title: '学生能力评估',
    subtitle: '无网格展示',
    data: skillsData,
    angleAxisDataKey: 'subject',
    showGrid: false,
  },
};

export const 显示半径轴: Story = {
  args: {
    title: '学生能力评估',
    subtitle: '显示半径轴',
    data: skillsData,
    angleAxisDataKey: 'subject',
    showRadiusAxis: true,
  },
};

export const 无图例: Story = {
  args: {
    title: '学生能力评估',
    subtitle: '无图例展示',
    data: skillsData,
    angleAxisDataKey: 'subject',
    showLegend: false,
  },
};

export const 自定义尺寸: Story = {
  args: {
    title: '学生能力评估',
    subtitle: '自定义尺寸展示',
    data: skillsData,
    angleAxisDataKey: 'subject',
    width: 500,
    height: 400,
  },
};
