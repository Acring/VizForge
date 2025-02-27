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
const component = 'MermaidRenderer';

// 输出路径
const outputPath = 'mermaid-renderer-screenshot.png';

// 组件属性 (JSON 格式)
const props = JSON.stringify({
  definition: "sequenceDiagram\n    autonumber\n    participant 用户\n    participant 浏览器\n    participant 认证服务\n    participant 数据库\n\n    用户->>浏览器: 输入用户名和密码\n    浏览器->>认证服务: 发送登录请求\n    认证服务->>数据库: 查询用户信息\n    数据库-->>认证服务: 返回用户数据\n\n    alt 登录成功\n        认证服务->>认证服务: 生成JWT令牌\n        认证服务-->>浏览器: 返回JWT令牌和用户信息\n        浏览器-->>用户: 显示登录成功，跳转到首页\n    else 登录失败\n        认证服务-->>浏览器: 返回错误信息\n        浏览器-->>用户: 显示错误提示\n    end\n\n    note over 浏览器,认证服务: 使用HTTPS加密通信",
  backgroundColor: 'white',
  theme: 'forest',
});

// 构建命令
const command = `node dist/scripts/component-screenshot.mjs --component ${component} --output ${outputPath} --props '${props}'`;

console.log('执行命令:', command);

try {
  // 执行命令
  execSync(command, { stdio: 'inherit' });
  console.log(`\n成功生成截图: ${outputPath}`);
} catch (error) {
  console.error('生成截图失败:', error.message);
  process.exit(1);
} 