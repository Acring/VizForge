import React from "react";
import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, YAxis, Legend } from "recharts";

interface DataPoint {
  [key: string]: string | number;
}

/**
 * 线条配置接口
 */
interface LineConfig {
  /**
   * 数据键名
   */
  dataKey: string;
  /**
   * 线条名称（用于图例显示）
   */
  name?: string;
  /**
   * 线条颜色
   */
  color?: string;
  /**
   * 线条宽度
   */
  strokeWidth?: number;
  /**
   * 是否显示数据点
   */
  showDot?: boolean;
  /**
   * 线条类型
   */
  type?: "linear" | "natural" | "monotone" | "step" | "stepBefore" | "stepAfter";
}

interface LineChartProps {
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
   * 线条配置数组，用于显示多条线。如果不提供，将根据数据自动生成
   */
  lines?: LineConfig[];
  /**
   * 要排除的数据键名（不会为这些键生成线条）
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
 * 折线图组件
 * 
 * 用于展示数据随时间或类别变化的趋势，支持多条线、标题和副标题
 * 如果不提供lines配置，将根据数据自动生成线条
 */
export function LineChart({
  title,
  subtitle,
  data,
  xAxisDataKey,
  lines,
  excludeDataKeys = [],
  marginLeft = 12,
  marginRight = 12,
  marginTop = 20,
  marginBottom = 5,
  showLegend = true,
  style,
  width = 400,
  height = 250,
}: LineChartProps) {
  // 默认颜色数组，当线条未指定颜色时使用
  const defaultColors = [
    "hsl(var(--chart-1))", 
    "hsl(var(--chart-2))", 
    "hsl(var(--chart-3))", 
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))"
  ];

  // 如果没有提供lines配置，则根据数据自动生成
  const effectiveLines = React.useMemo(() => {
    if (lines && lines.length > 0) {
      return lines;
    }

    // 从数据中提取所有可能的键
    const allKeys = new Set<string>();
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== xAxisDataKey && !excludeDataKeys.includes(key) && typeof item[key] === 'number') {
          allKeys.add(key);
        }
      });
    });

    // 为每个键创建一个线条配置
    return Array.from(allKeys).map(key => ({
      dataKey: key,
      name: key,
      type: "natural" as const,
      showDot: false,
      strokeWidth: 2
    } as LineConfig));
  }, [data, lines, xAxisDataKey, excludeDataKeys]);

  return (
    <div className="w-full h-full" style={{
      width: width,
      height: height,
      ...style
    }}>
      {(title || subtitle) && (
        <div className="mb-2 pl-3">
          {title && <h3 className="m-0 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
          {subtitle && <p className="mt-1 mb-0 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}
        <RechartsLineChart
          width={width}
          height={title || subtitle ? height - 60 : height}
          accessibilityLayer
          data={data}
          margin={{
            left: marginLeft,
            right: marginRight,
            top: marginTop,
            bottom: marginBottom,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-gray-500" />
          <YAxis className="text-xs text-gray-600" width={30}/>
          <XAxis
            dataKey={xAxisDataKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => typeof value === 'string' ? value.slice(0, 3) : value}
            className="text-xs text-gray-600"
          />
          {showLegend && <Legend wrapperStyle={{ paddingTop: 10, position: 'relative' }} />}
          
          {effectiveLines.map((lineConfig, index) => (
            <Line
              key={lineConfig.dataKey}
              dataKey={lineConfig.dataKey}
              name={lineConfig.name || lineConfig.dataKey}
              type={lineConfig.type || "natural"}
              stroke={lineConfig.color || defaultColors[index % defaultColors.length]}
              strokeWidth={lineConfig.strokeWidth || 2}
              dot={lineConfig.showDot || false}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
    </div>
  );
} 