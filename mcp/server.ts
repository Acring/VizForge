import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { promises as fs } from 'fs';
import { ComponentScreenshotGenerator, ScreenshotOptions } from './screenshotService.js';

// 创建截图生成器实例
const screenshotGenerator = new ComponentScreenshotGenerator();

// 创建服务器实例
const server = new Server(
  {
    name: 'viz-forge',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
  },
  }
);

// 定义一个简单的 Hello World 工具
const HELLO_WORLD_TOOL: Tool = {
  name: 'say_hello',
  description: '返回一个简单的问候消息 123',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: '要问候的名字',
      },
    },
    required: ['name'],
  },
};

// 定义生成组件截图的工具
const GENERATE_CHART_TOOL: Tool = {
  name: 'generate_chart',
  description: '生成组件的截图，可用于各种图表和可视化',
  inputSchema: {
    type: 'object',
    properties: {
      componentName: {
        type: 'string',
        description: '要渲染的组件名称',
        default: 'HelloWorld',
      },
      outputPath: {
        type: 'string',
        description: '输出文件的完整绝对路径。Windows 系统使用双反斜杠，如 "C:\\\\Users\\\\name\\\\path"；Unix/Mac 系统使用 "/path/to/dir"',
      },
      width: {
        type: 'number',
        description: '截图宽度（像素）',
      },
      height: {
        type: 'number',
        description: '截图高度（像素）',
      },
      props: {
        type: 'object',
        description: '传递给组件的属性',
      },
      darkMode: {
        type: 'boolean',
        description: '是否使用深色模式',
      },
      deviceScaleFactor: {
        type: 'number',
        description: '设备缩放因子，用于高分辨率截图',
      },
    },
    required: ['componentName', 'outputPath'],
  },
};

// 定义列出可用组件的工具
const LIST_COMPONENTS_TOOL: Tool = {
  name: 'list_components',
  description: '列出所有可用于生成图表的组件，并返回组件的参数信息',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

// 设置工具列表处理器
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [HELLO_WORLD_TOOL, GENERATE_CHART_TOOL, LIST_COMPONENTS_TOOL],
}));

// 设置工具调用处理器
server.setRequestHandler(CallToolRequestSchema, async request => {
  const args = request.params.arguments as Record<string, unknown>;

  if (request.params.name === HELLO_WORLD_TOOL.name) {
    if (typeof args?.name !== 'string') {
      return {
        content: [
          {
            type: 'text',
            text: '缺少必需的参数：name（必须是字符串）',
          },
        ],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: `你好，${args.name}！欢迎来到 MCP 世界！`,
        },
      ],
    };
  }
  
  // 处理生成图表截图的请求
  if (request.params.name === GENERATE_CHART_TOOL.name) {
    try {
      if (typeof args?.componentName !== 'string') {
        return {
          content: [
            {
              type: 'text',
              text: '缺少必需的参数：componentName（必须是字符串）',
            },
          ],
          isError: true,
        };
      }
      
      // 准备截图选项
      const options: ScreenshotOptions = {
        componentName: args.componentName,
        outputPath: typeof args.outputPath === 'string' ? args.outputPath : `${args.componentName}-screenshot.png`,
        width: typeof args.width === 'number' ? args.width : 400,
        height: typeof args.height === 'number' ? args.height : 400,
        props: typeof args.props === 'object' && args.props !== null ? args.props as Record<string, unknown> : {},
        darkMode: typeof args.darkMode === 'boolean' ? args.darkMode : false,
        deviceScaleFactor: typeof args.deviceScaleFactor === 'number' ? args.deviceScaleFactor : 2,
      };
      
      // 生成截图
      const result = await screenshotGenerator.generateScreenshot(options);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              outputPath: result.outputPath,
            }),
          }
          
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `生成截图时出错: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }
  
  // 处理列出可用组件的请求
  if (request.params.name === LIST_COMPONENTS_TOOL.name) {
    try {
      const components = screenshotGenerator.getRegisteredComponents();
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(components),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `获取组件列表时出错: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }

  return {
    content: [
      {
        type: 'text',
        text: `未知工具：${request.params.name}`,
      },
    ],
    isError: true,
  };
});

// 主函数
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('VizForge MCP 服务器正在运行...');
}

// 启动服务器
main().catch(async error => {
  await fs.appendFile('server.log', `${new Date().toISOString()} - ${error.stack || error}\n`);
  console.error('主函数发生致命错误:', error);
  process.exit(1);
});
