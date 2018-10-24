# 首屏场景组件 GameTitleScene 的分析

### 路由

```typescript
<Route component={GameTitleScene} />
```

### UI

![](./images/game-title-scene/1.png)


### 组成 GameTitleScene 组件的相关子组件

![](./images/game-title-scene/2.png)

### Screen 组件

1. 他是一个 `svg` 元素。

2. 设置属性用的默认常量，位于当前`BLOCK_SIZE = 16`组件的 `../utils/constants`。
  * `SCREEN_HEIGHT`-->`16 * BLOCK_SIZE(16)`-->(256)
  * `SCREEN_WIDTH`-->`15 * BLOCK_SIZE(16)`-->(240)
  * `ZOOM_LEVEL`-->`2`

3. 渲染视窗设置：
  * `width={SCREEN_WIDTH * ZOOM_LEVEL}`：256 * 2 = 512;
  * `height={SCREEN_HEIGHT * ZOOM_LEVEL}`：240 * 2 = 480;

4. 视野设置（我们能看到的）：
  * viewBox={`0 0 ${SCREEN_WIDTH} ${SCREEN_HEIGHT}`}：`0 0 256, 240`

### GameTitleSceneContent 组件，`SVG` 标签的内容

1. 绘制一块黑色的低（矩形）

```typescript
// BLOCK_SIZE(16) as B，当前视野中 256 * 240
<rect fill="#000000" width={16 * B} height={15 * B} />
```

2. 


