#!/usr/bin/env node

/**
 * 组件截图工具使用示例
 *
 * 此脚本展示了如何使用组件截图工具生成 RadarChart 组件的截图
 */

// 使用方法：
// 1. 首先构建工具: pnpm build:mcp
// 2. 然后运行此示例: node ./scripts/examples/radar-chart-example.mjs

import { execSync } from 'child_process';

// 组件路径
const component = 'RadarChart';

// 输出路径
const outputPath = './scripts/examples/radar-chart-screenshot.png';

// 示例数据
const sampleData = [
  { subject: '数学', A: 120, B: 110, C: 140 },
  { subject: '语文', A: 98, B: 130, C: 100 },
  { subject: '英语', A: 86, B: 130, C: 90 },
  { subject: '物理', A: 99, B: 100, C: 120 },
  { subject: '化学', A: 85, B: 90, C: 110 },
  { subject: '生物', A: 65, B: 85, C: 100 },
];

// 组件属性 (JSON 格式)
const props = JSON.stringify({
  title: '学生能力评估',
  subtitle: '三名学生在各科目的表现',
  data: sampleData,
  angleAxisDataKey: 'subject',
  radars: [
    {
      dataKey: 'A',
      name: '学生A',
      strokeColor: 'hsl(var(--chart-1))',
      fillColor: 'hsl(var(--chart-1))',
      fillOpacity: 0.5,
    },
    {
      dataKey: 'B',
      name: '学生B',
      strokeColor: 'hsl(var(--chart-2))',
      fillColor: 'hsl(var(--chart-2))',
      fillOpacity: 0.5,
    },
    {
      dataKey: 'C',
      name: '学生C',
      strokeColor: 'hsl(var(--chart-3))',
      fillColor: 'hsl(var(--chart-3))',
      fillOpacity: 0.5,
    },
  ],
  showLegend: true,
  showGrid: true,
  showRadiusAxis: false,
  width: 700,
  height: 500,
});

// 构建命令
const command = `node dist/scripts/component-screenshot.mjs --component ${component} --output ${outputPath} --width 700 --height 500 --props '${props}' --dark-mode`;

console.log('执行命令:', command);

try {
  // 执行命令
  execSync(command, { stdio: 'inherit' });
  console.log(`\n成功生成截图: ${outputPath}`);
} catch (error) {
  console.error('生成截图失败:', error.message);
  process.exit(1);
}
