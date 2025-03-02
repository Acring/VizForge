/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer, { Browser, Page } from 'puppeteer';
import React, { ComponentType } from 'react';
import { renderToString } from 'react-dom/server';
import ComponentMap from './componentMap';
import { ComponentInfo } from './types';
import { createCanvas } from 'canvas';
import vm from 'vm';
import { run } from '@mermaid-js/mermaid-cli';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 定义 HelloWorld 组件的属性类型
interface HelloWorldProps {
  name?: string;
  color?: string;
  fontSize?: string;
  className?: string;
}

// 组件映射表
interface ScreenshotOptions {
  componentName: string;
  outputPath?: string;
  width?: number;
  height?: number;
  props?: Record<string, unknown>;
  darkMode?: boolean;
  deviceScaleFactor?: number;
}

// Mermaid 图表生成选项
interface MermaidOptions {
  definition: string;
  outputPath?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  theme?: 'default' | 'forest' | 'dark' | 'neutral';
  deviceScaleFactor?: number;
}

class ComponentScreenshotGenerator {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private tempHtmlPath: string = '';
  private componentMap: Record<string, ComponentInfo> = ComponentMap;

  constructor() {}

  /**
   * 生成组件截图
   */
  public async generateScreenshot(options: ScreenshotOptions): Promise<{
    outputPath: string;
    base64: string;
    mimeType: string;
  }> {
    try {
      const {
        componentName,
        outputPath = 'screenshot.png',
        width = 800,
        height = 600,
        props = {},
        darkMode = true,
        deviceScaleFactor = 3,
      } = options;

      // 从组件映射中获取组件
      // console.log(`正在获取组件: ${componentName}`);

      const componentInfo = this.componentMap[componentName];

      if (!componentInfo) {
        throw new Error(
          `找不到组件: ${componentName}。可用组件: ${Object.keys(this.componentMap).join(', ')}`
        );
      }

      // 特殊处理 CanvasRenderer 组件，使用 node-canvas 直接渲染
      if (componentName === 'CanvasRenderer') {
        return this.generateCanvasScreenshot(outputPath, width, height, props);
      }

      // 特殊处理 Mermaid 组件，使用 mermaid-cli 直接渲染
      if (componentName === 'MermaidRenderer') {
        return this.generateMermaidDiagram({
          definition: props.definition as string,
          outputPath,
          width,
          height,
          backgroundColor: props.backgroundColor as string,
          theme: props.theme as 'default' | 'forest' | 'dark' | 'neutral',
          deviceScaleFactor,
        });
      }

      const Component = componentInfo.component;
      if (!Component) {
        throw new Error(
          `找不到组件: ${componentName}。可用组件: ${Object.keys(this.componentMap).join(', ')}`
        );
      }

      // 创建 HTML 文件
      await this.createHtmlFile(
        Component,
        {
          width: width,
          height: height,
          ...props,
        },
        darkMode
      );

      // 启动浏览器
      await this.setupBrowser(width, height, deviceScaleFactor, darkMode);

      // 加载 HTML 文件
      await this.loadHtml();

      // 截图
      const finalOutputPath = await this.takeScreenshot(outputPath);

      // 清理资源
      await this.cleanup();
      const imageBuffer = fs.readFileSync(finalOutputPath);
      const base64Image = imageBuffer.toString('base64');

      // 返回结果对象，包含输出路径和 base64 编码的图像数据
      return {
        outputPath: finalOutputPath,
        base64: base64Image,
        mimeType: 'image/png',
      };
    } catch (error) {
      // console.error('❌ 生成截图时出错:', error);
      await this.cleanup();
      throw error;
    }
  }

  /**
   * 生成 Mermaid 图表
   */
  public async generateMermaidDiagram(options: MermaidOptions): Promise<{
    outputPath: string;
    base64: string;
    mimeType: string;
  }> {
    try {
      const {
        definition,
        outputPath = 'mermaid-diagram.png',
        backgroundColor = 'white',
        theme = 'default',
        deviceScaleFactor = 3,
        width = 800,
        height = 600,
      } = options;

      if (!definition) {
        throw new Error('缺少 Mermaid 图表定义');
      }

      // 创建临时目录
      const tempDir = path.join(__dirname, 'temp-mermaid');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      // 创建临时 Mermaid 文件
      const mermaidFilePath = path.join(tempDir, `diagram-${Date.now()}.mmd`);
      fs.writeFileSync(mermaidFilePath, definition.trim());

      // 设置 mermaid-cli 配置
      const mermaidConfig = {
        backgroundColor,
        theme,
        puppeteerConfig: {
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
        parseMMDOptions: {
          viewport: {
            height: height,
            width: width,
            deviceScaleFactor: deviceScaleFactor,
          },
        },
      };

      // 生成 PNG 文件
      // 检查输出路径是否存在
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      const finalOutputPath = path.resolve(process.cwd(), outputPath);
      await run(
        mermaidFilePath as `${string}.mmd`,
        finalOutputPath as `${string}.png`,
        mermaidConfig
      );

      // 读取生成的图像并转换为 base64
      const imageBuffer = fs.readFileSync(finalOutputPath);
      const base64Image = imageBuffer.toString('base64');

      // 清理临时文件
      if (fs.existsSync(mermaidFilePath)) {
        fs.unlinkSync(mermaidFilePath);
      }

      return {
        outputPath: finalOutputPath,
        base64: base64Image,
        mimeType: 'image/png',
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * 使用 node-canvas 生成 Canvas 截图
   */
  private async generateCanvasScreenshot(
    outputPath: string,
    width: number,
    height: number,
    props: Record<string, unknown>
  ): Promise<{
    outputPath: string;
    base64: string;
    mimeType: string;
  }> {
    try {
      // 创建 canvas
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');

      // 获取绘制代码
      const drawCode =
        (props.drawCode as string) ||
        `
        // 设置白色背景
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 重置填充颜色为黑色（用于后续文字）
        ctx.fillStyle = 'black';
        
        // 绘制文字
        ctx.font = '30px Impact';
        ctx.rotate(0.1);
        ctx.fillText('Canvas Render', 50, 100);
        
        // 绘制线条
        var text = ctx.measureText('Canvas Render');
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        ctx.beginPath();
        ctx.lineTo(50, 102);
        ctx.lineTo(50 + text.width, 102);
        ctx.stroke();
      `;

      // 设置背景颜色（如果有）
      if (props.backgroundColor) {
        ctx.fillStyle = props.backgroundColor as string;
        ctx.fillRect(0, 0, width, height);
      }

      // 创建执行上下文
      const contextObject = {
        ctx,
        canvas,
      };

      // 使用 vm 模块执行代码
      vm.createContext(contextObject);
      vm.runInContext(drawCode, contextObject);

      // 保存图像到文件
      const finalOutputPath = path.resolve(process.cwd(), outputPath);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(finalOutputPath, buffer);

      // 返回结果
      return {
        outputPath: finalOutputPath,
        base64: buffer.toString('base64'),
        mimeType: 'image/png',
      };
    } catch (error) {
      // console.error('生成 Canvas 截图时出错:', error);
      throw error;
    }
  }

  /**
   * 创建临时 HTML 文件
   */
  private async createHtmlFile(
    Component: ComponentType<any>,
    props: Record<string, unknown>,
    darkMode: boolean
  ): Promise<void> {
    // 渲染组件为 HTML 字符串
    const componentHtml = renderToString(
      React.createElement(Component, {
        ...props,
        width: props.width || 400,
        height: props.height || 400,
      })
    );

    // 创建完整的 HTML 文档
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="./src/app/globals.css">
        </head>
        <body class="${darkMode ? 'dark' : ''}" style="background-color: transparent;">
          <div id="root">${componentHtml}</div>
        </body>
      </html>
    `;

    // 创建临时 HTML 文件
    this.tempHtmlPath = path.join(__dirname, `temp-component-${Date.now()}.html`);
    fs.writeFileSync(this.tempHtmlPath, html);
  }

  /**
   * 设置浏览器和页面
   */
  private async setupBrowser(
    width: number,
    height: number,
    deviceScaleFactor: number,
    darkMode: boolean
  ): Promise<void> {
    // console.log('正在启动浏览器...');
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      this.page = await this.browser.newPage();

      // 模拟深色模式媒体查询
      if (darkMode) {
        await this.page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
      }

      await this.page.setViewport({
        width,
        height,
        deviceScaleFactor, // 高分辨率截图
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('Could not find Chrome')) {
        throw new Error(
          '找不到 Chrome 浏览器。请运行 "npx puppeteer browsers install chrome" 安装所需的浏览器。' +
            '详情请参考 README.md 中的"组件截图功能"部分。'
        );
      }
      throw error;
    }
  }

  /**
   * 加载 HTML 文件
   */
  private async loadHtml(): Promise<void> {
    if (!this.page || !this.tempHtmlPath) {
      throw new Error('浏览器或临时 HTML 文件未初始化');
    }

    // console.log(`正在加载 HTML: ${this.tempHtmlPath}`);
    await this.page.goto(`file://${this.tempHtmlPath}`, {
      waitUntil: 'networkidle0',
    });

    // 等待 Tailwind 样式应用
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  /**
   * 截取组件截图
   */
  private async takeScreenshot(outputPath: string): Promise<string> {
    if (!this.page) {
      throw new Error('浏览器未初始化');
    }

    // 获取组件的实际尺寸
    const rootElement = await this.page.$('#root > *');
    const boundingBox = await rootElement?.boundingBox();

    if (!boundingBox) {
      throw new Error('无法获取元素边界框');
    }

    // 截图
    const finalOutputPath = path.resolve(process.cwd(), outputPath);
    // console.log(`正在生成截图: ${finalOutputPath}`);

    await this.page.screenshot({
      path: finalOutputPath,
      clip: boundingBox,
      omitBackground: true,
    });

    return finalOutputPath;
  }

  /**
   * 清理资源
   */
  private async cleanup(): Promise<void> {
    // 关闭浏览器
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }

    // 删除临时 HTML 文件
    // if (this.tempHtmlPath && fs.existsSync(this.tempHtmlPath)) {
    //   fs.unlinkSync(this.tempHtmlPath);
    //   this.tempHtmlPath = '';
    // }
  }

  /**
   * 注册新组件
   */
  public registerComponent(
    name: string,
    component: ComponentType<any>,
    description: string,
    propTypes: Record<
      string,
      {
        type: string;
        required: boolean;
        defaultValue?: any;
        description?: string;
      }
    >
  ): void {
    this.componentMap[name] = { component, description, propTypes };
  }

  /**
   * 获取已注册的组件列表
   */
  public getRegisteredComponents(): Record<string, { description: string }> {
    const result: Record<string, { description: string }> = {};

    // 只返回组件名称和描述
    for (const [name, info] of Object.entries(this.componentMap)) {
      result[name] = { description: info.description };
    }

    return result;
  }

  /**
   * 获取组件的属性信息
   */
  public getComponentProps(componentName: string): Record<
    string,
    {
      type: string;
      required: boolean;
      defaultValue?: any;
      description?: string;
    }
  > | null {
    const componentInfo = this.componentMap[componentName];
    if (!componentInfo) {
      return null;
    }

    return componentInfo.propTypes;
  }
}

// 导出类和组件映射
export { ComponentScreenshotGenerator };
export type { ScreenshotOptions, HelloWorldProps };
