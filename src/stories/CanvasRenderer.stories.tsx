import type { Meta, StoryObj } from '@storybook/react';
import CanvasRenderer from '../components/CanvasRenderer';

const meta: Meta<typeof CanvasRenderer> = {
  title: '组件/CanvasRenderer',
  component: CanvasRenderer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    drawCode: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    className: { control: 'text' },
    style: { control: 'object' },
    backgroundColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof CanvasRenderer>;

// 默认样例
export const 默认: Story = {
  args: {
    width: 300,
    height: 200,
  },
};

// 简单形状
export const 简单形状: Story = {
  args: {
    width: 300,
    height: 200,
    backgroundColor: '#f0f9ff',
    drawCode: `
      // 绘制一个圆形
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();
      
      // 绘制一个矩形
      ctx.beginPath();
      ctx.rect(50, 50, 50, 50);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      
      // 绘制一个三角形
      ctx.beginPath();
      ctx.moveTo(canvas.width - 50, 50);
      ctx.lineTo(canvas.width - 100, 100);
      ctx.lineTo(canvas.width - 50, 100);
      ctx.closePath();
      ctx.fillStyle = '#10b981';
      ctx.fill();
    `,
  },
};

// 渐变效果
export const 渐变效果: Story = {
  args: {
    width: 300,
    height: 200,
    drawCode: `
      // 创建线性渐变
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(0.5, '#8b5cf6');
      gradient.addColorStop(1, '#ec4899');
      
      // 绘制渐变背景
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 绘制文字
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('渐变背景', canvas.width / 2, canvas.height / 2);
    `,
  },
};

// 简单图表
export const 简单图表: Story = {
  args: {
    width: 400,
    height: 300,
    backgroundColor: 'white',
    drawCode: `
      const data = [50, 120, 80, 150, 180, 90];
      const maxData = Math.max(...data);
      const barWidth = (canvas.width - 60) / data.length;
      const barSpacing = 10;
      const bottomPadding = 40;
      
      // 绘制坐标轴
      ctx.beginPath();
      ctx.moveTo(30, 30);
      ctx.lineTo(30, canvas.height - bottomPadding);
      ctx.lineTo(canvas.width - 30, canvas.height - bottomPadding);
      ctx.stroke();
      
      // 绘制柱状图
      data.forEach((value, index) => {
        const barHeight = ((canvas.height - bottomPadding - 60) * value) / maxData;
        const x = 30 + index * (barWidth + barSpacing);
        const y = canvas.height - bottomPadding - barHeight;
        
        // 绘制柱子
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // 绘制数值
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + barWidth / 2, y - 10);
        
        // 绘制x轴标签
        ctx.fillText(\`项目\${index + 1}\`, x + barWidth / 2, canvas.height - 20);
      });
      
      // 绘制标题
      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText('简单柱状图', canvas.width / 2, 15);
    `,
  },
}; 