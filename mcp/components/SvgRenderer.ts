 
import { ComponentInfo } from '../types';
import SvgRenderer from '../../src/components/SvgRenderer';

const SvgRendererInfo: ComponentInfo = {
  component: SvgRenderer,
  description: '自定义 SVG 渲染组件，允许传入默认的 SVG 结构来渲染',
  propTypes: {
    svgContent: {
      type: 'string',
      required: true,
      defaultValue: '<circle cx="12" cy="12" r="10" />',
      description: 'SVG内容，可以是字符串形式的SVG代码'
    },
    width: {
      type: 'string|number',
      required: false,
      defaultValue: '100%',
      description: '宽度'
    },
    height: {
      type: 'string|number',
      required: false,
      defaultValue: '100%',
      description: '高度'
    },
    className: {
      type: 'string',
      required: false,
      defaultValue: '',
      description: '可选的className'
    },
    style: {
      type: 'object',
      required: false,
      defaultValue: {},
      description: '可选的内联样式对象'
    },
    viewBox: {
      type: 'string',
      required: false,
      defaultValue: '0 0 24 24',
      description: '可选的viewBox属性'
    },
    fill: {
      type: 'string',
      required: false,
      defaultValue: 'currentColor',
      description: '可选的填充颜色'
    },
    title: {
      type: 'string',
      required: false,
      defaultValue: undefined,
      description: '可选的描述文本，用于无障碍'
    }
  }
};

export default SvgRendererInfo; 