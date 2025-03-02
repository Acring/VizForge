import React from 'react';
import {
  CartesianGrid,
  Area,
  AreaChart as RechartsAreaChart,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';

interface DataPoint {
  [key: string]: string | number;
}

/**
 * 面积配置接口
 */
interface AreaConfig {
  /**
   * 数据键名
   */
  dataKey: string;
  /**
   * 面积名称（用于图例显示）
   */
  name?: string;
  /**
   * 面积填充颜色
   */
  fillColor?: string;
  /**
   * 面积边线颜色
   */
  strokeColor?: string;
  /**
   * 边线宽度
   */
  strokeWidth?: number;
  /**
   * 是否显示数据点
   */
  showDot?: boolean;
  /**
   * 线条类型
   */
  type?: 'linear' | 'natural' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter';
  /**
   * 是否堆叠显示
   */
  stackId?: string;
  /**
   * 填充透明度
   */
  fillOpacity?: number;
  /**
   * 是否使用渐变填充
   */
  useGradient?: boolean;
}

interface AreaChartProps {
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
   * X轴数据键名
   */
  xAxisDataKey: string;
  /**
   * 面积配置数组，用于显示多个面积。如果不提供，将根据数据自动生成
   */
  areas?: AreaConfig[];
  /**
   * 要排除的数据键名（不会为这些键生成面积）
   */
  excludeDataKeys?: string[];
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
   * 是否显示图例
   */
  showLegend?: boolean;
  /**
   * 是否堆叠显示所有面积
   */
  stacked?: boolean;
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
  /**
   * 是否为所有面积使用渐变填充
   */
  useGradient?: boolean;
}

/**
 * 面积图组件
 *
 * 用于展示数据随时间或类别变化的趋势，支持多个面积、堆叠面积、标题和副标题
 * 如果不提供areas配置，将根据数据自动生成面积
 */
export function AreaChart({
  title,
  subtitle,
  data,
  xAxisDataKey,
  areas,
  excludeDataKeys = [],
  marginLeft = 12,
  marginRight = 12,
  marginTop = 20,
  marginBottom = 5,
  showLegend = true,
  stacked = false,
  style,
  width = 400,
  height = 250,
  useGradient = true,
}: AreaChartProps) {
  // 默认颜色数组，当面积未指定颜色时使用
  const defaultColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ];

  // 如果没有提供areas配置，则根据数据自动生成
  const effectiveAreas = React.useMemo(() => {
    if (areas && areas.length > 0) {
      return areas;
    }

    // 从数据中提取所有可能的键
    const allKeys = new Set<string>();
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (
          key !== xAxisDataKey &&
          !excludeDataKeys.includes(key) &&
          typeof item[key] === 'number'
        ) {
          allKeys.add(key);
        }
      });
    });

    // 为每个键创建一个面积配置
    return Array.from(allKeys).map(
      key =>
        ({
          dataKey: key,
          name: key,
          type: 'natural' as const,
          showDot: false,
          strokeWidth: 2,
          fillOpacity: 0.6,
          stackId: stacked ? 'stack' : undefined,
          useGradient: true,
        }) as AreaConfig
    );
  }, [data, areas, xAxisDataKey, excludeDataKeys, stacked]);

  // 生成唯一ID，用于渐变定义
  const gradientId = React.useId();

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
      <RechartsAreaChart
        width={width}
        height={title || subtitle ? height - 94 : height}
        accessibilityLayer
        data={data}
        margin={{
          left: marginLeft,
          right: marginRight,
          top: marginTop,
          bottom: marginBottom,
        }}
      >
        <defs>
          {effectiveAreas.map((areaConfig, index) => {
            const color = areaConfig.fillColor || defaultColors[index % defaultColors.length];
            const shouldUseGradient =
              areaConfig.useGradient !== undefined ? areaConfig.useGradient : useGradient;

            if (shouldUseGradient) {
              return (
                <linearGradient
                  key={`${gradientId}-${index}`}
                  id={`${gradientId}-${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              );
            }
            return null;
          })}
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-gray-500" />
        <YAxis className="text-xs text-gray-600" width={30} />
        <XAxis
          dataKey={xAxisDataKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={value => (typeof value === 'string' ? value.slice(0, 3) : value)}
          className="text-xs text-gray-600"
        />
        {showLegend && <Legend wrapperStyle={{ paddingTop: 10, position: 'relative' }} />}

        {effectiveAreas.map((areaConfig, index) => {
          const color = areaConfig.fillColor || defaultColors[index % defaultColors.length];
          const shouldUseGradient =
            areaConfig.useGradient !== undefined ? areaConfig.useGradient : useGradient;

          return (
            <Area
              key={areaConfig.dataKey}
              dataKey={areaConfig.dataKey}
              name={areaConfig.name || areaConfig.dataKey}
              type={areaConfig.type || 'natural'}
              stroke={areaConfig.strokeColor || color}
              fill={shouldUseGradient ? `url(#${gradientId}-${index})` : color}
              strokeWidth={areaConfig.strokeWidth || 2}
              dot={areaConfig.showDot || false}
              activeDot={{ r: 6 }}
              stackId={areaConfig.stackId || (stacked ? 'stack' : undefined)}
              fillOpacity={shouldUseGradient ? 1 : areaConfig.fillOpacity || 0.6}
            />
          );
        })}
      </RechartsAreaChart>
    </div>
  );
}
