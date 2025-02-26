import React from 'react';

interface SvgRendererProps {
  /**
   * SVG内容，可以是字符串形式的SVG代码
   */
  svgContent?: string;
  
  /**
   * 宽度，默认为"100%"
   */
  width?: string | number;
  
  /**
   * 高度，默认为"100%"
   */
  height?: string | number;
  
  /**
   * 可选的className
   */
  className?: string;
  
  /**
   * 可选的内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * 可选的viewBox属性，默认为"0 0 24 24"
   */
  viewBox?: string;
  
  /**
   * 可选的填充颜色
   */
  fill?: string;
  
  /**
   * 可选的描述文本，用于无障碍
   */
  title?: string;
}

/**
 * SVG渲染组件，用于渲染自定义SVG内容
 * 
 * 该组件允许传入自定义SVG代码作为字符串，并提供了对SVG属性的控制
 * 支持服务端渲染，不包含动画效果
 * 
 * @param {Object} props - 组件的属性
 * @param {string} props.svgContent - SVG内容，可以是字符串形式的SVG代码
 * @param {string|number} props.width - 宽度，默认为"100%"
 * @param {string|number} props.height - 高度，默认为"100%"
 * @param {string} props.className - 可选的className
 * @param {Object} props.style - 可选的内联样式
 * @param {string} props.viewBox - 可选的viewBox属性，默认为"0 0 24 24"
 * @param {string} props.fill - 可选的填充颜色
 * @param {string} props.title - 可选的描述文本，用于无障碍
 */
const SvgRenderer: React.FC<SvgRendererProps> = ({
  svgContent = '<circle cx="12" cy="12" r="10" />',
  width = '100%',
  height = '100%',
  className = '',
  style = {},
  viewBox = '0 0 24 24',
  fill = 'currentColor',
  title,
}) => {
  // 处理SVG内容和title
  // 解决方案：预处理SVG字符串，确保title被正确添加而不是作为子元素
  const renderSvgContent = () => {
    // 如果有title且需要添加到SVG中
    if (title) {
      // 检查SVG内容是否包含<title>标签
      if (!svgContent.includes('<title')) {
        // 在SVG内容的开头添加title标签
        return { __html: `<title id="svg-title">${title}</title>${svgContent}` };
      }
    }
    return { __html: svgContent };
  };

  return (
    <div className={`inline-block ${className}`} style={style}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={viewBox}
        fill={fill}
        className="w-full h-full"
        dangerouslySetInnerHTML={renderSvgContent()}
        role="img"
        aria-labelledby={title ? 'svg-title' : undefined}
      />
    </div>
  );
};

export default SvgRenderer; 