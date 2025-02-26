 
import { ComponentInfo } from '../types';
import CanvasRenderer from '../../src/components/CanvasRenderer';

const CanvasRendererInfo: ComponentInfo = {
  component: CanvasRenderer,
  description: 'Canvas渲染组件，允许传入自定义的canvas绘制代码字符串来渲染画布',
  propTypes: {
    drawCode: {
      type: 'string',
      required: true,
      defaultValue: '// 绘制简单矩形\nctx.fillStyle = "blue";\nctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);',
      description: 'Canvas绘制代码字符串，可以使用ctx和canvas参数'
    },
    width: {
      type: 'string|number',
      required: false,
      defaultValue: 300,
      description: '宽度'
    },
    height: {
      type: 'string|number',
      required: false,
      defaultValue: 200,
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
    backgroundColor: {
      type: 'string',
      required: false,
      defaultValue: undefined,
      description: '可选的背景颜色'
    }
  }
};

export default CanvasRendererInfo; 