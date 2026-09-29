# 南风古灶「窑格」H5

独立静态版入口，使用首页、答题、生成结果、职业结果、窑格卡分享等页面。测试结果和互动状态保存在当前设备的浏览器中。

## 访问

GitHub Pages 部署后访问：

<https://abouthewei.github.io/nfc-project-demo/Yaoge-Visual-Refresh/>

也可以直接打开 yaoge 子目录。入口会自动跳转到该页面。

## 本地预览

在本目录启动任意静态 HTTP 服务，例如：

~~~sh
python3 -m http.server 8000
~~~

打开 <http://127.0.0.1:8000/>。

## 目录

- yaoge/：页面、交互脚本、题目及职业原型内容。
- assets/yaoge/：南风古灶场景、12 种职业插画、六维图标和陶土纹理。
- assets/paper-grain.webp：页面纸张纹理。

项目没有构建步骤，不需要后端。所有图片按目录相对路径加载。包内不包含机器本地运行数据、游客照片、缓存或开发截图。
