import type { Preview } from "@storybook/react";
import '../src/app/globals.css'; // 导入全局样式，包含 Tailwind CSS

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
