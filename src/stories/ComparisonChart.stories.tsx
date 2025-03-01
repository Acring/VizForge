import type { Meta, StoryObj } from '@storybook/react';
import ComparisonChart from '../components/ComparisonChart';
import { ComparisonItem } from '../components/ComparisonChart';

const meta: Meta<typeof ComparisonChart> = {
  title: 'Common/ComparisonChart',
  component: ComparisonChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    item1Name: { control: 'text' },
    item2Name: { control: 'text' },
    items: { control: 'object' },
    featureTitle: { control: 'text' },
    headerBgColor: { control: 'color' },
    item1BgColor: { control: 'color' },
    item2BgColor: { control: 'color' },
    textColor: { control: 'color' },
    style: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof ComparisonChart>;

// IDE对比数据
const ideComparisonData: ComparisonItem[] = [
  {
    feature: '代码补全',
    item1Value: '基于语法和简单上下文',
    item2Value: '基于深度理解和项目上下文',
  },
  { feature: '错误检测', item1Value: '主要是语法错误', item2Value: '语法、逻辑和最佳实践' },
  { feature: '代码生成', item1Value: '有限的模板', item2Value: '完整的、上下文相关的代码生成' },
  { feature: '学习曲线', item1Value: '通常较陡峭', item2Value: 'AI辅助使学习更简单' },
  { feature: '协作功能', item1Value: '通常需要额外插件', item2Value: '内置且AI增强' },
];

// 默认故事
export const IDE对比: Story = {
  args: {
    title: '与传统IDE的比较',
    item1Name: '传统IDE',
    item2Name: 'Cursor',
    items: ideComparisonData,
    headerBgColor: '#3b82f6',
    item1BgColor: '#eff6ff',
    item2BgColor: '#dbeafe',
    textColor: '#1e3a8a',
    style: {
      maxWidth: '800px',
    },
  },
};

// 编程语言对比数据
const languageComparisonData: ComparisonItem[] = [
  { feature: '类型系统', item1Value: '动态类型', item2Value: '静态类型' },
  { feature: '并发模型', item1Value: '基于事件循环', item2Value: 'Goroutines和Channels' },
  { feature: '内存管理', item1Value: '垃圾回收', item2Value: '垃圾回收' },
  { feature: '编译/解释', item1Value: '解释执行', item2Value: '编译执行' },
  { feature: '生态系统', item1Value: 'npm (庞大)', item2Value: 'Go模块 (精简)' },
];

export const 编程语言对比: Story = {
  args: {
    title: '编程语言对比',
    item1Name: 'JavaScript',
    item2Name: 'Go',
    featureTitle: '语言特性',
    items: languageComparisonData,
    headerBgColor: '#8b5cf6',
    item1BgColor: '#f5f3ff',
    item2BgColor: '#ede9fe',
    textColor: '#5b21b6',
    style: {
      maxWidth: '800px',
    },
  },
};

// 数据库对比数据
const dbComparisonData: ComparisonItem[] = [
  { feature: '数据模型', item1Value: '关系型', item2Value: '文档型' },
  { feature: '查询语言', item1Value: 'SQL', item2Value: 'JSON类查询' },
  { feature: '事务支持', item1Value: 'ACID完整支持', item2Value: '有限支持' },
  { feature: '扩展性', item1Value: '垂直扩展为主', item2Value: '水平扩展为主' },
  { feature: '适用场景', item1Value: '结构化数据和复杂查询', item2Value: '半结构化数据和高写入量' },
];

export const 数据库对比: Story = {
  args: {
    title: '数据库对比',
    item1Name: 'PostgreSQL',
    item2Name: 'MongoDB',
    items: dbComparisonData,
    headerBgColor: '#10b981',
    item1BgColor: '#ecfdf5',
    item2BgColor: '#d1fae5',
    textColor: '#065f46',
    style: {
      maxWidth: '800px',
    },
  },
};

// 深色主题
export const 深色主题: Story = {
  args: {
    title: '前端框架对比',
    item1Name: 'React',
    item2Name: 'Vue',
    items: [
      { feature: '学习曲线', item1Value: '中等', item2Value: '平缓' },
      { feature: '状态管理', item1Value: 'Redux, Context API', item2Value: 'Vuex, Pinia' },
      { feature: '渲染性能', item1Value: '虚拟DOM', item2Value: '虚拟DOM + 编译时优化' },
      { feature: '社区规模', item1Value: '非常大', item2Value: '大' },
      { feature: '企业支持', item1Value: 'Facebook', item2Value: '独立团队' },
    ],
    headerBgColor: '#0f172a',
    item1BgColor: '#1e293b',
    item2BgColor: '#334155',
    textColor: '#f8fafc',
    style: {
      maxWidth: '800px',
    },
  },
};
