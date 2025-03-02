import { ComponentInfo } from '../types';
import { RadarChart } from '../../src/components/RadarChart';

const RadarChartInfo: ComponentInfo = {
  component: RadarChart,
  description: '雷达图组件，用于展示多维度数据的比较，每个维度沿着从中心发散的轴进行表示',
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
    radars: {
      type: 'array',
      required: false,
      defaultValue: undefined,
      description: '雷达图配置数组，用于显示多个雷达。如果不提供，将根据数据自动生成',
    },
    excludeDataKeys: {
      type: 'array',
      required: false,
      defaultValue: [],
      description: '要排除的数据键名（不会为这些键生成雷达）',
    },
    angleAxisDataKey: {
      type: 'string',
      required: true,
      description: '角度轴数据键名（用于显示雷达图的各个维度）',
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
    showGrid: {
      type: 'boolean',
      required: false,
      defaultValue: true,
      description: '是否显示极坐标网格',
    },
    showRadiusAxis: {
      type: 'boolean',
      required: false,
      defaultValue: false,
      description: '是否显示极坐标半径轴',
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
      defaultValue: 300,
      description: '图表高度',
    },
  },
};

export default RadarChartInfo;
