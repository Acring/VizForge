import React from 'react';

interface HelloWorldProps {
  name?: string;
  style?: React.CSSProperties;
  textColor?: string;
  fontSize?: string;
}

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
