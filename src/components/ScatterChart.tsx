import React from 'react';
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ZAxis,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  [key: string]: string | number;
}

/**
 * 散点配置接口
 */
interface ScatterConfig {
  /**
   * 数据键名（X轴）
   */
  xDataKey: string;
  /**
   * 数据键名（Y轴）
   */
  yDataKey: string;
  /**
   * 数据键名（Z轴，用于控制点的大小）
   */
  zDataKey?: string;
  /**
   * 散点名称
   */
  name: string;
  /**
   * 散点颜色
   */
  color?: string;
  /**
   * 散点填充颜色
   */
  fill?: string;
  /**
   * 散点形状
   */
  shape?: 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye';
}

interface ScatterChartProps {
  /**
   * 图表标题
   */
  title?: string;
  /**
   * 图表副标题
   */
  subtitle?: string;
  /**
   * 图表数据
   */
  data: DataPoint[];
  /**
   * 散点配置数组
   */
  scatters?: ScatterConfig[];
  /**
   * 是否显示网格线
   */
  showGrid?: boolean;
  /**
   * 是否显示图例
   */
  showLegend?: boolean;
  /**
   * 是否显示工具提示
   */
  showTooltip?: boolean;
  /**
   * X轴标签
   */
  xAxisLabel?: string;
  /**
   * Y轴标签
   */
  yAxisLabel?: string;
  /**
   * 图表左边距
   */
  marginLeft?: number;
  /**
   * 图表右边距
   */
  marginRight?: number;
  /**
   * 图表上边距
   */
  marginTop?: number;
  /**
   * 图表下边距
   */
  marginBottom?: number;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 图表宽度
   */
  width?: number;
  /**
   * 图表高度
   */
  height?: number;
}

/**
 * 散点图组件
 *
 * 用于展示数据点在二维空间中的分布，可选择性地使用第三维度（Z轴）来表示点的大小
 */
export function ScatterChart({
  title,
  subtitle,
  data,
  scatters = [],
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  xAxisLabel,
  yAxisLabel,
  marginLeft = 12,
  marginRight = 12,
  marginTop = 20,
  marginBottom = 5,
  style,
  width = 600,
  height = 300,
}: ScatterChartProps) {
  // 默认颜色数组，当散点未指定颜色时使用
  const defaultColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    'hsl(var(--chart-6))',
    'hsl(var(--chart-7))',
    'hsl(var(--chart-8))',
  ];

  // 如果没有提供散点配置，则自动生成
  const scatterConfigs = scatters.length > 0 ? scatters : autoGenerateScatters(data);

  // 计算图表内容区域的高度
  const contentHeight = title || subtitle ? height - 94 : height;

  return (
    <div
      className="w-full h-full"
      style={{
        width: width,
        height: height,
        ...style,
      }}
    >
      {(title || subtitle) && (
        <div className="mb-2 pl-3">
          {title && (
            <h3 className="m-0 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-1 mb-0 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
      )}
      <RechartsScatterChart
        width={width}
        height={contentHeight}
        accessibilityLayer
        margin={{
          left: marginLeft,
          right: marginRight,
          top: marginTop,
          bottom: marginBottom,
        }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis
          dataKey={scatterConfigs[0]?.xDataKey}
          type="number"
          name={xAxisLabel}
          label={
            xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5 } : undefined
          }
        />
        <YAxis
          dataKey={scatterConfigs[0]?.yDataKey}
          type="number"
          name={yAxisLabel}
          label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
        />
        {showTooltip && <Tooltip cursor={{ strokeDasharray: '3 3' }} />}
        {showLegend && (
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: 10, position: 'relative' }}
          />
        )}

        {scatterConfigs.map((scatter, index) => (
          <Scatter
            key={`scatter-${index}`}
            name={scatter.name}
            data={data}
            fill={scatter.fill || scatter.color || defaultColors[index % defaultColors.length]}
            line={false}
            shape={scatter.shape || 'circle'}
            isAnimationActive={false}
          >
            {scatter.zDataKey && <ZAxis dataKey={scatter.zDataKey} range={[20, 100]} />}
          </Scatter>
        ))}
      </RechartsScatterChart>
    </div>
  );
}

/**
 * 自动生成散点配置
 * @param data 数据数组
 * @returns 散点配置数组
 */
function autoGenerateScatters(data: DataPoint[]): ScatterConfig[] {
  if (!data || data.length === 0) return [];

  // 获取第一个数据点的所有键
  const keys = Object.keys(data[0]);

  // 至少需要两个数值类型的键来创建散点图
  const numericKeys = keys.filter(key => typeof data[0][key] === 'number');

  if (numericKeys.length < 2) return [];

  // 使用前两个数值键作为 x 和 y
  return [
    {
      xDataKey: numericKeys[0],
      yDataKey: numericKeys[1],
      name: `${numericKeys[0]} vs ${numericKeys[1]}`,
      zDataKey: numericKeys.length > 2 ? numericKeys[2] : undefined,
    },
  ];
}
