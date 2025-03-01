import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function ComponentsPage() {
  // 组件列表
  const components = [
    {
      name: 'HelloWorld',
      description: '一个简单的问候组件，用于测试 MCP 服务连接是否正常',
      image: '/canvas-renderer-screenshot.png',
      path: 'common-HelloWorld--docs',
    },
    {
      name: 'LineChart',
      description: '折线图组件，用于展示数据趋势和变化',
      image: '/mermaid-renderer-screenshot.png',
      path: 'chart-LineChart--docs',
    },
    {
      name: 'ComparisonChart',
      description: '对比图表组件，用于比较不同项目的数据',
      image: '/canvas-renderer-screenshot.png',
      path: 'common-ComparisonChart--docs',
    },
    {
      name: 'SvgRenderer',
      description: 'SVG 渲染组件，用于渲染 SVG 图形',
      image: '/mermaid-renderer-screenshot.png',
      path: 'svg-SvgRenderer--docs',
    },
    {
      name: 'FeatureShowcase',
      description: '功能展示组件，用于展示产品特性',
      image: '/canvas-renderer-screenshot.png',
      path: 'common-FeatureShowcase--docs',
    },
    {
      name: 'TitleWithAuthor',
      description: '带作者信息的标题组件，用于文档和报告',
      image: '/mermaid-renderer-screenshot.png',
      path: 'common-TitleWithAuthor--docs',
    },
    {
      name: 'MermaidRenderer',
      description: 'Mermaid 渲染组件，用于渲染流程图和示意图',
      image: '/mermaid-renderer-screenshot.png',
      path: 'mermaid-MermaidRenderer--docs',
    },
    {
      name: 'CanvasRenderer',
      description: 'Canvas 渲染组件，用于高性能图形渲染',
      image: '/canvas-renderer-screenshot.png',
      path: 'canvas-CanvasRenderer--docs',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 导航栏 */}
      <Navbar currentPath="/components" />

      {/* 页面标题 */}
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              <span className="block">VizForge 组件库</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              浏览 VizForge 提供的各种可视化组件，满足不同的数据展示需求。
            </p>
          </div>
        </div>
      </div>

      {/* 组件列表 */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((component, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                  <Image src={component.image} alt={component.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {component.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    {component.description}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={`/storybook-static/index.html?path=/docs/${component.path}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >
                      查看文档 →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-12">
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
