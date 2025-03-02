#!/usr/bin/env node

/**
 * 组件截图工具使用示例
 *
 * 此脚本展示了如何使用组件截图工具生成 BarChart 组件的截图
 */

// 使用方法：
// 1. 首先构建工具: pnpm build:mcp
// 2. 然后运行此示例: node ./scripts/examples/bar-chart-example.mjs

import { execSync } from 'child_process';

// 组件路径
const component = 'BarChart';

// 输出路径
const outputPath = './scripts/examples/bar-chart-screenshot.png';

// 示例数据
const sampleData = [
  { category: '食品', 一季度: 1200, 二季度: 1400, 三季度: 1100, 四季度: 1600 },
  { category: '服装', 一季度: 900, 二季度: 1200, 三季度: 1500, 四季度: 1300 },
  { category: '电子', 一季度: 1500, 二季度: 1700, 三季度: 1900, 四季度: 2100 },
  { category: '家居', 一季度: 800, 二季度: 950, 三季度: 1050, 四季度: 1150 },
  { category: '其他', 一季度: 600, 二季度: 700, 三季度: 650, 四季度: 800 },
];

// 组件属性 (JSON 格式)
const props = JSON.stringify({
  title: '各类别季度销售额',
  subtitle: '2023年度数据',
  data: sampleData,
  xAxisDataKey: 'category',
  bars: [
    {
      dataKey: '一季度',
      name: '第一季度',
      color: 'hsl(var(--chart-1))',
      barSize: 15,
    },
    {
      dataKey: '二季度',
      name: '第二季度',
      color: 'hsl(var(--chart-2))',
      barSize: 15,
    },
    {
      dataKey: '三季度',
      name: '第三季度',
      color: 'hsl(var(--chart-3))',
      barSize: 15,
    },
    {
      dataKey: '四季度',
      name: '第四季度',
      color: 'hsl(var(--chart-4))',
      barSize: 15,
    },
  ],
  showLegend: true,
  stacked: false,
  barGap: 2,
});

// 构建命令
const command = `node dist/scripts/component-screenshot.mjs --component ${component} --output ${outputPath} --width 700 --height 400 --props '${props}' --dark-mode`;

console.log('执行命令:', command);

try {
  // 执行命令
  execSync(command, { stdio: 'inherit' });
  console.log(`\n成功生成截图: ${outputPath}`);
} catch (error) {
  console.error('生成截图失败:', error.message);
  process.exit(1);
}
