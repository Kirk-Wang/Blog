### Test

```sh
mkdir my-project
cd my-project
npm init -y

npm install webpack webpack-cli --save-dev
```

通过 npm run build 运行构建

原理：模块局部安装会在 node_modules/.bin 目录创建软链接 

### 核心概念 Entry

Entry 用来指定 webpack 打包入口

### 理解依赖图的含义

依赖图的入口是 entry

对于非代码比如图片、字体依赖也会不断加入到依赖图中

### Entry 的用法
* 单入口：entry 是一个字符串 (单页应用)
* 多入口：entry 是一个对象 (多页应用)

### 核心概念之 Output
* Output 用来告诉 webpack 如何将编译后的文件输出到磁盘

### Output 的用法：单入口配置

### Output 的用法：多入口配置
* 通过占位符确保文件名称的统一
  * `[name].js`

### 核心概念之 Loaders
webpack 开箱即用只支持 JS 和 JSON 两种文件类型，通过 Loaders 去支持
其它文件类型并且把它们转化成有效的模块，并且可以添加到依赖图中。

本身是一个函数，接受源文件作为参数，返回转换的结果。

### 常见的 Loaders 有哪些？
|名称|描述|
|---|----|
|babel-loader|转换ES6、ES7等JS新特性|
|css-loader|支持.css 文件的加载和解析|
|less-loader|将 less 文件转换为 css|
|ts-loader|将 TS 转换为 JS|
|file-loader|进行图片、字体等的打包|
|raw-loader|将文件以字符串的形式导入|
|thread-loader|多进程打包 JS 和 CSS|

### Loaders 的用法
* test 指定匹配规则
* use 指定使用的 loader 名称
