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
  definition: "graph TD\n  root[项目根目录] --> src[src/]\n  root --> public[public/]\n  root --> config_files[配置文件]\n  \n  src --> app[app/]\n  src --> components[components/]\n  src --> data[data/]\n  \n  app --> page[page.tsx]\n  app --> flowers[flowers/]\n  app --> layout[layout.tsx]\n  app --> globals_css[globals.css]\n  app --> favicon[favicon.ico]\n  \n  flowers --> id[id/]\n  id --> not_found[not-found.tsx]\n  id --> flower_page[page.tsx]\n  \n  components --> flower_card[FlowerCard.tsx]\n  \n  data --> flowers_ts[flowers.ts]\n  data --> flowers_dir[flowers/]\n  \n  flowers_dir --> flower_basics[flowerBasics.ts]\n  flowers_dir --> flower_details[flowerDetails.ts]\n  flowers_dir --> index[index.ts]\n  \n  public --> images[images/]\n  public --> svg_files[SVG文件]\n  \n  config_files --> package_json[package.json]\n  config_files --> tsconfig[tsconfig.json]\n  config_files --> next_config[next.config.ts]\n  config_files --> postcss_config[postcss.config.mjs]\n  config_files --> eslint_config[eslint.config.mjs]\n  config_files --> next_env[next-env.d.ts]",
  backgroundColor: 'white',
  theme: 'forest',
});

// 构建命令
const command = `node dist/scripts/component-screenshot.mjs --component ${component} --output ${outputPath} --width 1000 --height 1000 --props '${props}' --device-scale-factor 3`;

console.log('执行命令:', command);

try {
  // 执行命令
  execSync(command, { stdio: 'inherit' });
  console.log(`\n成功生成截图: ${outputPath}`);
} catch (error) {
  console.error('生成截图失败:', error.message);
  process.exit(1);
} 