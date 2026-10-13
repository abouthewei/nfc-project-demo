# Michael Jordan

此目录包含页面源码。运行 `npm run dev` 开发，运行 `npm run build` 生成独立部署包。

构建入口为 `dist/index.html`，引用仓库根目录的 `../../rotary-sdk.js`。部署时保留该相对目录结构并提供根目录 SDK；项目不保留 SDK 副本。`index.html` 是 Vite 开发入口。

SDK 保留键盘映射，并支持设备的 Play、OK、Back 和顺／逆时针回调。
