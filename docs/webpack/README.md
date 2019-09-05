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