import { ComponentInfo } from '../types';
import FeatureShowcase from '../../src/components/FeatureShowcase';

const FeatureShowcaseInfo: ComponentInfo = {
  component: FeatureShowcase,
  description: '功能点展示组件，包含主标题、副标题、无序功能列表，支持渐变背景和噪音效果',
  propTypes: {
    title: {
      type: 'string',
      required: true,
      description: '主标题'
    },
    subtitle: {
      type: 'string',
      required: false,
      defaultValue: undefined,
      description: '副标题'
    },
    features: {
      type: 'array',
      required: true,
      description: '功能点列表（字符串数组）'
    },
    backgroundColor: {
      type: 'string',
      required: false,
      defaultValue: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #9333EA 100%)',
      description: '背景样式，支持颜色值或渐变字符串'
    },
    noiseOpacity: {
      type: 'number',
      required: false,
      defaultValue: 0.05,
      description: '噪点不透明度 (0-1)'
    },
    textColor: {
      type: 'string',
      required: false,
      defaultValue: 'white',
      description: '文本颜色 (CSS颜色值)'
    },
    titleSize: {
      type: 'string',
      required: false,
      defaultValue: '2.5rem',
      description: '标题字体大小 (CSS大小值)'
    },
    subtitleSize: {
      type: 'string',
      required: false,
      defaultValue: '0.8rem',
      description: '副标题字体大小 (CSS大小值)'
    },
    featureSize: {
      type: 'string',
      required: false,
      defaultValue: '1rem',
      description: '功能点字体大小 (CSS大小值)'
    },
    className: {
      type: 'string',
      required: false,
      defaultValue: '',
      description: '自定义CSS类名'
    }
  }
};

export default FeatureShowcaseInfo; 