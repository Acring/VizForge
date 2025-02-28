import { ComponentInfo } from '../types';
// import mermaid from 'mermaid';

// MermaidRenderer 组件属性类型
interface MermaidRendererProps {
  definition: string;
  backgroundColor?: string;
  theme?: 'default' | 'forest' | 'dark' | 'neutral';
  width?: number;
  height?: number;
  scale?: number;
}



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
    scale: {
      type: 'number',
      required: false,
      defaultValue: 3,
      description: '图表渲染的缩放因子，当渲染节点较多时需要适当增加，保证图像的清晰度'
    }
  }
};

export default MermaidRendererInfo;
export type { MermaidRendererProps }; 