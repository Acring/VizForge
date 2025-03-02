import type { Preview } from '@storybook/react';
import '../src/app/globals.css'; // 导入全局样式，包含 Tailwind CSS

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 添加暗色模式支持
    darkMode: {
      // 覆盖默认的暗色模式类名
      classTarget: 'html',
      darkClass: 'dark',
      lightClass: '',
      // 样式设置
      stylePreview: true,
    },
  },
  // 添加全局装饰器以支持主题切换
  globalTypes: {
    theme: {
      name: '主题',
      description: '全局主题设置',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: '亮色模式' },
          { value: 'dark', icon: 'moon', title: '暗色模式' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      // 根据选择的主题设置 dark 类
      const theme = context.globals.theme;
      document.documentElement.classList.toggle('dark', theme === 'dark');
      return Story();
    },
  ],
};

export default preview;
