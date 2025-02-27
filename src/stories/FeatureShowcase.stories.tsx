import type { Meta, StoryObj } from '@storybook/react';
import FeatureShowcase from '../components/FeatureShowcase';

const meta: Meta<typeof FeatureShowcase> = {
  title: 'Components/FeatureShowcase',
  component: FeatureShowcase,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    features: { control: 'object' },
    backgroundColor: { control: 'text' },
    textColor: { control: 'color' },
    titleSize: { control: 'text' },
    subtitleSize: { control: 'text' },
    featureSize: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FeatureShowcase>;

// 默认故事
export const Basic: Story = {
  args: {
    title: '产品特点',
    subtitle: '我们的产品提供以下功能',
    features: [
      '直观的用户界面设计',
      '强大的数据分析能力',
      '安全的数据存储方案',
      '灵活的自定义选项'
    ],
    backgroundColor: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #9333EA 100%)',
    textColor: 'white',
    titleSize: '2.5rem',
    subtitleSize: '1rem',
    featureSize: '1rem',
  },
};

// 蓝绿渐变
export const BlueGreenGradient: Story = {
  args: {
    title: '核心优势',
    subtitle: '为什么选择我们的产品',
    features: [
      '高效的工作流程',
      '实时协作功能',
      '跨平台兼容性',
      '24/7 技术支持'
    ],
    backgroundColor: 'linear-gradient(135deg, #0891B2 0%, #0EA5E9 40%, #059669 100%)',
    textColor: 'white',
    titleSize: '2.5rem',
    subtitleSize: '1rem',
    featureSize: '1rem',
  },
};

// 橙红渐变
export const OrangeRedGradient: Story = {
  args: {
    title: '技术亮点',
    subtitle: '先进的技术支持',
    features: [
      'AI 驱动的推荐系统',
      '区块链安全保障',
      '云原生架构',
      '低延迟高并发'
    ],
    backgroundColor: 'linear-gradient(135deg, #F97316 0%, #EF4444 60%, #DC2626 100%)',
    textColor: 'white',
    titleSize: '2.5rem',
    subtitleSize: '1rem',
    featureSize: '1rem',
  },
};

// 彩虹渐变
export const RainbowGradient: Story = {
  args: {
    title: '服务承诺',
    subtitle: '我们对客户的承诺',
    features: [
      '100% 满意保证',
      '30天无理由退款',
      '终身技术支持',
      '定期功能更新'
    ],
    backgroundColor: 'linear-gradient(135deg, #6366F1 0%, #EC4899 50%, #F59E0B 100%)',
    textColor: 'white',
    titleSize: '2.5rem',
    subtitleSize: '1rem',
    featureSize: '1rem',
  },
};

// 浅色主题
export const LightTheme: Story = {
  args: {
    title: '企业方案',
    subtitle: '为企业量身定制',
    features: [
      '多用户管理系统',
      '高级数据分析工具',
      '自定义报表生成',
      '专属客户经理'
    ],
    backgroundColor: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #DBEAFE 100%)',
    textColor: '#1E3A8A',
    titleSize: '2.5rem',
    subtitleSize: '1rem',
    featureSize: '1rem',
  },
};

// 纯色背景
export const SolidBackground: Story = {
  args: {
    title: '用户反馈',
    subtitle: '客户对我们的评价',
    features: [
      '界面简洁直观，易于上手',
      '功能强大，满足各种需求',
      '客户服务响应迅速',
      '持续更新，不断改进'
    ],
    backgroundColor: '#1E40AF',
    textColor: 'white',
    titleSize: '2.5rem',
    subtitleSize: '1rem',
    featureSize: '1rem',
  },
}; 