import { ComponentInfo } from '../types';
import TitleWithAuthor from '../../src/components/TitleWithAuthor';

const TitleWithAuthorInfo: ComponentInfo = {
  component: TitleWithAuthor,
  description: '一个标题组件，包含标题、副标题、作者和标语，支持自定义样式和背景',
  propTypes: {
    title: {
      type: 'string',
      required: true,
      description: '要显示的标题文本'
    },
    subtitle: {
      type: 'string',
      required: false,
      defaultValue: '',
      description: '副标题文本，显示在标题下方'
    },
    author: {
      type: 'string',
      required: false,
      defaultValue: '',
      description: '作者名称，显示在左下角'
    },
    tagline: {
      type: 'string',
      required: false,
      defaultValue: '',
      description: '标语或口号，显示在作者名称下方'
    },
    textColor: {
      type: 'string',
      required: false,
      defaultValue: '#f7f6dc',
      description: '文本颜色 (CSS颜色值)'
    },
    backgroundColor: {
      type: 'string',
      required: false,
      defaultValue: 'linear-gradient(135deg, #1e40af 0%, #4b5563 50%, #111827 100%)',
      description: '背景颜色或渐变 (CSS背景值)'
    },
    style: {
      type: 'object',
      required: false,
      defaultValue: {},
      description: '自定义样式对象'
    }
  }
};

export default TitleWithAuthorInfo; 