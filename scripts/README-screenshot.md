# 组件截图工具

这个工具可以将 React 组件渲染为图片，方便在文档、演示或测试中使用。

## 功能特点

- 支持渲染任何 React 组件为图片
- 可自定义输出图片尺寸和格式
- 支持深色模式
- 可传递自定义属性给组件
- 高分辨率截图支持

## 安装依赖

首先，确保已安装所需依赖：

```bash
pnpm install puppeteer react react-dom commander
```

## 使用方法

### 作为命令行工具使用

可以通过命令行直接使用：

```bash
# 使脚本可执行
chmod +x scripts/component-screenshot.ts

# 使用 ts-node 运行
npx ts-node scripts/component-screenshot.ts --component HelloWorld --output hello.png --props '{"name":"世界"}'
```

### 命令行参数

- `-c, --component <name>`: 要截图的组件名称（必需）
- `-o, --output <path>`: 输出图片路径（默认：screenshot.png）
- `-w, --width <number>`: 视口宽度（默认：800）
- `-h, --height <number>`: 视口高度（默认：600）
- `-p, --props <json>`: 传递给组件的属性，JSON 格式（默认：{}）
- `-d, --dark-mode`: 使用深色模式（默认：true）
- `-t, --tailwind-config <path>`: Tailwind 配置文件路径（默认：项目根目录下的 tailwind.config.ts）

### 在代码中使用

也可以在代码中直接使用 `ComponentScreenshotGenerator` 类：

```typescript
import { ComponentScreenshotGenerator } from './mcp/screenshotServer';

async function takeScreenshot() {
  const generator = new ComponentScreenshotGenerator();
  
  // 获取可用组件列表
  const components = generator.getRegisteredComponents();
  console.log('可用组件:', components);
  
  // 生成截图
  const outputPath = await generator.generateScreenshot({
    componentName: 'HelloWorld',
    outputPath: 'hello-world.png',
    width: 800,
    height: 600,
    props: { name: '你好，世界！' },
    darkMode: true,
    deviceScaleFactor: 2
  });
  
  console.log(`截图已保存到: ${outputPath}`);
}

takeScreenshot().catch(console.error);
```

## 添加新组件

要添加新组件，需要在 `screenshotServer.ts` 文件中的 `ComponentMap` 对象中注册：

```typescript
// 导入组件
import MyComponent from '../path/to/MyComponent';

// 在 ComponentMap 中注册
const ComponentMap: Record<string, ComponentType<any>> = {
  'HelloWorld': HelloWorld,
  'MyComponent': MyComponent,
  // 添加更多组件...
};
```

或者在运行时动态注册：

```typescript
const generator = new ComponentScreenshotGenerator();

// 注册新组件
generator.registerComponent('MyComponent', MyComponent);
```

## 实现原理

该工具使用了以下技术：

1. **React 服务器端渲染**：将 React 组件渲染为 HTML
2. **Puppeteer**：控制无头浏览器加载 HTML 并截图
3. **Commander**：处理命令行参数

核心实现在 `screenshotServer.ts` 中的 `ComponentScreenshotGenerator` 类，它提供了一个面向对象的 API 来生成组件截图。

## 注意事项

1. 确保组件不依赖于客户端特定的 API，因为渲染是在服务器端进行的
2. 如果组件使用了 CSS-in-JS 库，可能需要额外配置
3. 对于使用外部资源（如图片、字体）的组件，确保路径正确 