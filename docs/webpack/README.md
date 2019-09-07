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

### 核心概念之 Plugins
* 插件用于 bundle 文件的优化，资源管理和环境变量注入
* 作用于整个构建过程

### 常见的 Plugins 有哪些？
|名称|描述|
|---|----|
|CommonsChunkPlugin|将chunks相同的模块代码提取成公共js|
|CleanWebpackPlugin|清理构建目录|
|ExtractTextWebpackPlugin|将 CSS 从bundle文件里提取成一个独立的 CSS 文件|
|CopyWebpackPlugin|将文件或者文件夹拷贝构建输出的目录|
|HtmlWebpackPlugin|创建 html 文件去承载输出的 bundle|
|UglifyjsWebpackPlugin|压缩JS|
|ZipWebpackPlugin|将打包出的资源生成的一个zip包|

### 核心概念之 Mode
* Mode 用来指定当前的构建环境是：production、development 还是 none
* 设置 mode 可以使用 webpack 内置的函数，默认值为 production

### Mode函数的内置功能
|选项|描述|
|---|----|
|development|设置 process.env.NODE_ENV 的值为 development.开启 NamedChunksPlugin 和 NamedModulePlugin|
|production|设置 process.env.NODE_ENV 的值为 production.开启 FlagDependencyUsagePlugin, FlagIncludeChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin|
|none|不开启任何优化选项|

### 资源解析：解析 ES6 & JSX
* [babeljs](https://babeljs.io/docs/en/)
* 详细用法：[github.com/babel/babel-loader](https://github.com/babel/babel-loader)
* 使用 babel-loader
* babel的配置文件是：.babelrc
* 增加 ES6 的 babel preset 配置
  * [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)
* 增加 JSX 的 babel preset-react配置
  * [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)

### 资源解析：解析 CSS
* css-loader 用于加载 .css 文件，并且转换成 commonjs 对象
* style-loader 将样式通过 <style> 标签插入到 head 中
* [style-loader](https://github.com/webpack-contrib/style-loader)
* [css-loader](https://github.com/webpack-contrib/css-loader)

### 资源解析：解析 Less 和 Sass
* [less-loader](https://github.com/webpack-contrib/less-loader)
  * The less-loader requires less as peerDependency.
* [sass-loader](https://github.com/webpack-contrib/sass-loader)
  * The sass-loader requires you to install either Node Sass or Dart Sass on your own (more documentation you can find below). 

### 资源解析：解析图片
* [file-loader](https://github.com/webpack-contrib/file-loader)
* 用于处理文件

### 资源解析：解析字体
* file-loader 也可以解析字体

### 资源解析：使用 url-loader
* url-loader 也可以处理图片和字体
* 可以设置较小资源自动 base64
* [url-loader](https://github.com/webpack-contrib/url-loader)

### Webpack 中的文件监听
* 文件监听是在发现源码变化时，自动重新构建出新的输出文件
* webpack 开启监听模式，有两种方式
  * 启动 webpack 命令时，带上 --watch 参数
  * 在配置 webpack.config.js 中设置 watch:true
  * 唯一缺陷：每次需要手动刷新浏览器

