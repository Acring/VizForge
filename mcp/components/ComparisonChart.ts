import { ComponentInfo } from '../types';
import ComparisonChart from '../../src/components/ComparisonChart';

const ComparisonChartInfo: ComponentInfo = {
  component: ComparisonChart,
  description: '对比图表组件，用于展示两个事物的特性对比，以表格形式呈现',
  propTypes: {
    title: {
      type: 'string',
      required: false,
      defaultValue: undefined,
      description: '对比图表的标题'
    },
    item1Name: {
      type: 'string',
      required: true,
      description: '第一个对比项的名称'
    },
    item2Name: {
      type: 'string',
      required: true,
      description: '第二个对比项的名称'
    },
    items: {
      type: 'array',
      required: true,
      description: '对比项数组，每项包含feature、item1Value和item2Value'
    },
    featureTitle: {
      type: 'string',
      required: false,
      defaultValue: '特性',
      description: '特性列的标题文本'
    },
    headerBgColor: {
      type: 'string',
      required: false,
      defaultValue: '#3b82f6',
      description: '标题背景颜色'
    },
    item1BgColor: {
      type: 'string',
      required: false,
      defaultValue: '#eff6ff',
      description: '第一个对比项的背景颜色'
    },
    item2BgColor: {
      type: 'string',
      required: false,
      defaultValue: '#dbeafe',
      description: '第二个对比项的背景颜色'
    },
    textColor: {
      type: 'string',
      required: false,
      defaultValue: '#1e3a8a',
      description: '文本颜色'
    },
    style: {
      type: 'object',
      required: false,
      defaultValue: {},
      description: '自定义样式对象'
    }
  }
};

export default ComparisonChartInfo; 