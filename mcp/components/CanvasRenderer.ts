import { ComponentInfo } from '../types';

const CanvasRendererInfo: ComponentInfo = {
  description: 'Canvas渲染组件，允许传入自定义的canvas绘制代码字符串来渲染画布',
  propTypes: {
    drawCode: {
      type: 'string',
      required: true,
      defaultValue: '// 绘制简单矩形\nctx.fillStyle = "blue";\nctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);',
      description: 'Canvas绘制代码字符串，可以使用ctx和canvas参数'
    },
  }
};

export default CanvasRendererInfo; 