import Link from "next/link";
import {
  MousePointerClick,
  FormInput,
  Layout,
  Table,
  Navigation,
  AlertCircle,
  Sparkles,
  Smartphone,
  LayoutTemplate,
  ArrowRight,
  Palette,
  FileJson,
  MonitorSmartphone,
  Search,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/lib/registry";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  basic: MousePointerClick,
  form: FormInput,
  layout: Layout,
  "data-display": Table,
  navigation: Navigation,
  feedback: AlertCircle,
  animation: Sparkles,
  mobile: Smartphone,
  templates: LayoutTemplate,
};

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Hero */}
      <div className="mb-12 lg:mb-16">
        <Badge variant="secondary" className="mb-4">v1.0 Beta</Badge>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          UI 组件参考库
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
          专为 AI 设计和开发优化的综合 UI 组件参考平台。200+ 组件覆盖桌面端和移动端，
          支持实时预览、设备切换和结构化元数据导出。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Search className="h-4 w-4" />
            搜索组件
          </Link>
          <Link
            href="/design-system"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            <Palette className="h-4 w-4" />
            Design Token
          </Link>
          <Link
            href="/api/metadata.json"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            <FileJson className="h-4 w-4" />
            JSON 元数据
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-700"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <f.icon className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
            </div>
            <h3 className="font-semibold text-sm">{f.title}</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Categories */}
      <h2 className="mb-6 text-2xl font-bold tracking-tight">组件分类</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {CATEGORIES.map((cat) => {
          const Icon = categoryIcons[cat.id] || MousePointerClick;
          return (
            <Link key={cat.id} href={`/components/${cat.id}`}>
              <Card className="group h-full transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-600">
                <CardContent className="p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 transition-colors group-hover:bg-zinc-200 dark:bg-zinc-800 dark:group-hover:bg-zinc-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{cat.name}</h3>
                    <Badge variant="secondary" className="text-xs">{cat.count}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {catDescs[cat.id] || ""}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const catDescs: Record<string, string> = {
  basic: "按钮、输入框、标签、图标等基础交互元素",
  form: "表单控件、选择器、日期选择、上传等",
  layout: "容器、栅格、分隔线、留白等布局工具",
  "data-display": "表格、列表、卡片、图表等数据呈现",
  navigation: "菜单、面包屑、标签页、分页等导航",
  feedback: "提示、弹窗、加载、进度条等用户反馈",
  animation: "过渡、加载动画、骨架屏等动效",
  mobile: "手势、底部操作、下拉刷新等移动端专用",
  templates: "仪表盘、设置、登录等完整页面模板",
};

const features = [
  { icon: MonitorSmartphone, title: "多设备预览", desc: "一键切换桌面端/移动端/平板视图，实时查看组件在不同设备上的表现" },
  { icon: Search, title: "智能搜索", desc: "按名称、分类、标签快速定位组件，支持模糊搜索" },
  { icon: FileJson, title: "AI 元数据", desc: "每个组件提供结构化 JSON 元数据和 Design Token，AI 可直接读取" },
  { icon: Palette, title: "Design Token", desc: "完整的设计规范体系，确保 AI 生成界面风格一致" },
  { icon: LayoutTemplate, title: "页面模板", desc: "15+ 完整页面模板，提供完整的设计参考" },
  { icon: Sparkles, title: "代码示例", desc: "每个组件附带可复制的代码示例，快速集成" },
];
