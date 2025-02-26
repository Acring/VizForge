import React, { useRef, useEffect, useMemo } from 'react';

interface CanvasRendererProps {
  /**
   * Canvas绘制代码字符串，会被安全地转换为函数执行
   * 代码中可以使用 ctx 参数(CanvasRenderingContext2D)和 canvas 参数(HTMLCanvasElement)
   * 例如: "ctx.fillStyle = 'blue'; ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);"
   */
  drawCode?: string;
  
  /**
   * 宽度，默认为300
   */
  width?: string | number;
  
  /**
   * 高度，默认为200
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
   * 可选的背景颜色
   */
  backgroundColor?: string;
}

// 默认绘制代码
const DEFAULT_DRAW_CODE = `
  // 绘制简单矩形
  ctx.fillStyle = 'blue';
  ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
`;

// 安全的方法白名单
const SAFE_METHODS = [
  'beginPath', 'closePath', 'moveTo', 'lineTo', 'bezierCurveTo', 'quadraticCurveTo',
  'arc', 'arcTo', 'ellipse', 'rect', 'fill', 'stroke', 'clip', 'isPointInPath',
  'fillRect', 'strokeRect', 'clearRect', 'fillText', 'strokeText', 'measureText',
  'drawImage', 'createLinearGradient', 'createRadialGradient', 'createPattern',
  'createImageData', 'getImageData', 'putImageData', 'save', 'restore', 'translate',
  'rotate', 'scale', 'transform', 'setTransform', 'resetTransform'
];

// 定义一个类型，用于表示Canvas上下文的方法类型
type CanvasMethod = (this: CanvasRenderingContext2D, ...args: any[]) => any;

/**
 * Canvas渲染组件，用于执行自定义的canvas绘制代码
 * 
 * 该组件允许传入自定义的canvas绘制代码字符串，并提供了对canvas属性的控制
 * 
 * @param {Object} props - 组件的属性
 * @param {string} props.drawCode - 绘制代码字符串，可以使用ctx和canvas参数
 * @param {string|number} props.width - 宽度，默认为300
 * @param {string|number} props.height - 高度，默认为200
 * @param {string} props.className - 可选的className
 * @param {Object} props.style - 可选的内联样式
 * @param {string} props.backgroundColor - 可选的背景颜色
 */
const CanvasRenderer: React.FC<CanvasRendererProps> = ({
  drawCode = DEFAULT_DRAW_CODE,
  width = 300,
  height = 200,
  className = '',
  style = {},
  backgroundColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 将字符串代码转换为安全的函数
  const safeDrawFunction = useMemo(() => {
    try {
      // 检查代码是否包含潜在的危险操作
      const unsafePatterns = [
        /eval\s*\(/, /Function\s*\(/, /new\s+Function/,
        /document\./, /window\./, /localStorage/, /sessionStorage/,
        /navigator\./, /location\./, /history\./, /alert\s*\(/,
        /setTimeout\s*\(/, /setInterval\s*\(/, /fetch\s*\(/,
        /XMLHttpRequest/, /import\s+/, /require\s*\(/
      ];
      
      const isUnsafe = unsafePatterns.some(pattern => pattern.test(drawCode));
      if (isUnsafe) {
        console.error('检测到不安全的代码模式');
        return (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
          ctx.fillStyle = 'red';
          ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
          ctx.fillStyle = 'white';
          ctx.font = '14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('不安全的代码已被阻止', canvas.width / 2, canvas.height / 2);
        };
      }
      
      // 创建安全的函数
      return (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        try {
          // 创建安全的代理对象，只允许调用白名单中的方法
          const safeCtx = new Proxy(ctx, {
            get: (target, prop) => {
              const property = prop.toString();
              
              // 允许读取所有属性
              if (typeof target[property as keyof CanvasRenderingContext2D] !== 'function') {
                return target[property as keyof CanvasRenderingContext2D];
              }
              
              // 只允许调用安全方法
              if (SAFE_METHODS.includes(property)) {
                return (target[property as keyof CanvasRenderingContext2D] as CanvasMethod).bind(target);
              }
              
              console.warn(`方法 ${property} 不在安全白名单中`);
              return () => {}; // 返回空函数而非报错，避免中断执行
            },
            set: (target, prop, value) => {
              const property = prop.toString();
              // 使用类型断言处理索引访问
              (target as Record<string, unknown>)[property] = value;
              return true;
            }
          });
          
          // 使用 Function 构造函数创建函数，并执行
          const drawFunc = new Function('ctx', 'canvas', drawCode) as (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
          drawFunc(safeCtx, canvas);
        } catch (error) {
          console.error('执行绘制代码时出错:', error);
          ctx.fillStyle = 'orange';
          ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
          ctx.fillStyle = 'black';
          ctx.font = '14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('绘制代码执行出错', canvas.width / 2, canvas.height / 2 - 10);
          ctx.font = '12px Arial';
          ctx.fillText(String(error).substring(0, 30), canvas.width / 2, canvas.height / 2 + 10);
        }
      };
    } catch (error) {
      console.error('创建绘制函数时出错:', error);
      return (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        ctx.fillStyle = 'orange';
        ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('创建绘制函数时出错', canvas.width / 2, canvas.height / 2);
      };
    }
  }, [drawCode]);
  
  // 执行绘制函数
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 如果设置了背景颜色，绘制背景
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // 执行安全的绘制函数
    safeDrawFunction(ctx, canvas);
  };

  // 初始化画布和调用绘制函数
  useEffect(() => {
    draw();
  }, [safeDrawFunction, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      width={typeof width === 'number' ? width : width}
      height={typeof height === 'number' ? height : height}
      className={`${className}`}
      style={{
        display: 'block',
        ...style,
      }}
    />
  );
};

export default CanvasRenderer; 