#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { run } from '@mermaid-js/mermaid-cli';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 定义时序图内容
const sequenceDiagramContent = `
sequenceDiagram
    participant 用户
    participant 前端
    participant 后端
    participant 数据库
    
    用户->>前端: 发起请求
    前端->>后端: API调用
    后端->>数据库: 查询数据
    数据库-->>后端: 返回数据
    后端-->>前端: 返回处理结果
    前端-->>用户: 展示数据
`;

// 主函数
async function generateDiagrams() {
  try {
    // 创建输出目录
    const outputDir = path.join(__dirname, '../output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // 保存 Mermaid 文件
    const mermaidFilePath = path.join(outputDir, 'sequence-diagram.mmd');
    fs.writeFileSync(mermaidFilePath, sequenceDiagramContent.trim());
    console.log(`已生成 Mermaid 文件: ${mermaidFilePath}`);

    // 使用 mermaid-cli API 生成 SVG
    const svgFilePath = path.join(outputDir, 'sequence-diagram.svg');
    await run(mermaidFilePath, svgFilePath);
    console.log(`已生成 SVG 文件: ${svgFilePath}`);

    // 使用 mermaid-cli API 生成 PNG
    const pngFilePath = path.join(outputDir, 'sequence-diagram.png');
    await run(mermaidFilePath, pngFilePath);
    console.log(`已生成 PNG 文件: ${pngFilePath}`);

    console.log('时序图生成完成！');
  } catch (error) {
    console.error('生成图表时出错:', error.message);
  }
}

// 执行主函数
generateDiagrams(); 