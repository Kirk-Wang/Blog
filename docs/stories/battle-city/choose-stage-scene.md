# 关卡选择场景组件 ChooseStageScene 的分析

 当我们单击 `1 PLAYER` 时，将进入关卡选择场景。

 ### 路由

```typescript
<Route path="/choose/:stageName" component={ChooseStageScene} />
```

### UI

![](./images/choose-stage-scene/1.png)

### 场景用到的相关组件

![](./images/choose-stage-scene/2.png)