import { ComponentInfo } from '../types';
import { AreaChart } from '../../src/components/AreaChart';

const AreaChartInfo: ComponentInfo = {
  component: AreaChart,
  description:
    '面积图组件，用于展示数据随时间或类别变化的趋势，支持多个面积、堆叠面积、标题和副标题。如果不提供areas配置，将根据数据自动生成面积',
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
      description: '图表数据数组，每项包含x轴和y轴的数据',
    },
    xAxisDataKey: {
      type: 'string',
      required: true,
      description: 'X轴数据键名',
    },
    areas: {
      type: 'array',
      required: false,
      description:
        '面积配置数组，用于显示多个面积，每项包含dataKey、name、fillColor、strokeColor等配置。如果不提供，将根据数据自动生成',
    },
    excludeDataKeys: {
      type: 'array',
      required: false,
      defaultValue: [],
      description: '要排除的数据键名（不会为这些键生成面积）',
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
      description: '是否堆叠显示所有面积',
    },
    useGradient: {
      type: 'boolean',
      required: false,
      defaultValue: true,
      description: '是否为所有面积使用渐变填充（从颜色到透明）',
    },
    style: {
      type: 'object',
      required: false,
      defaultValue: {},
      description: '自定义样式对象',
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

export default AreaChartInfo;
