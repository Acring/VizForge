import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';

const meta: Meta = {
  title: 'Canvas/CanvasRenderer',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '这是一个基于 node-canvas 渲染的 Canvas 组件，可以通过传入 JavaScript 代码字符串来绘制各种图形和图表。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    drawCode: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const NodeCanvasStory = (args: any) => {
  const { drawCode, width = 300, height = 300 } = args;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      // 清除画布
      ctx.clearRect(0, 0, width, height);
      // 执行绘图代码
      try {
        eval(drawCode);
      } catch (error: any) {
        console.error('绘图代码执行错误:', error);
        ctx.fillStyle = 'red';
        ctx.font = '14px Arial';
        ctx.fillText(`错误: ${error.message}`, 10, 20);
      }
    }
  }, [drawCode, width, height]);

  return (
    <canvas ref={canvasRef} width={width} height={height} style={{ border: '1px solid #ccc' }} />
  );
};

// 基础矩形示例
export const BasicRectangle: Story = {
  args: {
    width: 300,
    height: 300,
    drawCode: `
// 绘制红色矩形
ctx.fillStyle = "red";
ctx.fillRect(50, 50, 200, 200);

// 绘制蓝色边框
ctx.strokeStyle = "blue";
ctx.lineWidth = 5;
ctx.strokeRect(50, 50, 200, 200);
    `,
  },
  render: args => <NodeCanvasStory {...args} />,
};

// 圆形和圆弧示例
export const CirclesAndArcs: Story = {
  args: {
    width: 300,
    height: 300,
    drawCode: `
// 绘制完整圆形
ctx.beginPath();
ctx.arc(150, 150, 100, 0, Math.PI * 2);
ctx.fillStyle = "rgba(255, 165, 0, 0.6)";
ctx.fill();

// 绘制圆弧
ctx.beginPath();
ctx.arc(150, 150, 70, 0, Math.PI);
ctx.strokeStyle = "blue";
ctx.lineWidth = 5;
ctx.stroke();

// 绘制另一个圆弧
ctx.beginPath();
ctx.arc(150, 150, 40, Math.PI, Math.PI * 2);
ctx.fillStyle = "green";
ctx.fill();
ctx.strokeStyle = "black";
ctx.stroke();
    `,
  },
  render: args => <NodeCanvasStory {...args} />,
};

// 渐变示例
export const Gradients: Story = {
  args: {
    width: 300,
    height: 300,
    drawCode: `
// 线性渐变
const linearGradient = ctx.createLinearGradient(0, 0, 300, 300);
linearGradient.addColorStop(0, "blue");
linearGradient.addColorStop(0.5, "white");
linearGradient.addColorStop(1, "red");

ctx.fillStyle = linearGradient;
ctx.fillRect(0, 0, 300, 300);

// 径向渐变
const radialGradient = ctx.createRadialGradient(150, 150, 10, 150, 150, 100);
radialGradient.addColorStop(0, "white");
radialGradient.addColorStop(1, "rgba(0, 0, 255, 0.7)");

ctx.fillStyle = radialGradient;
ctx.beginPath();
ctx.arc(150, 150, 100, 0, Math.PI * 2);
ctx.fill();
    `,
  },
  render: args => <NodeCanvasStory {...args} />,
};

// 文本示例
export const Text: Story = {
  args: {
    width: 300,
    height: 300,
    drawCode: `
// 设置背景
ctx.fillStyle = "#f0f0f0";
ctx.fillRect(0, 0, 300, 300);

// 绘制标题文本
ctx.font = "bold 24px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("Canvas 文本示例", 150, 50);

// 绘制普通文本
ctx.font = "16px Georgia";
ctx.fillStyle = "blue";
ctx.textAlign = "left";
ctx.fillText("这是一段普通文本", 30, 100);

// 绘制带描边的文本
ctx.font = "20px Impact";
ctx.strokeStyle = "red";
ctx.lineWidth = 1;
ctx.strokeText("带描边的文本", 30, 150);
ctx.fillStyle = "gold";
ctx.fillText("带描边的文本", 30, 150);

// 绘制旋转文本
ctx.save();
ctx.translate(150, 220);
ctx.rotate(-Math.PI / 6);
ctx.font = "18px Courier";
ctx.fillStyle = "green";
ctx.fillText("旋转的文本", 0, 0);
ctx.restore();
    `,
  },
  render: args => <NodeCanvasStory {...args} />,
};

// 复杂风景画示例
export const LandscapeScene: Story = {
  args: {
    width: 500,
    height: 300,
    drawCode: `
// 绘制天空渐变
const skyGradient = ctx.createLinearGradient(0, 0, 0, 150);
skyGradient.addColorStop(0, "#1e90ff");  // 深蓝色
skyGradient.addColorStop(0.5, "#87ceeb"); // 天蓝色
skyGradient.addColorStop(1, "#e0f7fa");   // 浅蓝色

ctx.fillStyle = skyGradient;
ctx.fillRect(0, 0, 500, 150);

// 绘制太阳
const sunGradient = ctx.createRadialGradient(400, 50, 5, 400, 50, 30);
sunGradient.addColorStop(0, "#ffffff");
sunGradient.addColorStop(0.3, "#ffff00");
sunGradient.addColorStop(1, "#ff8c00");

ctx.beginPath();
ctx.arc(400, 50, 30, 0, Math.PI * 2);
ctx.fillStyle = sunGradient;
ctx.fill();

// 绘制太阳光芒
ctx.save();
ctx.translate(400, 50);
for (let i = 0; i < 12; i++) {
  ctx.rotate(Math.PI / 6);
  ctx.beginPath();
  ctx.moveTo(30, 0);
  ctx.lineTo(45, 0);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#ff8c00";
  ctx.stroke();
}
ctx.restore();

// 绘制远处的山脉
ctx.beginPath();
ctx.moveTo(0, 150);
ctx.lineTo(80, 100);
ctx.lineTo(160, 140);
ctx.lineTo(240, 90);
ctx.lineTo(320, 120);
ctx.lineTo(400, 80);
ctx.lineTo(500, 130);
ctx.lineTo(500, 150);
ctx.closePath();

const mountainGradient = ctx.createLinearGradient(0, 80, 0, 150);
mountainGradient.addColorStop(0, "#4b6cb7");
mountainGradient.addColorStop(1, "#182848");
ctx.fillStyle = mountainGradient;
ctx.fill();

// 绘制中间的山脉
ctx.beginPath();
ctx.moveTo(0, 150);
ctx.bezierCurveTo(100, 120, 200, 180, 300, 130);
ctx.bezierCurveTo(350, 110, 400, 150, 500, 140);
ctx.lineTo(500, 200);
ctx.lineTo(0, 200);
ctx.closePath();

const middleMountainGradient = ctx.createLinearGradient(0, 110, 0, 200);
middleMountainGradient.addColorStop(0, "#1e5799");
middleMountainGradient.addColorStop(1, "#207cca");
ctx.fillStyle = middleMountainGradient;
ctx.fill();

// 绘制草地
const grassGradient = ctx.createLinearGradient(0, 200, 0, 300);
grassGradient.addColorStop(0, "#7cbb00");
grassGradient.addColorStop(1, "#2d5016");
ctx.fillStyle = grassGradient;
ctx.fillRect(0, 200, 500, 100);

// 绘制树干
function drawTree(x, y, height) {
  // 树干
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - 10, y + height);
  ctx.lineTo(x + 10, y + height);
  ctx.closePath();
  ctx.fillStyle = "#8B4513";
  ctx.fill();
  
  // 树冠
  ctx.beginPath();
  ctx.arc(x, y - 10, 30, 0, Math.PI * 2);
  ctx.fillStyle = "#228B22";
  ctx.fill();
  
  // 树冠高光
  ctx.beginPath();
  ctx.arc(x - 5, y - 15, 15, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(152, 251, 152, 0.5)";
  ctx.fill();
}

// 绘制多棵树
drawTree(100, 220, 40);
drawTree(180, 210, 50);
drawTree(300, 230, 35);
drawTree(400, 215, 45);

// 绘制小房子
function drawHouse(x, y) {
  // 房子主体
  ctx.fillStyle = "#F5DEB3";
  ctx.fillRect(x, y, 60, 40);
  
  // 屋顶
  ctx.beginPath();
  ctx.moveTo(x - 10, y);
  ctx.lineTo(x + 30, y - 30);
  ctx.lineTo(x + 70, y);
  ctx.closePath();
  ctx.fillStyle = "#8B0000";
  ctx.fill();
  
  // 门
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(x + 25, y + 15, 15, 25);
  
  // 窗户
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(x + 10, y + 10, 10, 10);
  ctx.fillRect(x + 45, y + 10, 10, 10);
  
  // 窗框
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 10, y + 10, 10, 10);
  ctx.strokeRect(x + 45, y + 10, 10, 10);
  
  // 烟囱
  ctx.fillStyle = "#696969";
  ctx.fillRect(x + 45, y - 25, 8, 15);
  
  // 烟雾
  ctx.beginPath();
  ctx.moveTo(x + 49, y - 30);
  ctx.bezierCurveTo(x + 54, y - 35, x + 59, y - 40, x + 64, y - 35);
  ctx.bezierCurveTo(x + 69, y - 45, x + 74, y - 40, x + 79, y - 45);
  ctx.strokeStyle = "rgba(200, 200, 200, 0.7)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// 绘制房子
drawHouse(230, 250);

// 绘制小路
ctx.beginPath();
ctx.moveTo(260, 290);
ctx.quadraticCurveTo(280, 270, 300, 290);
ctx.quadraticCurveTo(320, 310, 350, 300);
ctx.strokeStyle = "#8B7355";
ctx.lineWidth = 8;
ctx.stroke();

// 绘制小花
function drawFlower(x, y, color) {
  // 花瓣
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.ellipse(
      x + 8 * Math.cos(i * Math.PI / 3),
      y + 8 * Math.sin(i * Math.PI / 3),
      5, 5, 0, 0, Math.PI * 2
    );
    ctx.fillStyle = color;
    ctx.fill();
  }
  
  // 花蕊
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFF00";
  ctx.fill();
}

// 绘制一些随机的花
const flowerColors = ["#FF69B4", "#FF1493", "#9370DB", "#BA55D3", "#FFFFFF"];
for (let i = 0; i < 20; i++) {
  const x = Math.random() * 500;
  const y = 250 + Math.random() * 50;
  const colorIndex = Math.floor(Math.random() * flowerColors.length);
  drawFlower(x, y, flowerColors[colorIndex]);
}

// 绘制云朵
function drawCloud(x, y, scale) {
  ctx.beginPath();
  ctx.arc(x, y, 20 * scale, 0, Math.PI * 2);
  ctx.arc(x + 15 * scale, y - 10 * scale, 15 * scale, 0, Math.PI * 2);
  ctx.arc(x + 30 * scale, y, 20 * scale, 0, Math.PI * 2);
  ctx.arc(x + 15 * scale, y + 10 * scale, 15 * scale, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.fill();
}

// 绘制几朵云
drawCloud(80, 50, 1);
drawCloud(200, 70, 0.8);
drawCloud(350, 40, 1.2);

// 绘制鸟
function drawBird(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + 5, y - 5, x + 10, y);
  ctx.quadraticCurveTo(x + 15, y - 5, x + 20, y);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.stroke();
}

// 绘制几只鸟
drawBird(120, 80);
drawBird(140, 70);
drawBird(160, 85);

// 添加签名
ctx.font = "italic 12px Arial";
ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
ctx.textAlign = "right";
ctx.fillText("Canvas 风景画", 480, 290);
    `,
  },
  render: args => <NodeCanvasStory {...args} />,
};
