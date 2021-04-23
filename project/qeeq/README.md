# 使用说明

## 安装

```
npm i qeeq-components
```

## 配置 babel.config.js 文件

按需引入并自动引入样式文件，需进行如下设置。

```
plugins:[
	[
      'import',
      {
        libraryName: 'qeeq-components',
        libraryDirectory: 'dist',
        style: true,
        camel2DashComponentName: false,
      },
      'qeeq-components',
    ]
]
```

## 使用

```
import { Input,Text} from 'qeeq-components';
```

# 开发说明

## 开启本地

```
npm run server
```

例如此处本地调试 Input 组件则是如下链接
http://localhost:9000/Input

## 快速创建一个组件模板

```
npm run create
```

## 开发注意

### 尽量少用图片 尽可能用户配置

如需图片测试可使用链接
https://oss.qeeq.com/s/public/act/0e0372726e83452e88c72abf83052234.jpg
进行测试
