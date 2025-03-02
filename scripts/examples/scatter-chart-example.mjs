#!/usr/bin/env node

/**
 * 组件截图工具使用示例
 *
 * 此脚本展示了如何使用组件截图工具生成 ScatterChart 组件的截图
 */

// 使用方法：
// 1. 首先构建工具: pnpm build:mcp
// 2. 然后运行此示例: node ./scripts/examples/scatter-chart-example.mjs

import { execSync } from 'child_process';

// 组件路径
const component = 'ScatterChart';

// 输出路径
const outputPath = './scripts/examples/scatter-chart-screenshot.png';

// 示例数据 - 学生学习时间与成绩关系
const sampleData = [
  { 学习时间: 2, 成绩: 65, 出勤率: 75, 学生: '学生1' },
  { 学习时间: 3, 成绩: 70, 出勤率: 80, 学生: '学生2' },
  { 学习时间: 4, 成绩: 75, 出勤率: 85, 学生: '学生3' },
  { 学习时间: 5, 成绩: 80, 出勤率: 90, 学生: '学生4' },
  { 学习时间: 6, 成绩: 85, 出勤率: 95, 学生: '学生5' },
  { 学习时间: 7, 成绩: 90, 出勤率: 100, 学生: '学生6' },
  { 学习时间: 2.5, 成绩: 68, 出勤率: 78, 学生: '学生7' },
  { 学习时间: 3.5, 成绩: 72, 出勤率: 82, 学生: '学生8' },
  { 学习时间: 4.5, 成绩: 78, 出勤率: 88, 学生: '学生9' },
  { 学习时间: 5.5, 成绩: 82, 出勤率: 92, 学生: '学生10' },
  { 学习时间: 6.5, 成绩: 88, 出勤率: 97, 学生: '学生11' },
  { 学习时间: 3, 成绩: 65, 出勤率: 75, 学生: '学生12' },
  { 学习时间: 4, 成绩: 68, 出勤率: 80, 学生: '学生13' },
  { 学习时间: 5, 成绩: 72, 出勤率: 85, 学生: '学生14' },
  { 学习时间: 6, 成绩: 75, 出勤率: 90, 学生: '学生15' },
];

// 组件属性 (JSON 格式)
const props = JSON.stringify({
  title: '学习时间与成绩关系',
  subtitle: '点的大小表示出勤率',
  data: sampleData,
  scatters: [
    {
      xDataKey: '学习时间',
      yDataKey: '成绩',
      zDataKey: '出勤率',
      name: '学生数据',
      color: 'hsl(var(--chart-1))',
    },
  ],
  xAxisLabel: '每日学习时间（小时）',
  yAxisLabel: '考试成绩',
  showGrid: true,
  showLegend: true,
  showTooltip: true,
  width: 600,
  height: 400,
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
