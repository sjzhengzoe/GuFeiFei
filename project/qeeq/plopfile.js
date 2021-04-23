// Plop 入口文件 需要导出一个函数
// 此函数接受一个 plop 对象 用于创建生成器任务
const { resolve } = require('path');

module.exports = plop => {
  plop.setGenerator('create', {
    description: 'create a React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'React component name',
        default: 'MyComponent',
      },
      {
        type: 'input',
        name: 'type',
        message: 'class or function',
        default: 'function',
      },
    ],
    actions: [
      {
        // 添加 js 文件
        type: 'add',
        path: resolve('./src/components/{{name}}/index.tsx'),
        templateFile: 'src/global/template/React-components-jsx-{{type}}.hbs',
      },
      {
        // 添加 scss 文件
        type: 'add',
        path: resolve('./src/components/{{name}}/index.scss'),
        templateFile: 'src/global/template/React-components-scss.hbs',
      },
      {
        // 添加 test 文件
        type: 'add',
        path: resolve('./src/components/{{name}}/__test.tsx'),
        templateFile: 'src/global/template/React-components-jsx-test.hbs',
      },
      {
        // 添加该模块引入
        type: 'append',
        path: resolve('./src/index.tsx'),
        template: "export { default as {{name}} } from 'Components/{{name}}';",
      },
    ],
  });
};
