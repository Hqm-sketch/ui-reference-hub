# UI Reference Hub

AI 驱动的 UI 组件参考库。200+ 组件覆盖桌面端和移动端，支持**可视化搭建界面 → 导出布局方案 → 丢给 AI 生成代码**。

## 在线使用

打开浏览器即可使用，无需安装：
👉 **[hqm-sketch.github.io/ui-reference-hub](https://hqm-sketch.github.io/ui-reference-hub/)**

| 功能 | 说明 |
|------|------|
| 📋 组件浏览 | 8大分类、200+组件，桌面/移动/平板三端预览 |
| 🏗 界面搭建器 | 可视化搭建页面布局，自由拖拽排序、调整大小 |
| 📤 导出方案 | 将搭建好的布局导出为结构化 JSON，直接提供给 AI（如 Claude、ChatGPT）生成代码 |
| 🎨 Design Token | 完整的设计规范体系（颜色、间距、圆角、字体、阴影） |
| 📱 响应式 | 支持桌面端/移动端/平板设备预览切换 |
| 🌙 深色模式 | 支持浅色/深色主题切换 |
| 🔍 搜索 | 按名称、标签、分类搜索组件 |

## 界面搭建器怎么用

1. 打开 `/builder` 页面
2. 顶部切换平台（手机应用 / 桌面软件 / 平板）
3. 左侧组件库点选组件，添加到画布
4. **按住组件拖动**上下排序
5. **拖边缘**自由调整宽高
6. 右侧面板填写**备注**（告诉 AI 这个区域放什么数据）
7. 点「导出方案」→ 复制或下载 JSON
8. 把 JSON 丢给 AI："请按这个布局帮我写 React + Tailwind 代码"

## 本地运行

```bash
# 克隆项目
git clone git@github.com:Hqm-sketch/ui-reference-hub.git
cd ui-reference-hub

# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 浏览器打开 http://localhost:3000

# 构建静态文件
npm run build
# 输出在 out/ 目录，可部署到任意静态服务器
```

## 技术栈

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4 + Radix UI
- 静态导出（GitHub Pages 部署）

## 项目结构

```
src/
├── app/                    # 页面路由
│   ├── page.tsx            # 首页
│   ├── builder/            # 界面搭建器
│   ├── playground/         # 布局预览
│   ├── search/             # 搜索页
│   ├── design-system/      # Design Token
│   ├── templates/          # 页面模板
│   └── components/[category]/[component]/  # 组件详情
├── components/
│   ├── ui/                 # 基础 UI 组件库
│   ├── component-renderer.tsx  # 组件渲染器
│   └── ...
├── content/components/     # 200+ 组件数据
└── lib/                    # 工具函数
```

## License

MIT
