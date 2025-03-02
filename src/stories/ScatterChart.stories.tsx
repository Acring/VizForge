import type { Meta, StoryObj } from '@storybook/react';
import { ScatterChart } from '../components/ScatterChart';

const meta: Meta<typeof ScatterChart> = {
  title: 'Chart/ScatterChart',
  component: ScatterChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    data: { control: 'object' },
    scatters: { control: 'object' },
    showGrid: { control: 'boolean' },
    showLegend: { control: 'boolean' },
    showTooltip: { control: 'boolean' },
    xAxisLabel: { control: 'text' },
    yAxisLabel: { control: 'text' },
    marginLeft: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginRight: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginTop: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    marginBottom: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    width: { control: { type: 'number', min: 200, max: 1200, step: 10 } },
    height: { control: { type: 'number', min: 100, max: 800, step: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof ScatterChart>;

// 基础散点图数据
const basicScatterData = [
  { x: 10, y: 30, z: 200, category: 'A' },
  { x: 40, y: 50, z: 400, category: 'A' },
  { x: 70, y: 20, z: 500, category: 'A' },
  { x: 30, y: 80, z: 300, category: 'A' },
  { x: 50, y: 90, z: 600, category: 'A' },
  { x: 20, y: 40, z: 250, category: 'A' },
];

// 多组散点图数据
const multiScatterData = [
  { x: 10, y: 30, z: 200, category: 'A' },
  { x: 40, y: 50, z: 400, category: 'A' },
  { x: 70, y: 20, z: 500, category: 'A' },
  { x: 30, y: 80, z: 300, category: 'A' },
  { x: 50, y: 90, z: 600, category: 'A' },
  { x: 20, y: 40, z: 250, category: 'A' },
  { x: 15, y: 35, z: 220, category: 'B' },
  { x: 45, y: 55, z: 420, category: 'B' },
  { x: 75, y: 25, z: 520, category: 'B' },
  { x: 35, y: 85, z: 320, category: 'B' },
  { x: 55, y: 95, z: 620, category: 'B' },
  { x: 25, y: 45, z: 270, category: 'B' },
];

// 真实场景数据：学生成绩与学习时间
const studentData = [
  { 学习时间: 2, 成绩: 65, 出勤率: 75, 学生: '学生1' },
  { 学习时间: 3, 成绩: 70, 出勤率: 80, 学生: '学生2' },
  { 学习时间: 4, 成绩: 75, 出勤率: 85, 学生: '学生3' },
  { 学习时间: 5, 成绩: 80, 出勤率: 90, 学生: '学生4' },
  { 学习时间: 6, 成绩: 85, 出勤率: 95, 学生: '学生5' },
  { 学习时间: 7, 成绩: 90, 出勤率: 100, 学生: '学生6' },
  { 学习时间: 2.5, 成绩: 68, 出勤率: 78, 学生: '学生7' },
  { 学习时间: 3.5, 成绩: 72, 出勤率: 82, 学生: '学生8' },
  { 学习时间: 4.5, 成绩: 78, 出勤率: 88, 学生: '学生9' },
  { 学习时间: 5.5, 成绩: 82, 出勤率: 92, 学生: '学生10' },
  { 学习时间: 6.5, 成绩: 88, 出勤率: 97, 学生: '学生11' },
  { 学习时间: 3, 成绩: 65, 出勤率: 75, 学生: '学生12' },
  { 学习时间: 4, 成绩: 68, 出勤率: 80, 学生: '学生13' },
  { 学习时间: 5, 成绩: 72, 出勤率: 85, 学生: '学生14' },
  { 学习时间: 6, 成绩: 75, 出勤率: 90, 学生: '学生15' },
];

export const 基础散点图: Story = {
  args: {
    data: basicScatterData,
    scatters: [
      {
        xDataKey: 'x',
        yDataKey: 'y',
        name: 'A组数据',
      },
    ],
  },
};

export const 带标题和副标题: Story = {
  args: {
    title: '基础散点图示例',
    subtitle: '展示X和Y坐标的分布',
    data: basicScatterData,
    scatters: [
      {
        xDataKey: 'x',
        yDataKey: 'y',
        name: 'A组数据',
      },
    ],
  },
};

export const 多组散点: Story = {
  args: {
    title: '多组散点图示例',
    subtitle: '比较A组和B组的数据分布',
    data: multiScatterData,
    scatters: [
      {
        xDataKey: 'x',
        yDataKey: 'y',
        name: 'A组数据',
        color: 'hsl(var(--chart-1))',
      },
      {
        xDataKey: 'x',
        yDataKey: 'y',
        name: 'B组数据',
        color: 'hsl(var(--chart-2))',
      },
    ],
  },
};

export const 使用Z轴控制点大小: Story = {
  args: {
    title: '带Z轴的散点图',
    subtitle: '点的大小由Z值决定',
    data: basicScatterData,
    scatters: [
      {
        xDataKey: 'x',
        yDataKey: 'y',
        zDataKey: 'z',
        name: '带Z轴的数据',
      },
    ],
  },
};

export const 自定义形状: Story = {
  args: {
    title: '自定义散点形状',
    subtitle: '使用不同形状的散点',
    data: multiScatterData,
    scatters: [
      {
        xDataKey: 'x',
        yDataKey: 'y',
        name: 'A组数据',
        color: 'hsl(var(--chart-1))',
        shape: 'circle',
      },
      {
        xDataKey: 'x',
        yDataKey: 'y',
        name: 'B组数据',
        color: 'hsl(var(--chart-2))',
        shape: 'diamond',
      },
    ],
  },
};

export const 学习时间与成绩关系: Story = {
  args: {
    title: '学习时间与成绩关系',
    subtitle: '点的大小表示出勤率',
    data: studentData,
    scatters: [
      {
        xDataKey: '学习时间',
        yDataKey: '成绩',
        zDataKey: '出勤率',
        name: '学生数据',
      },
    ],
    xAxisLabel: '每日学习时间（小时）',
    yAxisLabel: '考试成绩',
    width: 600,
    height: 400,
  },
};

export const 自动生成散点: Story = {
  args: {
    title: '自动生成散点配置',
    subtitle: '根据数据自动生成散点配置',
    data: studentData,
    width: 600,
    height: 400,
  },
};
