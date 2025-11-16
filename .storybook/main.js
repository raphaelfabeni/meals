import { fileURLToPath } from 'url';

const r = (p) => fileURLToPath(new URL(p, import.meta.url));

export default {
  framework: '@storybook/react-vite',
  stories: [
    '../src/**/*.stories.@(js|jsx|mdx)',
    '../stories/**/*.stories.@(js|jsx|mdx)',
  ],
  addons: [], // empty for now; v10 doesn’t need old addons
  staticDirs: ['../public'], // so Storybook can load /placeholder.svg
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': r('../src'),
      '@_components': r('../src/app/_components'),
      '@_lib': r('../src/app/_lib'),
    };
    // make sure we use the automatic JSX runtime (no React import needed)
    config.esbuild = { ...(config.esbuild || {}), jsx: 'automatic' };
    return config;
  },
};