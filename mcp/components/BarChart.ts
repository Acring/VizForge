import { ComponentInfo } from '../types';
import { BarChart } from '../../src/components/BarChart';

const BarChartInfo: ComponentInfo = {
  component: BarChart,
  description:
    '柱状图组件，用于展示数据分类比较或时间序列数据，支持多组柱状、堆叠柱状、标题和副标题',
  propTypes: {
    title: {
      type: 'string',
      required: false,
      defaultValue: undefined,
      description: '图表标题',
    },
    subtitle: {
      type: 'string',
      required: false,
      defaultValue: undefined,
      description: '图表副标题',
    },
    data: {
      type: 'array',
      required: true,
      description: '图表数据',
    },
    xAxisDataKey: {
      type: 'string',
      required: true,
      description: 'X轴数据键名',
    },
    bars: {
      type: 'array',
      required: false,
      description: '柱状配置数组，用于显示多组柱状。如果不提供，将根据数据自动生成',
    },
    excludeDataKeys: {
      type: 'array',
      required: false,
      defaultValue: [],
      description: '要排除的数据键名（不会为这些键生成柱状）',
    },
    marginLeft: {
      type: 'number',
      required: false,
      defaultValue: 12,
      description: '图表左边距',
    },
    marginRight: {
      type: 'number',
      required: false,
      defaultValue: 12,
      description: '图表右边距',
    },
    marginTop: {
      type: 'number',
      required: false,
      defaultValue: 20,
      description: '图表上边距',
    },
    marginBottom: {
      type: 'number',
      required: false,
      defaultValue: 5,
      description: '图表下边距',
    },
    showLegend: {
      type: 'boolean',
      required: false,
      defaultValue: true,
      description: '是否显示图例',
    },
    stacked: {
      type: 'boolean',
      required: false,
      defaultValue: false,
      description: '是否堆叠显示所有柱状',
    },
    barGap: {
      type: 'number',
      required: false,
      defaultValue: 4,
      description: '柱子组之间的间距',
    },
    style: {
      type: 'object',
      required: false,
      defaultValue: {},
      description: '自定义样式',
    },
    width: {
      type: 'number',
      required: false,
      defaultValue: 400,
      description: '图表宽度',
    },
    height: {
      type: 'number',
      required: false,
      defaultValue: 250,
      description: '图表高度',
    },
  },
};

export default BarChartInfo;
