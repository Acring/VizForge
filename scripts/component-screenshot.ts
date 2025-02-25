#!/usr/bin/env node

import path from 'path';
import { program } from 'commander';
import { ComponentScreenshotGenerator } from '../mcp/screenshotService';

// 定义命令行参数
program
  .name('component-screenshot')
  .description('将 React 组件渲染为截图')
  .requiredOption('-c, --component <name>', '组件名称')
  .option('-o, --output <path>', '输出图片的路径', 'screenshot.png')
  .option('-w, --width <number>', '视口宽度', '800')
  .option('-h, --height <number>', '视口高度', '600')
  .option('-p, --props <json>', '传递给组件的属性 (JSON 格式)', '{}')
  .option('-d, --dark-mode', '使用深色模式', false)
  .option('-t, --tailwind-config <path>', 'Tailwind 配置文件路径', path.resolve(process.cwd(), 'tailwind.config.ts'))
  .parse(process.argv);

const options = program.opts();

async function generateScreenshot() {
  try {
    // 创建截图生成器实例
    const screenshotGenerator = new ComponentScreenshotGenerator();
    
    // 获取可用组件列表
    const availableComponents = screenshotGenerator.getRegisteredComponents();
    console.log(`可用组件: ${Object.keys(availableComponents).join(', ')}`);
    
    // 解析命令行参数
    const componentName = options.component;
    const outputPath = options.output;
    const width = parseInt(options.width);
    const height = parseInt(options.height);
    const props = JSON.parse(options.props);
    const darkMode = options.darkMode == true;
    
    console.log('正在生成组件截图...');
    console.log(`- 组件: ${componentName}`);
    console.log(`- 输出路径: ${outputPath}`);
    console.log(`- 尺寸: ${width}x${height}`);
    console.log(`- 属性: ${JSON.stringify(props)}`);
    console.log(`- 深色模式: ${darkMode ? '是' : '否'}`);
    
    // 生成截图
    const result = await screenshotGenerator.generateScreenshot({
      componentName,
      outputPath,
      width,
      height,
      props,
      darkMode,
      deviceScaleFactor: 2
    });
    
    console.log(`✅ 截图已保存到: ${result.outputPath}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ 生成截图时出错:', error);
    process.exit(1);
  }
}

// 运行截图函数
generateScreenshot(); 