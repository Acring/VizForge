/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from 'react';
import HelloWorld from '../src/components/HelloWorld';

// 组件信息接口
export interface ComponentInfo {
  component: ComponentType<any>;
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
  // 可以在此处添加更多组件
};

export default ComponentMap; 