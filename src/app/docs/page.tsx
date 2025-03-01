'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function DocsPage() {
  // 添加状态来跟踪当前活动的锚点
  const [activeSection, setActiveSection] = useState('introduction');

  // 监听滚动和锚点变化
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'introduction',
        'installation',
        'quickstart',
        'components',
        'mcp-service',
        'customization',
        'custom-components',
        'api-reference',
      ];

      // 找到当前可见的部分
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // 处理锚点点击
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setActiveSection(hash);
      }
    };

    // 初始化时检查URL中的锚点
    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);

    // 初始加载时触发一次滚动处理
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // 生成链接类名的辅助函数
  const getLinkClassName = (section: string) => {
    return section === activeSection
      ? 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 block px-3 py-2 rounded-md text-base font-medium'
      : 'text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 导航栏 */}
      <Navbar currentPath="/docs" />

      {/* 文档内容 */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* 侧边栏 */}
            <div className="hidden lg:block lg:col-span-3">
              <nav className="sticky top-4 divide-y divide-gray-200 dark:divide-gray-700">
                <div className="pb-8 space-y-1">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    入门指南
                  </h3>
                  <a
                    href="#introduction"
                    className={getLinkClassName('introduction')}
                    onClick={() => setActiveSection('introduction')}
                  >
                    介绍
                  </a>
                  <a
                    href="#installation"
                    className={getLinkClassName('installation')}
                    onClick={() => setActiveSection('installation')}
                  >
                    安装
                  </a>
                  <a
                    href="#quickstart"
                    className={getLinkClassName('quickstart')}
                    onClick={() => setActiveSection('quickstart')}
                  >
                    快速开始
                  </a>
                </div>
                <div className="pt-6 pb-8 space-y-1">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    核心概念
                  </h3>
                  <a
                    href="#components"
                    className={getLinkClassName('components')}
                    onClick={() => setActiveSection('components')}
                  >
                    组件
                  </a>
                  <a
                    href="#mcp-service"
                    className={getLinkClassName('mcp-service')}
                    onClick={() => setActiveSection('mcp-service')}
                  >
                    MCP 服务
                  </a>
                  <a
                    href="#customization"
                    className={getLinkClassName('customization')}
                    onClick={() => setActiveSection('customization')}
                  >
                    自定义
                  </a>
                </div>
                <div className="pt-6 pb-8 space-y-1">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    高级主题
                  </h3>
                  <a
                    href="#custom-components"
                    className={getLinkClassName('custom-components')}
                    onClick={() => setActiveSection('custom-components')}
                  >
                    自定义组件
                  </a>
                  <a
                    href="#api-reference"
                    className={getLinkClassName('api-reference')}
                    onClick={() => setActiveSection('api-reference')}
                  >
                    API 参考
                  </a>
                </div>
              </nav>
            </div>

            {/* 主要内容 */}
            <div className="mt-8 lg:mt-0 lg:col-span-9">
              <div className="prose prose-blue max-w-none dark:prose-invert">
                <section id="introduction">
                  <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    VizForge 文档
                  </h1>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    VizForge 是一个基于 MCP (Model Context Protocol)
                    的图表生成服务，为各种写作和展示场景提供高质量的数据可视化解决方案。本文档将帮助您了解如何安装、配置和使用
                    VizForge。
                  </p>
                </section>

                <section id="installation" className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    安装
                  </h2>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    VizForge 使用 pnpm 作为包管理工具。请确保您已经安装了 Node.js 和 pnpm。
                  </p>
                  <div className="mt-6 bg-gray-800 rounded-md p-4">
                    <code className="text-sm text-white font-mono">
                      # 克隆仓库
                      <br />
                      git clone https://github.com/acring/VizForge.git
                      <br />
                      cd VizForge
                      <br />
                      <br />
                      # 安装依赖
                      <br />
                      pnpm install
                    </code>
                  </div>
                </section>

                <section id="quickstart" className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    快速开始
                  </h2>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    安装完依赖后，您可以通过以下命令启动开发服务器：
                  </p>
                  <div className="mt-6 bg-gray-800 rounded-md p-4">
                    <code className="text-sm text-white font-mono">
                      # 启动 Next.js 开发服务器
                      <br />
                      pnpm dev
                      <br />
                      <br />
                      # 启动 Storybook
                      <br />
                      pnpm storybook
                    </code>
                  </div>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    要使用 MCP 服务生成图表，您需要构建并启动 MCP 服务：
                  </p>
                  <div className="mt-6 bg-gray-800 rounded-md p-4">
                    <code className="text-sm text-white font-mono">
                      # 构建 MCP 服务
                      <br />
                      pnpm build:mcp
                      <br />
                      <br />
                      # 启动 MCP 服务
                      <br />
                      node ./dist/mcp/server.mjs
                    </code>
                  </div>
                </section>

                <section id="components" className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    组件
                  </h2>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    VizForge 提供了多种可视化组件，包括：
                  </p>
                  <ul className="mt-4 list-disc list-inside text-gray-500 dark:text-gray-400">
                    <li>HelloWorld - 一个简单的问候组件</li>
                    <li>LineChart - 折线图组件</li>
                    <li>ComparisonChart - 对比图表组件</li>
                    <li>SvgRenderer - SVG 渲染组件</li>
                    <li>FeatureShowcase - 功能展示组件</li>
                    <li>TitleWithAuthor - 带作者信息的标题组件</li>
                    <li>MermaidRenderer - Mermaid 渲染组件</li>
                    <li>CanvasRenderer - Canvas 渲染组件</li>
                  </ul>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    您可以在{' '}
                    <Link
                      href="/components"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      组件页面
                    </Link>{' '}
                    查看所有可用的组件。
                  </p>
                </section>

                <section id="mcp-service" className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    MCP 服务
                  </h2>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    VizForge 的核心功能是通过 MCP 提供的图表生成服务。该服务允许用户通过简单的 API
                    调用生成各种图表和可视化内容。
                  </p>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                    可用工具
                  </h3>
                  <ul className="mt-4 list-disc list-inside text-gray-500 dark:text-gray-400">
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        generate_chart
                      </code>{' '}
                      - 生成组件的截图，可用于各种图表和可视化
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        list_components
                      </code>{' '}
                      - 列出所有可用于生成图表的组件，并返回组件的参数信息
                    </li>
                  </ul>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                    使用示例
                  </h3>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    生成一个简单的 HelloWorld 组件截图：
                  </p>
                  <div className="mt-6 bg-gray-800 rounded-md p-4">
                    <code className="text-sm text-white font-mono">
                      {`{
  "componentName": "HelloWorld",
  "outputPath": "/path/to/output.png",
  "width": 800,
  "height": 600,
  "props": {
    "name": "VizForge",
    "textColor": "#3b82f6"
  },
  "darkMode": false
}`}
                    </code>
                  </div>
                </section>

                <section id="customization" className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    自定义
                  </h2>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    VizForge
                    支持自定义主题和样式，让可视化内容与您的品牌风格保持一致。您可以通过组件的 props
                    来自定义组件的外观。
                  </p>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    例如，您可以通过{' '}
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      textColor
                    </code>{' '}
                    和{' '}
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      fontSize
                    </code>{' '}
                    属性来自定义 HelloWorld 组件的文本颜色和字体大小。
                  </p>
                </section>

                <section id="custom-components" className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    自定义组件
                  </h2>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    VizForge 支持添加自定义组件以扩展图表生成能力。要添加新组件：
                  </p>
                  <ol className="mt-4 list-decimal list-inside text-gray-500 dark:text-gray-400">
                    <li>
                      在{' '}
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        src/components/
                      </code>{' '}
                      目录下创建新的组件文件
                    </li>
                    <li>
                      在{' '}
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        mcp/componentMap.ts
                      </code>{' '}
                      中注册组件及其属性类型
                    </li>
                    <li>为组件创建 Storybook 故事以便于调试</li>
                  </ol>
                </section>

                <section id="api-reference" className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    API 参考
                  </h2>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    VizForge 提供了以下 API：
                  </p>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                    generate_chart
                  </h3>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    生成组件的截图，可用于各种图表和可视化。
                  </p>
                  <h4 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">参数</h4>
                  <ul className="mt-4 list-disc list-inside text-gray-500 dark:text-gray-400">
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        componentName
                      </code>{' '}
                      - 要渲染的组件名称
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        outputPath
                      </code>{' '}
                      - 输出文件的完整绝对路径
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        width
                      </code>{' '}
                      - 截图宽度（像素）
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        height
                      </code>{' '}
                      - 截图高度（像素）
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        props
                      </code>{' '}
                      - 传递给组件的属性
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        darkMode
                      </code>{' '}
                      - 是否使用深色模式
                    </li>
                  </ul>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                    list_components
                  </h3>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    列出所有可用于生成图表的组件，并返回组件的参数信息。
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">VizForge</h3>
              <p className="text-gray-400">
                基于 MCP 的图表生成服务，为各种写作和展示场景提供高质量的数据可视化解决方案。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">链接</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    首页
                  </Link>
                </li>
                <li>
                  <Link href="/components" className="text-gray-400 hover:text-white">
                    组件
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-gray-400 hover:text-white">
                    文档
                  </Link>
                </li>
                <li>
                  <Link
                    href="/storybook-static/index.html"
                    className="text-gray-400 hover:text-white"
                  >
                    Storybook
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/acring/VizForge"
                    className="text-gray-400 hover:text-white"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">联系我们</h3>
              <p className="text-gray-400">如有任何问题或建议，请通过 GitHub Issues 联系我们。</p>
              <div className="mt-4">
                <Link
                  href="https://github.com/acring/VizForge/issues"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  提交 Issue
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© {new Date().getFullYear()} VizForge. 保留所有权利。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
