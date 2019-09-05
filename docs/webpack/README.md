### Test

```sh
mkdir my-project
cd my-project
npm init -y

npm install webpack webpack-cli --save-dev
```

通过 npm run build 运行构建

原理：模块局部安装会在 node_modules/.bin 目录创建软链接 