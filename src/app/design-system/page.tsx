import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Design Token | UI Reference Hub",
  description: "设计规范体系，AI 可据此生成风格一致的 UI",
};

const colors = {
  primary: ["#18181b", "#27272a", "#3f3f46", "#71717a", "#a1a1aa", "#d4d4d8", "#e4e4e7", "#f4f4f5"],
  accent: ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"],
  success: ["#059669", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0"],
  warning: ["#d97706", "#f59e0b", "#fbbf24", "#fcd34d", "#fde68a"],
  danger: ["#dc2626", "#ef4444", "#f87171", "#fca5a5", "#fecaca"],
};

const spacing = ["0.25rem", "0.5rem", "0.75rem", "1rem", "1.25rem", "1.5rem", "2rem", "2.5rem", "3rem", "4rem"];
const spacingNames = ["xs", "sm", "md", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"];
const radius = ["0.25rem", "0.375rem", "0.5rem", "0.75rem", "1rem", "9999px"];
const radiusNames = ["sm", "md", "lg", "xl", "2xl", "full"];
const fontSizes = ["0.75rem", "0.875rem", "1rem", "1.125rem", "1.25rem", "1.5rem", "2rem", "2.5rem", "3rem"];
const fontSizeNames = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"];
const shadows = [
  "none",
  "0 1px 2px rgba(0,0,0,0.05)",
  "0 1px 3px rgba(0,0,0,0.1)",
  "0 4px 6px rgba(0,0,0,0.1)",
  "0 10px 15px rgba(0,0,0,0.1)",
  "0 20px 25px rgba(0,0,0,0.15)",
];

export default function DesignSystemPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Design Token</h1>
        <p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
          设计规范体系，定义颜色、间距、字体等基础设计变量。AI 可据此生成风格一致的 UI 界面。
        </p>
      </div>

      {/* Color Palette */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">颜色系统</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(colors).map(([name, shades]) => (
            <Card key={name}>
              <CardHeader>
                <CardTitle className="text-sm capitalize">{name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {shades.map((color, i) => (
                    <div key={color} className="text-center">
                      <div
                        className="h-10 w-full rounded-lg border dark:border-zinc-700"
                        style={{ backgroundColor: color }}
                      />
                      <span className="mt-1 block text-[10px] text-zinc-400">
                        {i === 0 ? "900" : (9 - i) * 100}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Spacing */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">间距规范</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-3">
              {spacing.map((space, i) => (
                <div key={space} className="flex items-center gap-4">
                  <span className="w-16 text-sm font-mono text-zinc-500">{spacingNames[i]}</span>
                  <span className="w-24 text-sm font-mono text-zinc-400">{space}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="h-4 rounded bg-zinc-900 dark:bg-zinc-50" style={{ width: `calc(${space} * 4)` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">圆角规范</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap items-end gap-6">
              {radius.map((r, i) => (
                <div key={r} className="text-center">
                  <div
                    className="h-16 w-16 border-2 border-zinc-300 dark:border-zinc-600"
                    style={{ borderRadius: r }}
                  />
                  <span className="mt-2 block text-xs text-zinc-500">{radiusNames[i]}</span>
                  <span className="text-[10px] text-zinc-400">{r}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">字体大小</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {fontSizes.map((size, i) => (
                <div key={size}>
                  <div className="flex items-center gap-4 mb-1">
                    <Badge variant="outline" className="w-14 justify-center font-mono text-xs">{fontSizeNames[i]}</Badge>
                    <span className="text-xs text-zinc-400 font-mono">{size}</span>
                  </div>
                  <p style={{ fontSize: size }} className="leading-tight">
                    这是一个示例文本 - The quick brown fox
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">阴影层级</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shadows.map((shadow, i) => (
                <div
                  key={i}
                  className="flex h-24 items-center justify-center rounded-xl border bg-white text-sm text-zinc-500"
                  style={{ boxShadow: shadow === "none" ? "none" : shadow }}
                >
                  Level {i}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">工具类 (Utility Classes)</h2>
        <p className="text-sm text-zinc-500 mb-4">
          原子化 CSS 工具类，一键生成毛玻璃、卡片悬浮、按钮按压等效果。复合组件 = HTML 标签 + 工具类组合。
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "glass-effect", desc: "毛玻璃效果", preview: "rounded-xl glass-effect p-4 text-sm" },
            { name: "card-lift", desc: "悬浮上浮 + 阴影", preview: "rounded-xl border bg-white dark:bg-zinc-900 p-4 text-sm card-lift cursor-pointer" },
            { name: "btn-press", desc: "点击缩放反馈", preview: "rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-2 text-sm btn-press" },
            { name: "animate-fade-in", desc: "淡入显示", preview: "rounded-xl border p-4 text-sm animate-fade-in" },
            { name: "animate-slide-up", desc: "从下往上滑入", preview: "rounded-xl border p-4 text-sm animate-slide-up" },
            { name: "skeleton-pulse", desc: "骨架屏脉冲", preview: "h-10 rounded-lg skeleton-pulse" },
          ].map((u, i) => (
            <Card key={u.name}>
              <CardContent className="p-5 space-y-3">
                <div>
                  <p className="text-sm font-mono font-medium">{u.name}</p>
                  <p className="text-xs text-zinc-500">{u.desc}</p>
                </div>
                <div className={u.preview}>
                  {u.name === "skeleton-pulse" ? "" : "预览效果"}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">原子化组件层级</h2>
        <p className="text-sm text-zinc-500 mb-4">
          遵循 原子 → 复合 → 页面 → 布局 的四层组件生成逻辑
        </p>
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { level: "L1 原子", desc: "最小不可拆分单元：按钮、输入框、图标、标签、开关", color: "bg-blue-50 dark:bg-blue-950/30 border-blue-200" },
            { level: "L2 复合", desc: "原子组件拼合：卡片、列表项、表单组、导航栏", color: "bg-green-50 dark:bg-green-950/30 border-green-200" },
            { level: "L3 页面", desc: "复合组件纵向排布成完整页面", color: "bg-amber-50 dark:bg-amber-950/30 border-amber-200" },
            { level: "L4 布局", desc: "Flex/Grid 自适应排列多页面", color: "bg-purple-50 dark:bg-purple-950/30 border-purple-200" },
          ].map((l) => (
            <div key={l.level} className={`rounded-xl border p-4 ${l.color}`}>
              <p className="text-sm font-bold">{l.level}</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1">{l.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">动画时长</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 sm:grid-cols-4">
              {[
                { name: "即时", value: "100ms" },
                { name: "快速", value: "200ms" },
                { name: "标准", value: "300ms" },
                { name: "缓慢", value: "500ms" },
              ].map((anim) => (
                <div key={anim.name} className="text-center p-4 rounded-xl border">
                  <p className="text-sm font-medium">{anim.name}</p>
                  <p className="text-lg font-mono text-zinc-500 mt-1">{anim.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
