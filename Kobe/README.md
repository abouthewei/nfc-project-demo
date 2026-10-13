# Kobe 页面未编译源码

此目录包含 Kobe 页面所需的 TSX/TypeScript、CSS、数据、页面素材及独立 Vite 入口，不包含构建后的 JS/CSS bundle，也不包含 node_modules。

## 本地运行

```sh
npm install
npm run dev
```

## 构建

```sh
npm run build
```

## 键盘导航

页面引用仓库根目录的共享 `rotary-sdk.js`，不保留项目内副本。开发入口使用 `../rotary-sdk.js`，构建后的 `dist/index.html` 使用 `../../rotary-sdk.js`。部署时需要保留相对目录结构并提供根目录 SDK。

- 导航区、媒体框与内容卡片分别用 `data-rotary-nav`、`data-rotary-highlight` 标记；品牌字标、跳转链接与页脚出处用 `data-rotary-skip` 跳过。
- 播放中的视频离开时通过 `beforeMove`/`beforeBack` 恢复封面，播放器带 `data-rotary-fullscreen` 支持 F 全屏，“返回封面”按钮用 `data-rotary-destination` 把焦点送回封面。
- 构建产物是可直接双击打开的 classic deferred script（字体与首屏 mask 已内联），不依赖网络或 CORS。

视频由页面通过 Bilibili 播放器/来源链接加载；源代码包不含站外视频文件。素材出处和许可说明见 `public/images/kobe/README.md`。
