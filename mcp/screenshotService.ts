/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer, { Browser, Page } from 'puppeteer';
import React, { ComponentType } from 'react';
import { renderToString } from 'react-dom/server';
import ComponentMap, { ComponentInfo } from './componentMap';

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
        deviceScaleFactor = 2
      } = options;
      
      // 从组件映射中获取组件
      // console.log(`正在获取组件: ${componentName}`);
      
      const componentInfo = this.componentMap[componentName];
      
      if (!componentInfo) {
        throw new Error(`找不到组件: ${componentName}。可用组件: ${Object.keys(this.componentMap).join(', ')}`);
      }
      
      const Component = componentInfo.component;
      
      // 创建 HTML 文件
      await this.createHtmlFile(Component, props, darkMode);
      
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
        mimeType: 'image/png'
      };

    } catch (error) {
      // console.error('❌ 生成截图时出错:', error);
      await this.cleanup();
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
    const componentHtml = renderToString(React.createElement(Component, props));
    
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
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    
    // 模拟深色模式媒体查询
    if (darkMode) {
      await this.page.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: 'dark' }
      ]);
    }
    
    await this.page.setViewport({
      width,
      height,
      deviceScaleFactor // 高分辨率截图
    });
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
      waitUntil: 'networkidle0'
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
      omitBackground: true
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
    if (this.tempHtmlPath && fs.existsSync(this.tempHtmlPath)) {
      fs.unlinkSync(this.tempHtmlPath);
      this.tempHtmlPath = '';
    }
  }
  
  /**
   * 注册新组件
   */
  public registerComponent(
    name: string, 
    component: ComponentType<any>, 
    propTypes: Record<string, {
      type: string;
      required: boolean;
      defaultValue?: any;
      description?: string;
    }>
  ): void {
    this.componentMap[name] = { component, propTypes };
  }
  
  /**
   * 获取已注册的组件列表
   */
  public getRegisteredComponents(): Record<string, ComponentInfo> {
    return this.componentMap;
  }
  
  /**
   * 获取组件的参数信息
   */
  public getComponentPropTypes(componentName: string): Record<string, {
    type: string;
    required: boolean;
    defaultValue?: any;
    description?: string;
  }> | null {
    const componentInfo = this.componentMap[componentName];
    return componentInfo ? componentInfo.propTypes : null;
  }
}

// 导出类和组件映射
export { ComponentScreenshotGenerator };
export type { ScreenshotOptions, HelloWorldProps };
