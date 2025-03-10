import React from 'react';

interface HelloWorldProps {
  name?: string;
  style?: React.CSSProperties;
  textColor?: string;
  fontSize?: string;
}

/**
 * 一个简单的问候组件，用于测试 MCP 服务连接是否正常
 * 
 * @param {Object} props - 组件的属性
 * @param {string} props.name - 要问候的名字，默认为 "世界"
 * @param {string} props.textColor - 文本颜色，默认为 "#000"
 * @param {string} props.fontSize - 字体大小，默认为 "16px"
 * @param {Object} props.style - 组件的样式对象
 * @param {string} props.style.color - 文本颜色，默认为 "#000"
 * @param {string} props.style.fontSize - 字体大小，默认为 "16px"
 */
const HelloWorld: React.FC<HelloWorldProps> = ({
  name = '世界',
  textColor,
  fontSize,
  style = {},
}) => {
  // 创建标题样式对象
  const titleStyle: React.CSSProperties = {
    color: textColor,
    fontSize: fontSize,
    ...style
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 hover:shadow-lg">
      <h1 className="font-bold mb-2" style={titleStyle}>
        你好，{name}！
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-center">
        欢迎来到 MCP 世界！
      </p>
      <div className="mt-4 border-t pt-4 w-full">
        <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center">
          使用 React 和 Tailwind CSS 构建
        </p>
      </div>
    </div>
  );
};

export default HelloWorld;
