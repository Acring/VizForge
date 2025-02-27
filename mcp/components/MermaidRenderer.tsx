import React, { useEffect } from 'react';
import { ComponentInfo } from '../types';
// import mermaid from 'mermaid';

// MermaidRenderer 组件属性类型
interface MermaidRendererProps {
  definition: string;
  backgroundColor?: string;
  theme?: 'default' | 'forest' | 'dark' | 'neutral';
  width?: number;
  height?: number;
}

// MermaidRenderer 组件
// const MermaidRenderer: React.FC<MermaidRendererProps> = ({ 
//   definition, 
//   backgroundColor = 'white',
//   theme = 'default',
//   width = 800,
//   height = 600
// }) => {
//   useEffect(() => {
//     console.log('definition', definition);
//     mermaid.initialize({
//       startOnLoad: true,
//     });
//     mermaid.run({
//       querySelector: '.mermaid',
//     });

//   }, [definition]);
//   // 这个组件在服务端渲染时只是一个占位符
//   // 实际的 Mermaid 图表生成在 screenshotService.ts 中处理
//   return (
//       <pre className="mermaid" style={{ 
//         textAlign: 'left', 
//         background: `${backgroundColor}`,
//         width: `${width}px`,
//         height: `${height}px`,
//         overflow: 'auto',
//         fontFamily: 'monospace',
//         fontSize: '14px',
//         color: theme === 'dark' ? 'white' : 'black'
//       }}>
//         {definition}
//       </pre>
//   );
// };

// 组件信息
const MermaidRendererInfo: ComponentInfo = {
  // component: MermaidRenderer,
  description: '使用 Mermaid 语法生成各种图表，如流程图、时序图、甘特图等',
  propTypes: {
    definition: {
      type: 'string',
      required: true,
      description: 'Mermaid 图表定义，例如时序图、流程图等的 Mermaid 语法'
    },
    backgroundColor: {
      type: 'string',
      required: false,
      defaultValue: 'white',
      description: '图表背景颜色'
    },
    theme: {
      type: 'string',
      required: false,
      defaultValue: 'default',
      description: '图表主题，可选值：default, forest, dark, neutral'
    },
    width: {
      type: 'number',
      required: false,
      defaultValue: 800,
      description: '图表宽度（像素）'
    },
    height: {
      type: 'number',
      required: false,
      defaultValue: 600,
      description: '图表高度（像素）'
    }
  }
};

export default MermaidRendererInfo;
export type { MermaidRendererProps }; 