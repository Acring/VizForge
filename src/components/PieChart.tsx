import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';

interface DataPoint {
  [key: string]: string | number;
}

/**
 * 饼图扇区配置接口
 */
interface PieSliceConfig {
  /**
   * 数据键名
   */
  dataKey: string;
  /**
   * 名称键名（用于显示每个扇区的名称）
   */
  nameKey: string;
  /**
   * 扇区颜色
   */
  color?: string;
}

interface PieChartProps {
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
   * 饼图扇区配置
   */
  slice?: PieSliceConfig;
  /**
   * 是否显示图例
   */
  showLegend?: boolean;
  /**
   * 是否显示标签
   */
  showLabels?: boolean;
  /**
   * 内半径（用于环形图）
   */
  innerRadius?: number;
  /**
   * 外半径
   */
  outerRadius?: number | string;
  /**
   * 起始角度（度数）
   */
  startAngle?: number;
  /**
   * 结束角度（度数）
   */
  endAngle?: number;
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
  /**
   * 饼图中心X坐标
   */
  cx?: string | number;
  /**
   * 饼图中心Y坐标
   */
  cy?: string | number;
}

/**
 * 饼图组件
 *
 * 用于展示数据的占比分布，支持普通饼图和环形图，可自定义颜色、标签和图例
 */
export function PieChart({
  title,
  subtitle,
  data,
  slice = { dataKey: 'value', nameKey: 'name' },
  showLegend = true,
  showLabels = true,
  innerRadius = 0,
  outerRadius = 70,
  startAngle = 0,
  endAngle = 360,
  marginLeft = 12,
  marginRight = 12,
  marginTop = 20,
  marginBottom = 5,
  style,
  width = 600,
  height = 300,
  cx = '50%',
  cy = '50%',
}: PieChartProps) {
  // 默认颜色数组，当扇区未指定颜色时使用
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
      <RechartsPieChart
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
        {showLegend && (
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: 10, position: 'relative' }}
          />
        )}
        <Pie
          isAnimationActive={false}
          data={data}
          dataKey={slice.dataKey}
          nameKey={slice.nameKey}
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          label={showLabels}
          labelLine={showLabels}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={slice.color || defaultColors[index % defaultColors.length]}
            />
          ))}
        </Pie>
      </RechartsPieChart>
    </div>
  );
}
