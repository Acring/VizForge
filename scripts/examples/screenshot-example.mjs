#!/usr/bin/env node

/**
 * 组件截图工具使用示例
 * 
 * 此脚本展示了如何使用组件截图工具生成 HelloWorld 组件的截图
 */

// 使用方法：
// 1. 首先构建工具: pnpm build:screenshot
// 2. 然后运行此示例: node mcp/examples/screenshot-example.js

import { execSync } from 'child_process';

// 组件路径
const component = 'HelloWorld';

// 输出路径
const outputPath = 'helloworld-screenshot.png';

// 组件属性 (JSON 格式)
const props = JSON.stringify({
  name: '组件截图工具',
  textColor: 'green',
  fontSize: '1.5rem'
});

// 构建命令
const command = `node dist/scripts/component-screenshot.mjs --component ${component} --output ${outputPath} --width 400 --height 400 --props '${props}'`;

console.log('执行命令:', command);

try {
  // 执行命令
  execSync(command, { stdio: 'inherit' });
  console.log(`\n成功生成截图: ${outputPath}`);
} catch (error) {
  console.error('生成截图失败:', error.message);
  process.exit(1);
} 