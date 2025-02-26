import { ComponentInfo } from '../types';
import { LineChart } from '../../src/components/LineChart';

const LineChartInfo: ComponentInfo = {
  component: LineChart,
  description: '折线图组件，用于展示数据随时间或类别变化的趋势，支持多条线、标题和副标题。如果不提供lines配置，将根据数据自动生成线条',
  propTypes: {
    title: {
      type: 'string',
      required: false,
      defaultValue: undefined,
      description: '图表标题'
    },
    subtitle: {
      type: 'string',
      required: false,
      defaultValue: undefined,
      description: '图表副标题'
    },
    data: {
      type: 'array',
      required: true,
      description: '图表数据数组，每项包含x轴和y轴的数据'
    },
    xAxisDataKey: {
      type: 'string',
      required: true,
      description: 'X轴数据键名'
    },
    lines: {
      type: 'array',
      required: false,
      description: '线条配置数组，用于显示多条线，每项包含dataKey、name、color等配置。如果不提供，将根据数据自动生成'
    },
    excludeDataKeys: {
      type: 'array',
      required: false,
      defaultValue: [],
      description: '要排除的数据键名（不会为这些键生成线条）'
    },
    marginLeft: {
      type: 'number',
      required: false,
      defaultValue: 12,
      description: '图表左边距'
    },
    marginRight: {
      type: 'number',
      required: false,
      defaultValue: 12,
      description: '图表右边距'
    },
    marginTop: {
      type: 'number',
      required: false,
      defaultValue: 20,
      description: '图表上边距'
    },
    marginBottom: {
      type: 'number',
      required: false,
      defaultValue: 5,
      description: '图表下边距'
    },
    showLegend: {
      type: 'boolean',
      required: false,
      defaultValue: true,
      description: '是否显示图例'
    },
    style: {
      type: 'object',
      required: false,
      defaultValue: {},
      description: '自定义样式对象'
    },
    width: {
      type: 'number',
      required: false,
      defaultValue: 400,
      description: '图表宽度'
    },
    height: {
      type: 'number',
      required: false,
      defaultValue: 250,
      description: '图表高度'
    }
  }
};

export default LineChartInfo; 