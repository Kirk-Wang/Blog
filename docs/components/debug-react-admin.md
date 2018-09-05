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

1. 单击 Edit

![](../images/debug-step-1.png)

2. 进入断点

![](../images/debug-step-2.png)

3. 继续执行

![](../images/debug-step-3.png)

4. 进入编辑视图

![](../images/debug-step-4.png)
