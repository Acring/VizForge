 
import { ComponentInfo } from '../types';
import HelloWorld from '../../src/components/HelloWorld';

const HelloWorldInfo: ComponentInfo = {
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
};

export default HelloWorldInfo; 