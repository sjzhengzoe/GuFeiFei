// rollup 的 babel 插件
import babel from 'rollup-plugin-babel';
// rollup无法识别 node_modules 中的包,该插件帮助寻找 node_modules 里的包
import resolve from 'rollup-plugin-node-resolve';
// 处理 ts 需要 npm i tslib  tslib 是 该插件的 peer
import typescript from 'rollup-plugin-typescript';
// scss 文件
import scss from 'rollup-plugin-scss';
// 支持 commonjs 例如一些第三方模块 但是 rollup 本身是不支持的
import commonjs from 'rollup-plugin-commonjs';
// 压缩代码
import { uglify } from 'rollup-plugin-uglify';
// eslint 检查
import { eslint } from 'rollup-plugin-eslint';
// // 可以处理组件中import图片的方式，将图片转换成base64格式，但会增加打包体积，适用于小图标
import image from '@rollup/plugin-image';
// 处理文件路径
import path from 'path';
import fs from 'fs';
// 处理 alias
import alias from '@rollup/plugin-alias';

// 打包类型目前就搞三种 es iife cjs
let buildType = process.env.BUILDTYPE || 'es';
// 打包文件夹名
let buildName = buildType == 'iife' ? 'dist' : buildType;

// 基础配置
let basicConfig = fileName => {
  return {
    plugins: [
      image(),

      typescript(),

      babel({ exclude: '**/node_modules/**' }),

      scss({
        output: `${buildName}/${fileName}/style/index.css`,
      }),

      resolve({
        mainFields: ['browser', 'module'],
      }),

      commonjs(),

      uglify(),

      eslint({
        throwOnError: true,
        throwOnWarning: true,
        include: ['src/**/*.jsx'],
        exclude: ['node_modules/**', 'images/**'],
      }),
      alias({
        entries: [{ find: 'images', replacement: '../../../global/images' }],
      }),
    ],

    // 额外选项
    onwarn(warning) {
      // 跳过某些警告
      // if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;

      // 抛出异常
      if (warning.code === 'NON_EXISTENT_EXPORT')
        throw new Error(warning.message);

      // 控制台打印一切警告
      console.warn(warning.message);
    },

    external: ['react', 'react-dom'],
  };
};

// components 的路径
let componentsPath = path.resolve(__dirname, 'src/components');
// components 下文件夹的名字
let firstFilesNameArr = fs.readdirSync(componentsPath);

// 配置文件数组
let componentsNameArr = [];

firstFilesNameArr.map(firstFilesName => {
  let seconedFilesNameArr = fs.readdirSync(
    `${componentsPath}/${firstFilesName}`
  );
  seconedFilesNameArr.map(seconedFilesName => {
    componentsNameArr.push({
      ...basicConfig(`${firstFilesName}/${seconedFilesName}`),
      input: `./src/components/${`${firstFilesName}/${seconedFilesName}`}/index.tsx`,
      output: {
        file: `${buildName}/${`${firstFilesName}/${seconedFilesName}`}/index.js`,
        format: buildType,
        globals: {
          react: 'React',
        },
        sourcemap: false,
      },
    });
  });
});

export default componentsNameArr;
