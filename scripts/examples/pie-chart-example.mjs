#!/usr/bin/env node

/**
 * 组件截图工具使用示例
 *
 * 此脚本展示了如何使用组件截图工具生成 PieChart 组件的截图
 */

// 使用方法：
// 1. 首先构建工具: pnpm build:mcp
// 2. 然后运行此示例: node ./scripts/examples/pie-chart-example.mjs

import { execSync } from 'child_process';

// 组件路径
const component = 'PieChart';

// 输出路径
const outputPath = './scripts/examples/pie-chart-screenshot.png';

// 示例数据
const sampleData = [
  { name: '食品', value: 1200 },
  { name: '电子', value: 1800 },
  { name: '服装', value: 1400 },
  { name: '家居', value: 1100 },
  { name: '美妆', value: 1600 },
  { name: '图书', value: 900 },
];

// 组件属性 (JSON 格式)
const props = JSON.stringify({
  title: '各品类销售额占比',
  subtitle: '2023年度数据',
  data: sampleData,
  slice: {
    nameKey: 'name',
    dataKey: 'value',
  },
  showLegend: true,
  showLabels: true,
  showTooltip: true,
  innerRadius: 60, // 设置为环形图
  outerRadius: '80%',
  width: 700,
  height: 400,
  cx: '50%', // 设置饼图中心X坐标
  cy: '50%', // 设置饼图中心Y坐标
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
