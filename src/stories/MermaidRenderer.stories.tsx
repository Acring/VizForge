import type { Meta, StoryObj } from '@storybook/react';
import MermaidRendererInfo from '../../mcp/components/MermaidRenderer';

const meta = {
  title: '图表组件/MermaidRenderer',
  component: MermaidRendererInfo.component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    definition: { control: 'text' },
    backgroundColor: { control: 'color' },
    theme: { 
      control: 'select', 
      options: ['default', 'forest', 'dark', 'neutral'] 
    },
    width: { control: 'number' },
    height: { control: 'number' },
  },
} as Meta<typeof MermaidRendererInfo.component>;

export default meta;

type Story = StoryObj<typeof MermaidRendererInfo.component>;

// 基本时序图示例
export const SequenceDiagram: Story = {
  args: {
    definition: `
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
`,
    width: 800,
    height: 400,
    backgroundColor: 'white',
    theme: 'default',
  },
};

// 流程图示例
export const FlowChart: Story = {
  args: {
    definition: `
flowchart TD
    A[开始] --> B{是否已登录?}
    B -->|是| C[显示主页]
    B -->|否| D[显示登录页]
    D --> E[用户登录]
    E --> C
    C --> F[用户操作]
    F --> G[结束]
`,
    width: 800,
    height: 500,
    backgroundColor: '#f5f5f5',
    theme: 'forest',
  },
};

// 甘特图示例
export const GanttChart: Story = {
  args: {
    definition: `
gantt
    title 项目开发计划
    dateFormat  YYYY-MM-DD
    section 设计阶段
    需求分析        :a1, 2023-01-01, 7d
    UI设计          :a2, after a1, 10d
    section 开发阶段
    前端开发        :a3, after a2, 15d
    后端开发        :a4, after a2, 20d
    section 测试阶段
    功能测试        :a5, after a4, 7d
    用户测试        :a6, after a5, 5d
    section 发布
    部署上线        :a7, after a6, 2d
`,
    width: 800,
    height: 400,
    backgroundColor: '#f0f8ff',
    theme: 'default',
  },
};

// 类图示例
export const ClassDiagram: Story = {
  args: {
    definition: `
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat
`,
    width: 800,
    height: 400,
    backgroundColor: '#fff',
    theme: 'dark',
  },
}; 