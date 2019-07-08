// rollup.config.js
import replace from 'rollup-plugin-replace';

export default [
  {
    input: 'src/top/index.js',
    output: {
      file: 'dist/index.js',
      format: 'iife',
    },
    plugins: [
      replace({
        ENVIRONMENT: JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  },
  {
    input: 'src/navigator/index.js',
    output: {
      file: 'dist/navigator.js',
      format: 'iife',
    },
  },
];
