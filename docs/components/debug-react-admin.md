### 一步一步调试 React-Admin 源码

```sh
git clone https://github.com/marmelab/react-admin.git

cd react-admin

yarn

cd packages/react-admin

yarn link
// 这里会提示 success Registered "react-admin"

cd ../../examples/simple

yarn link react-admin
// 这里会提示 success Using linked package for "react-admin".

yarn start

```

OK，现在打开 Chrome，进入 http://localhost:8080

F12，我们找到其中的 ra-core 包的源码，下个断点，刷新页面，妥妥的：

点击，进入小视频 --> [![debug-react-admin]()](https://streamable.com/s/3evkg/tzvjqb)