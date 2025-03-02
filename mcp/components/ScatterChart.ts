import { ComponentInfo } from '../types';
import { ScatterChart } from '../../src/components/ScatterChart';

const ScatterChartInfo: ComponentInfo = {
  component: ScatterChart,
  description:
    '散点图组件，用于展示数据点在二维空间中的分布，可选择性地使用第三维度（Z轴）来表示点的大小。如果不提供scatters配置，将根据数据自动生成散点配置',
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
      description: '图表数据数组，每项包含X轴和Y轴的数据点',
    },
    scatters: {
      type: 'array',
      required: false,
      description:
        '散点配置数组，用于显示多组散点，每项包含xDataKey、yDataKey、zDataKey、name、color等配置。如果不提供，将根据数据自动生成',
    },
    showGrid: {
      type: 'boolean',
      required: false,
      defaultValue: true,
      description: '是否显示网格线',
    },
    showLegend: {
      type: 'boolean',
      required: false,
      defaultValue: true,
      description: '是否显示图例',
    },
    showTooltip: {
      type: 'boolean',
      required: false,
      defaultValue: true,
      description: '是否显示工具提示',
    },
    xAxisLabel: {
      type: 'string',
      required: false,
      defaultValue: undefined,
      description: 'X轴标签',
    },
    yAxisLabel: {
      type: 'string',
      required: false,
      defaultValue: undefined,
      description: 'Y轴标签',
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
      description: '自定义样式对象',
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
  },
};

export default ScatterChartInfo;
