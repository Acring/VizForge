import React from 'react';
import { CartesianGrid, Bar, BarChart as RechartsBarChart, XAxis, YAxis, Legend } from 'recharts';

interface DataPoint {
  [key: string]: string | number;
}

/**
 * 柱状配置接口
 */
interface BarConfig {
  /**
   * 数据键名
   */
  dataKey: string;
  /**
   * 柱状名称（用于图例显示）
   */
  name?: string;
  /**
   * 柱状颜色
   */
  color?: string;
  /**
   * 柱状宽度
   */
  barSize?: number;
  /**
   * 是否堆叠显示
   */
  stackId?: string;
  /**
   * 柱状圆角
   */
  radius?: number | [number, number, number, number];
}

interface BarChartProps {
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
   * 柱状配置数组，用于显示多组柱状。如果不提供，将根据数据自动生成
   */
  bars?: BarConfig[];
  /**
   * 要排除的数据键名（不会为这些键生成柱状）
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
   * 是否堆叠显示所有柱状
   */
  stacked?: boolean;
  /**
   * 柱子组之间的间距
   */
  barGap?: number;
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
 * 柱状图组件
 *
 * 用于展示数据分类比较或时间序列数据，支持多组柱状、堆叠柱状、标题和副标题
 * 如果不提供bars配置，将根据数据自动生成柱状
 */
export function BarChart({
  title,
  subtitle,
  data,
  xAxisDataKey,
  bars,
  excludeDataKeys = [],
  marginLeft = 12,
  marginRight = 12,
  marginTop = 20,
  marginBottom = 5,
  showLegend = true,
  stacked = false,
  barGap = 4,
  style,
  width = 600,
  height = 300,
}: BarChartProps) {
  // 默认颜色数组，当柱状未指定颜色时使用
  const defaultColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ];

  // 如果没有提供bars配置，则根据数据自动生成
  const effectiveBars = React.useMemo(() => {
    if (bars && bars.length > 0) {
      return bars;
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

    // 为每个键创建一个柱状配置
    return Array.from(allKeys).map(
      key =>
        ({
          dataKey: key,
          name: key,
          barSize: 20,
          radius: [4, 4, 0, 0],
          stackId: stacked ? 'stack' : undefined,
        }) as BarConfig
    );
  }, [data, bars, xAxisDataKey, excludeDataKeys, stacked]);

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
      <RechartsBarChart
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
        barGap={barGap}
      >
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

        {effectiveBars.map((barConfig, index) => (
          <Bar
            key={barConfig.dataKey}
            dataKey={barConfig.dataKey}
            name={barConfig.name || barConfig.dataKey}
            fill={barConfig.color || defaultColors[index % defaultColors.length]}
            barSize={barConfig.barSize || 20}
            stackId={barConfig.stackId || (stacked ? 'stack' : undefined)}
            radius={barConfig.radius || [4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </div>
  );
}
