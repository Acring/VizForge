/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from 'react';
import HelloWorld from '../src/components/HelloWorld';
import TitleWithAuthor from '../src/components/TitleWithAuthor';
import ComparisonChart from '../src/components/ComparisonChart';
import SvgRenderer from '../src/components/SvgRenderer';

// 组件信息接口
export interface ComponentInfo {
  component: ComponentType<any>;
  description: string;
  propTypes: Record<string, {
    type: string;
    required: boolean;
    defaultValue?: any;
    description?: string;
  }>;
}

// 组件映射表
const ComponentMap: Record<string, ComponentInfo> = {
  'HelloWorld': {
    component: HelloWorld,
    description: '一个简单的 Hello World 组件，可以自定义问候语和样式',
    propTypes: {
      name: {
        type: 'string',
        required: false,
        defaultValue: '世界',
        description: '显示的名称'
      },
      textColor: {
        type: 'string',
        required: false,
        defaultValue: undefined,
        description: '文本颜色 (CSS颜色值)'
      },
      fontSize: {
        type: 'string',
        required: false,
        defaultValue: undefined,
        description: '字体大小 (CSS大小值)'
      },
      style: {
        type: 'object',
        required: false,
        defaultValue: {},
        description: '自定义样式对象'
      }
    }
  },
  'TitleWithAuthor': {
    component: TitleWithAuthor,
    description: '一个标题组件，包含标题、副标题、作者和标语，支持自定义样式和背景',
    propTypes: {
      title: {
        type: 'string',
        required: true,
        description: '要显示的标题文本'
      },
      subtitle: {
        type: 'string',
        required: false,
        defaultValue: '',
        description: '副标题文本，显示在标题下方'
      },
      author: {
        type: 'string',
        required: false,
        defaultValue: '',
        description: '作者名称，显示在左下角'
      },
      tagline: {
        type: 'string',
        required: false,
        defaultValue: '',
        description: '标语或口号，显示在作者名称下方'
      },
      textColor: {
        type: 'string',
        required: false,
        defaultValue: '#f7f6dc',
        description: '文本颜色 (CSS颜色值)'
      },
      backgroundColor: {
        type: 'string',
        required: false,
        defaultValue: 'linear-gradient(135deg, #1e40af 0%, #4b5563 50%, #111827 100%)',
        description: '背景颜色或渐变 (CSS背景值)'
      },
      style: {
        type: 'object',
        required: false,
        defaultValue: {},
        description: '自定义样式对象'
      }
    }
  },
  'ComparisonChart': {
    component: ComparisonChart,
    description: '对比图表组件，用于展示两个事物的特性对比，以表格形式呈现',
    propTypes: {
      title: {
        type: 'string',
        required: false,
        defaultValue: undefined,
        description: '对比图表的标题'
      },
      item1Name: {
        type: 'string',
        required: true,
        description: '第一个对比项的名称'
      },
      item2Name: {
        type: 'string',
        required: true,
        description: '第二个对比项的名称'
      },
      items: {
        type: 'array',
        required: true,
        description: '对比项数组，每项包含feature、item1Value和item2Value'
      },
      featureTitle: {
        type: 'string',
        required: false,
        defaultValue: '特性',
        description: '特性列的标题文本'
      },
      headerBgColor: {
        type: 'string',
        required: false,
        defaultValue: '#3b82f6',
        description: '标题背景颜色'
      },
      item1BgColor: {
        type: 'string',
        required: false,
        defaultValue: '#eff6ff',
        description: '第一个对比项的背景颜色'
      },
      item2BgColor: {
        type: 'string',
        required: false,
        defaultValue: '#dbeafe',
        description: '第二个对比项的背景颜色'
      },
      textColor: {
        type: 'string',
        required: false,
        defaultValue: '#1e3a8a',
        description: '文本颜色'
      },
      style: {
        type: 'object',
        required: false,
        defaultValue: {},
        description: '自定义样式对象'
      }
    }
  },
  'SvgRenderer': {
    component: SvgRenderer,
    description: '自定义 SVG 渲染组件，允许传入默认的 SVG 结构来渲染',
    propTypes: {
      svgContent: {
        type: 'string',
        required: false,
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
  },
  // 可以在此处添加更多组件
};

export default ComponentMap; 