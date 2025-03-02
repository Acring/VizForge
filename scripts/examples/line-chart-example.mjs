#!/usr/bin/env node

/**
 * 组件截图工具使用示例
 *
 * 此脚本展示了如何使用组件截图工具生成 LineChart 组件的截图
 */

// 使用方法：
// 1. 首先构建工具: pnpm build:mcp
// 2. 然后运行此示例: node ./scripts/examples/line-chart-example.mjs

import { execSync } from 'child_process';

// 组件路径
const component = 'LineChart';

// 输出路径
const outputPath = './scripts/examples/line-chart-screenshot.png';

// 示例数据
const sampleData = [
  { month: '1月', 销量: 400, 利润: 240, 成本: 160 },
  { month: '2月', 销量: 300, 利润: 180, 成本: 120 },
  { month: '3月', 销量: 500, 利润: 320, 成本: 180 },
  { month: '4月', 销量: 280, 利润: 150, 成本: 130 },
  { month: '5月', 销量: 590, 利润: 360, 成本: 230 },
  { month: '6月', 销量: 430, 利润: 270, 成本: 160 },
];

// 组件属性 (JSON 格式)
const props = JSON.stringify({
  title: '月度销售数据',
  subtitle: '2023年上半年',
  data: sampleData,
  xAxisDataKey: 'month',
  lines: [
    {
      dataKey: '销量',
      name: '销量',
      color: 'hsl(var(--chart-1))',
      type: 'monotone',
      strokeWidth: 2,
      showDot: true,
    },
    {
      dataKey: '利润',
      name: '利润',
      color: 'hsl(var(--chart-2))',
      type: 'monotone',
      strokeWidth: 2,
      showDot: true,
    },
    {
      dataKey: '成本',
      name: '成本',
      color: 'hsl(var(--chart-3))',
      type: 'monotone',
      strokeWidth: 2,
      showDot: false,
    },
  ],
  width: 600,
  height: 400,
  showLegend: true,
});

// 构建命令
const command = `node dist/scripts/component-screenshot.mjs --component ${component} --output ${outputPath} --width 600 --height 400 --props '${props}' --dark-mode`;

console.log('执行命令:', command);

try {
  // 执行命令
  execSync(command, { stdio: 'inherit' });
  console.log(`\n成功生成截图: ${outputPath}`);
} catch (error) {
  console.error('生成截图失败:', error.message);
  process.exit(1);
}
