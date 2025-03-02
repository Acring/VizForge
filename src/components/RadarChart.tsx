import React from 'react';
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';

interface DataPoint {
  [key: string]: string | number;
}

/**
 * 雷达图配置接口
 */
interface RadarConfig {
  /**
   * 数据键名
   */
  dataKey: string;
  /**
   * 雷达名称（用于图例显示）
   */
  name?: string;
  /**
   * 雷达区域填充颜色
   */
  fillColor?: string;
  /**
   * 雷达边框颜色
   */
  strokeColor?: string;
  /**
   * 边框宽度
   */
  strokeWidth?: number;
  /**
   * 填充透明度
   */
  fillOpacity?: number;
}

interface RadarChartProps {
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
   * 雷达图配置数组，用于显示多个雷达。如果不提供，将根据数据自动生成
   */
  radars?: RadarConfig[];
  /**
   * 要排除的数据键名（不会为这些键生成雷达）
   */
  excludeDataKeys?: string[];
  /**
   * 角度轴数据键名（用于显示雷达图的各个维度）
   */
  angleAxisDataKey: string;
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
   * 是否显示极坐标网格
   */
  showGrid?: boolean;
  /**
   * 是否显示极坐标半径轴
   */
  showRadiusAxis?: boolean;
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
 * 雷达图组件
 *
 * 用于展示多维度数据的比较，每个维度沿着从中心发散的轴进行表示
 * 如果不提供radars配置，将根据数据自动生成雷达
 */
export function RadarChart({
  title,
  subtitle,
  data,
  angleAxisDataKey,
  radars,
  excludeDataKeys = [],
  marginLeft = 12,
  marginRight = 12,
  marginTop = 20,
  marginBottom = 5,
  showLegend = true,
  showGrid = true,
  showRadiusAxis = false,
  style,
  width = 400,
  height = 300,
}: RadarChartProps) {
  // 默认颜色数组，当雷达未指定颜色时使用
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

  // 如果没有提供radars配置，则根据数据自动生成
  const effectiveRadars = React.useMemo(() => {
    if (radars && radars.length > 0) {
      return radars;
    }

    // 从数据中提取所有可能的键
    const allKeys = new Set<string>();
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (
          key !== angleAxisDataKey &&
          !excludeDataKeys.includes(key) &&
          typeof item[key] === 'number'
        ) {
          allKeys.add(key);
        }
      });
    });

    // 为每个键创建一个雷达配置
    return Array.from(allKeys).map(
      key =>
        ({
          dataKey: key,
          name: key,
          strokeWidth: 2,
          fillOpacity: 0.6,
        }) as RadarConfig
    );
  }, [data, radars, angleAxisDataKey, excludeDataKeys]);

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
      <RechartsRadarChart
        width={width}
        height={contentHeight}
        accessibilityLayer
        data={data}
        margin={{
          left: marginLeft,
          right: marginRight,
          top: marginTop,
          bottom: marginBottom,
        }}
      >
        {showGrid && <PolarGrid className="stroke-gray-300" />}
        <PolarAngleAxis dataKey={angleAxisDataKey} className="text-xs text-gray-600" />
        {showRadiusAxis && <PolarRadiusAxis className="text-xs text-gray-600" />}

        {showLegend && <Legend wrapperStyle={{ paddingTop: 10, position: 'relative' }} />}

        {effectiveRadars.map((radarConfig, index) => {
          const color = radarConfig.strokeColor || defaultColors[index % defaultColors.length];
          const fillColor = radarConfig.fillColor || color;

          return (
            <Radar
              key={radarConfig.dataKey}
              dataKey={radarConfig.dataKey}
              name={radarConfig.name || radarConfig.dataKey}
              stroke={color}
              fill={fillColor}
              strokeWidth={radarConfig.strokeWidth || 2}
              fillOpacity={radarConfig.fillOpacity || 0.6}
              isAnimationActive={false}
            />
          );
        })}
      </RechartsRadarChart>
    </div>
  );
}
