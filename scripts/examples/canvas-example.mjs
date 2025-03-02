#!/usr/bin/env node

/**
 * 组件截图工具使用示例
 *
 * 此脚本展示了如何使用组件截图工具生成 CanvasRenderer 组件的截图
 */

// 使用方法：
// 1. 首先构建工具: pnpm build:mcp
// 2. 然后运行此示例: node ./scripts/examples/canvas-example.js

import { execSync } from 'child_process';

// 组件路径
const component = 'CanvasRenderer';

// 输出路径
const outputPath = './scripts/examples/canvas-renderer-screenshot.png';

// 组件属性 (JSON 格式)
const props = JSON.stringify({
  drawCode:
    '// 设置白色背景\nctx.fillStyle = "white";\nctx.fillRect(0, 0, canvas.width, canvas.height);\n\n// 重置填充颜色为黑色（用于后续文字）\nctx.fillStyle = "black";\n\n// 绘制文字\nctx.font = "30px Impact";\nctx.rotate(0.1);\nctx.fillText("Canvas Render", 50, 100);\n\n// 绘制线条\nvar text = ctx.measureText("Canvas Render");\nctx.strokeStyle = "rgba(0,0,0,0.5)";\nctx.beginPath();\nctx.lineTo(50, 102);\nctx.lineTo(50 + text.width, 102);\nctx.stroke();',
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
