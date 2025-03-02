import { ComponentInfo } from '../types';
import { PieChart } from '../../src/components/PieChart';

const PieChartInfo: ComponentInfo = {
  component: PieChart,
  description: '饼图组件，用于展示数据的占比分布，支持普通饼图和环形图，可自定义颜色、标签和图例',
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
    slice: {
      type: 'object',
      required: false,
      defaultValue: { dataKey: 'value', nameKey: 'name' },
      description: '饼图扇区配置',
    },
    showLegend: {
      type: 'boolean',
      required: false,
      defaultValue: true,
      description: '是否显示图例',
    },
    showLabels: {
      type: 'boolean',
      required: false,
      defaultValue: true,
      description: '是否显示标签',
    },
    innerRadius: {
      type: 'number',
      required: false,
      defaultValue: 0,
      description: '内半径（用于环形图）',
    },
    outerRadius: {
      type: 'string',
      required: false,
      defaultValue: '70%',
      description: '外半径',
    },
    startAngle: {
      type: 'number',
      required: false,
      defaultValue: 0,
      description: '起始角度（度数）',
    },
    endAngle: {
      type: 'number',
      required: false,
      defaultValue: 360,
      description: '结束角度（度数）',
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
    style: {
      type: 'object',
      required: false,
      defaultValue: {},
      description: '自定义样式',
    },
    width: {
      type: 'number',
      required: false,
      defaultValue: 600,
      description: '图表宽度',
    },
    height: {
      type: 'number',
      required: false,
      defaultValue: 300,
      description: '图表高度',
    },
    cx: {
      type: 'string',
      required: false,
      defaultValue: '50%',
      description: '饼图中心X坐标',
    },
    cy: {
      type: 'string',
      required: false,
      defaultValue: '50%',
      description: '饼图中心Y坐标',
    },
  },
};

export default PieChartInfo;
