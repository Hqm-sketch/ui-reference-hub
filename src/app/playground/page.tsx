"use client";

import * as React from "react";
import {
  LayoutDashboard, Settings, Mail, ShoppingCart, User, FileText,
  Image, BarChart3, MessageSquare, Calendar, Lock, CreditCard,
  MapPin, Bell, Search, Home, Star, Heart, AlertTriangle,
  CheckCircle, Info, Download, Code2, Copy, Check, Menu,
  Sparkles, Plus, TrendingUp, RefreshCw, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ComponentRenderer } from "@/components/component-renderer";
import { CATEGORIES, type ComponentMeta } from "@/lib/registry";

// ============ Layout Export Logic ============

interface LayoutSection {
  id: string;
  name: string;
  components: { name: string; category: string; variants: string[]; tokens: Record<string, string> }[];
}

interface LayoutExport {
  name: string;
  description: string;
  pageType: string;
  sections: LayoutSection[];
  designTokens: Record<string, unknown>;
  responsiveBreakpoints: Record<string, number>;
}

function buildLayoutExport(): LayoutExport {
  return {
    name: "仪表盘 Dashboard Layout",
    description: "综合仪表盘页面布局，展示数据分析、导航、表单、反馈等核心 UI 模式",
    pageType: "dashboard",
    sections: [
      {
        id: "header",
        name: "顶部导航栏",
        components: [
          { name: "Header", category: "layout", variants: ["default", "sticky"], tokens: { height: "3.5rem", padding: "0 1.5rem", backgroundColor: "white" } },
          { name: "SearchInput", category: "basic", variants: ["default", "withShortcut"], tokens: { borderRadius: "0.5rem", height: "2.25rem" } },
          { name: "Avatar", category: "basic", variants: ["image", "fallback"], tokens: { width: "2rem", height: "2rem", borderRadius: "9999px" } },
          { name: "DropdownMenu", category: "navigation", variants: ["default"], tokens: { borderRadius: "0.5rem" } },
          { name: "Badge", category: "basic", variants: ["secondary"], tokens: { borderRadius: "0.375rem", padding: "0.125rem 0.625rem" } },
        ],
      },
      {
        id: "sidebar",
        name: "侧边导航栏",
        components: [
          { name: "Sidebar", category: "layout", variants: ["default", "collapsible"], tokens: { width: "16rem", backgroundColor: "#fafafa" } },
          { name: "VerticalNav", category: "navigation", variants: ["default", "withSubmenu"], tokens: { itemHeight: "2.25rem" } },
          { name: "Icon", category: "basic", variants: ["sm", "md"], tokens: { sizes: "1rem / 1.25rem" } },
          { name: "Divider", category: "basic", variants: ["horizontal"], tokens: { color: "#e5e5e5" } },
        ],
      },
      {
        id: "stats",
        name: "统计卡片区",
        components: [
          { name: "StatCard", category: "data-display", variants: ["default", "withTrend"], tokens: { borderRadius: "0.75rem", padding: "1.25rem" } },
          { name: "Card", category: "layout", variants: ["default"], tokens: { borderRadius: "0.75rem", padding: "1.5rem" } },
          { name: "Badge", category: "basic", variants: ["success", "warning"], tokens: { borderRadius: "0.375rem" } },
          { name: "TrendIndicator", category: "data-display", variants: ["up", "down"], tokens: { fontSize: "0.75rem" } },
        ],
      },
      {
        id: "charts",
        name: "图表区域",
        components: [
          { name: "Chart", category: "data-display", variants: ["bar", "line", "area"], tokens: { borderRadius: "0.75rem" } },
          { name: "Tabs", category: "layout", variants: ["line", "pills"], tokens: { tabPadding: "0.5rem 1rem" } },
          { name: "Card", category: "layout", variants: ["default"], tokens: { padding: "1.5rem" } },
          { name: "Select", category: "basic", variants: ["default"], tokens: { borderRadius: "0.5rem" } },
          { name: "Spinner", category: "basic", variants: ["sm", "md"], tokens: {} },
        ],
      },
      {
        id: "table",
        name: "数据表格",
        components: [
          { name: "Table", category: "data-display", variants: ["default", "striped"], tokens: { cellPadding: "0.75rem 1rem", fontSize: "0.875rem" } },
          { name: "Pagination", category: "data-display", variants: ["default"], tokens: { buttonSize: "2rem" } },
          { name: "Badge", category: "basic", variants: ["success", "warning", "destructive"], tokens: {} },
          { name: "Button", category: "basic", variants: ["ghost"], tokens: { size: "sm" } },
          { name: "SearchInput", category: "basic", variants: ["default"], tokens: {} },
        ],
      },
      {
        id: "feedback",
        name: "反馈与通知",
        components: [
          { name: "Toast", category: "feedback", variants: ["success", "error", "info"], tokens: { borderRadius: "0.5rem", padding: "0.75rem 1rem" } },
          { name: "Alert", category: "feedback", variants: ["info", "warning", "error"], tokens: { borderRadius: "0.5rem", padding: "1rem" } },
          { name: "Dialog", category: "feedback", variants: ["default", "confirm"], tokens: { borderRadius: "0.75rem" } },
          { name: "Banner", category: "feedback", variants: ["default", "dismissible"], tokens: { padding: "0.75rem 1rem" } },
          { name: "Result", category: "feedback", variants: ["success", "error"], tokens: { padding: "3rem" } },
        ],
      },
      {
        id: "forms",
        name: "表单区域",
        components: [
          { name: "Form", category: "form", variants: ["default"], tokens: { gap: "1rem" } },
          { name: "Input", category: "basic", variants: ["default", "disabled", "error"], tokens: { borderRadius: "0.5rem", height: "2.5rem" } },
          { name: "Select", category: "basic", variants: ["default"], tokens: { borderRadius: "0.5rem" } },
          { name: "Switch", category: "basic", variants: ["default"], tokens: { width: "2.75rem", height: "1.5rem" } },
          { name: "Button", category: "basic", variants: ["default", "secondary", "outline"], tokens: { borderRadius: "0.5rem", height: "2.5rem" } },
          { name: "Textarea", category: "basic", variants: ["default"], tokens: { minHeight: "5rem" } },
          { name: "Checkbox", category: "basic", variants: ["default"], tokens: {} },
          { name: "StarRating", category: "form", variants: ["default"], tokens: { starSize: "1.5rem" } },
        ],
      },
      {
        id: "empty",
        name: "空状态与错误",
        components: [
          { name: "EmptyState", category: "layout", variants: ["default", "withAction"], tokens: { padding: "3rem" } },
          { name: "ErrorState", category: "layout", variants: ["default"], tokens: { padding: "2rem" } },
          { name: "Skeleton", category: "basic", variants: ["text", "card", "avatar"], tokens: { borderRadius: "0.5rem" } },
          { name: "LoadingOverlay", category: "feedback", variants: ["default"], tokens: {} },
          { name: "Spinner", category: "basic", variants: ["md", "lg"], tokens: {} },
        ],
      },
    ],
    designTokens: {
      colors: { primary: "#18181b", accent: "#2563eb", success: "#059669", warning: "#d97706", danger: "#dc2626", background: "#ffffff", foreground: "#18181b" },
      spacing: { xs: "0.25rem", sm: "0.5rem", md: "1rem", lg: "1.5rem", xl: "2rem", "2xl": "3rem" },
      borderRadius: { sm: "0.25rem", md: "0.5rem", lg: "0.75rem", xl: "1rem", full: "9999px" },
      fontSize: { xs: "0.75rem", sm: "0.875rem", base: "1rem", lg: "1.125rem", xl: "1.25rem", "2xl": "1.5rem", "3xl": "2rem" },
      fontWeight: { normal: "400", medium: "500", semibold: "600", bold: "700" },
      shadow: { sm: "0 1px 2px rgba(0,0,0,0.05)", md: "0 1px 3px rgba(0,0,0,0.1)", lg: "0 4px 6px rgba(0,0,0,0.1)", xl: "0 10px 15px rgba(0,0,0,0.1)" },
      animation: { fast: "150ms", normal: "300ms", slow: "500ms" },
    },
    responsiveBreakpoints: { mobile: 375, tablet: 768, desktop: 1280, wide: 1440 },
  };
}

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = React.useState("preview");
  const [exportOpen, setExportOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const layoutExport = React.useMemo(() => buildLayoutExport(), []);

  const handleCopyExport = async () => {
    await navigator.clipboard.writeText(JSON.stringify(layoutExport, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadExport = () => {
    const blob = new Blob([JSON.stringify(layoutExport, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ui-layout-scheme.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Layout Playground</h1>
          <p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
            真实渲染的 UI 组件布局参考。可导出结构化方案供 AI 识别。
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setExportOpen(true)} className="gap-2">
            <Code2 className="h-4 w-4" />
            导出布局方案
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="preview" className="gap-1.5"><LayoutDashboard className="h-3.5 w-3.5" />布局预览</TabsTrigger>
          <TabsTrigger value="all" className="gap-1.5"><Sparkles className="h-3.5 w-3.5" />全部组件</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          {/* ===== DASHBOARD LAYOUT ===== */}
          <div className="space-y-6">
            {/* Header */}
            <div className="sticky top-0 z-30 rounded-xl border bg-white/80 backdrop-blur-sm shadow-sm dark:border-zinc-700 dark:bg-zinc-900/80">
              <div className="flex items-center justify-between px-6 h-14">
                <div className="flex items-center gap-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                    <LayoutDashboard className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-semibold">Dashboard</span>
                  <div className="flex items-center gap-1 ml-4">
                    {["总览", "分析", "报表", "设置"].map(t => (
                      <Button key={t} variant="ghost" size="sm" className="text-xs h-7">{t}</Button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative hidden sm:block">
                    <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-zinc-400" />
                    <Input className="h-8 pl-8 text-xs w-48" placeholder="搜索..." />
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Bell className="h-4 w-4" /></Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium dark:bg-zinc-700">ZS</button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>个人资料</DropdownMenuItem>
                      <DropdownMenuItem>设置</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">退出</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "总收入", value: "¥128,450", trend: "+12.5%", up: true, icon: BarChart3, color: "blue" },
                { label: "用户数", value: "8,420", trend: "+23.1%", up: true, icon: User, color: "green" },
                { label: "订单量", value: "1,285", trend: "-3.2%", up: false, icon: ShoppingCart, color: "purple" },
                { label: "转化率", value: "4.8%", trend: "+0.8%", up: true, icon: TrendingUp, color: "amber" },
              ].map((s, i) => (
                <Card key={i}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-zinc-500">{s.label}</p>
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-${s.color}-100 dark:bg-${s.color}-900/30`}>
                        <s.icon className={`h-4 w-4 text-${s.color}-600 dark:text-${s.color}-400`} />
                      </div>
                    </div>
                    <p className="text-2xl font-bold mt-2">{s.value}</p>
                    <p className={`flex items-center gap-1 text-xs mt-1 ${s.up ? "text-green-600" : "text-red-600"}`}>
                      {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 rotate-180" />}
                      {s.trend}
                      <span className="text-zinc-400">vs 上月</span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts + Table */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">月度收入</CardTitle>
                    <CardDescription>2026年收入趋势</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">2026 <ChevronRight className="ml-1 h-3 w-3 rotate-90" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>2026</DropdownMenuItem>
                      <DropdownMenuItem>2025</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between gap-2 h-36">
                    {[40, 65, 45, 80, 55, 90, 75, 60, 85, 70, 95, 80].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600 cursor-pointer" style={{ height: `${h}%` }} />
                        <span className="text-[10px] text-zinc-400">{i + 1}月</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">最近订单</CardTitle>
                  <CardDescription>最近5笔交易</CardDescription>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left dark:border-zinc-700">
                        <th className="pb-3 font-medium text-zinc-500">订单号</th>
                        <th className="pb-3 font-medium text-zinc-500">客户</th>
                        <th className="pb-3 font-medium text-zinc-500">金额</th>
                        <th className="pb-3 font-medium text-zinc-500">状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: "#A1284", name: "张三", amount: "¥1,280", status: "已完成" },
                        { id: "#A1283", name: "李四", amount: "¥3,450", status: "处理中" },
                        { id: "#A1282", name: "王五", amount: "¥890", status: "已完成" },
                        { id: "#A1281", name: "赵六", amount: "¥5,200", status: "已取消" },
                      ].map((o, i) => (
                        <tr key={i} className="border-b dark:border-zinc-700">
                          <td className="py-3 font-mono text-xs">{o.id}</td>
                          <td className="py-3">{o.name}</td>
                          <td className="py-3">{o.amount}</td>
                          <td className="py-3">
                            <Badge variant={o.status === "已完成" ? "success" : o.status === "处理中" ? "warning" : "destructive"} className="text-[10px]">{o.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>

            {/* Extra rows */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Feedback */}
              <Card>
                <CardHeader><CardTitle className="text-base">通知</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3">
                    <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <p className="text-sm text-blue-900 dark:text-blue-200">系统更新版本 v2.3.0 已发布</p>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-green-50 dark:bg-green-950/30 p-3">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <p className="text-sm text-green-900 dark:text-green-200">订单 #A1284 支付成功</p>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-red-50 dark:bg-red-950/30 p-3">
                    <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-900 dark:text-red-200">服务器负载过高，请关注</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader><CardTitle className="text-base">快捷操作</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Plus, label: "新建订单", color: "blue" },
                      { icon: User, label: "添加用户", color: "green" },
                      { icon: FileText, label: "生成报表", color: "purple" },
                      { icon: Settings, label: "系统设置", color: "zinc" },
                    ].map((a, i) => (
                      <button key={i} className="flex flex-col items-center gap-2 rounded-xl border p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors dark:border-zinc-700">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                          <a.icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-medium">{a.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Settings Preview */}
              <Card>
                <CardHeader><CardTitle className="text-base">通知设置</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "邮件通知", desc: "接收邮件通知", checked: true },
                    { label: "推送通知", desc: "接收推送通知", checked: true },
                    { label: "短信通知", desc: "接收短信通知", checked: false },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{s.label}</p>
                        <p className="text-xs text-zinc-500">{s.desc}</p>
                      </div>
                      <Switch defaultChecked={s.checked} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Footer */}
            <div className="border-t pt-8 pb-4 text-center text-sm text-zinc-400 dark:border-zinc-800">
              <div className="flex items-center justify-center gap-6 mb-4">
                {["关于", "隐私政策", "服务条款", "联系我们"].map(l => <a key={l} className="hover:text-zinc-600 dark:hover:text-zinc-300">{l}</a>)}
              </div>
              <p>&copy; 2026 UI Reference Hub. AI-driven UI component reference.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="grid gap-8">
            {CATEGORIES.filter(c => c.id !== "templates").map(cat => (
              <section key={cat.id}>
                <h2 className="text-xl font-semibold mb-4">{cat.name}</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {getCategoryComponents(cat.id).map(comp => (
                    <Card key={comp.name}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">{comp.name}</CardTitle>
                          <Badge variant="secondary" className="text-[10px]">{comp.complexity === "simple" ? "简单" : comp.complexity === "medium" ? "中等" : "复杂"}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-lg border p-4 dark:border-zinc-700 min-h-[60px] flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-800/30">
                          <ComponentRenderer
                            componentName={comp.name}
                            category={cat.id}
                            variants={comp.variants}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* ===== EXPORT DIALOG ===== */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>导出布局方案</DialogTitle>
            <DialogDescription>结构化 JSON 格式，可直接提供给 AI 识别和参考</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border p-3 text-center dark:border-zinc-700">
                <p className="text-2xl font-bold">{layoutExport.sections.length}</p>
                <p className="text-xs text-zinc-500">布局区域</p>
              </div>
              <div className="rounded-lg border p-3 text-center dark:border-zinc-700">
                <p className="text-2xl font-bold">
                  {layoutExport.sections.reduce((sum, s) => sum + s.components.length, 0)}
                </p>
                <p className="text-xs text-zinc-500">组件总数</p>
              </div>
              <div className="rounded-lg border p-3 text-center dark:border-zinc-700">
                <p className="text-2xl font-bold">{Object.keys(layoutExport.designTokens).length}</p>
                <p className="text-xs text-zinc-500">Token 类别</p>
              </div>
            </div>

            {/* Sections overview */}
            <ScrollArea className="h-48 rounded-lg border dark:border-zinc-700">
              <div className="p-4 space-y-2">
                {layoutExport.sections.map(section => (
                  <div key={section.id} className="flex items-center justify-between py-2 border-b last:border-0 dark:border-zinc-700">
                    <div>
                      <p className="text-sm font-medium">{section.name}</p>
                      <p className="text-xs text-zinc-500">{section.components.map(c => c.name).join("、")}</p>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">{section.components.length} 组件</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* JSON Preview */}
            <div>
              <p className="text-sm font-medium mb-2">JSON 预览（AI 可读）</p>
              <pre className="rounded-lg bg-zinc-950 p-4 text-xs text-zinc-100 max-h-48 overflow-auto dark:bg-zinc-900">
                {JSON.stringify(layoutExport, null, 2).slice(0, 1500)}...
              </pre>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyExport} className="gap-1.5">
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "已复制" : "复制 JSON"}
              </Button>
              <Button size="sm" onClick={handleDownloadExport} className="gap-1.5">
                <Download className="h-3.5 w-3.5" />
                下载 JSON
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Helper to get some representative components for each category
function getCategoryComponents(catId: string): { name: string; complexity: string; variants: string[] }[] {
  const map: Record<string, { name: string; complexity: string; variants: string[] }[]> = {
    basic: [
      { name: "Button", complexity: "simple", variants: ["default","secondary","outline","ghost","destructive"] },
      { name: "Input", complexity: "simple", variants: ["default","disabled","error"] },
      { name: "Badge", complexity: "simple", variants: ["default","secondary","success","warning","destructive"] },
      { name: "Switch", complexity: "simple", variants: ["default"] },
      { name: "Avatar", complexity: "simple", variants: ["image","fallback","withStatus"] },
      { name: "Spinner", complexity: "simple", variants: ["sm","md","lg"] },
    ],
    form: [
      { name: "StarRating", complexity: "medium", variants: ["default","readonly"] },
      { name: "SwitchGroup", complexity: "simple", variants: ["default"] },
      { name: "TagInput", complexity: "medium", variants: ["default"] },
      { name: "DatePicker", complexity: "complex", variants: ["single","range"] },
      { name: "OtpInput", complexity: "medium", variants: ["numeric"] },
      { name: "Slider", complexity: "medium", variants: ["default"] },
    ],
    layout: [
      { name: "Card", complexity: "simple", variants: ["default","hover"] },
      { name: "Tabs", complexity: "simple", variants: ["line","pills"] },
      { name: "Accordion", complexity: "simple", variants: ["single"] },
      { name: "EmptyState", complexity: "simple", variants: ["default","withAction"] },
      { name: "Divider", complexity: "simple", variants: ["horizontal","withLabel"] },
      { name: "ScrollArea", complexity: "simple", variants: ["vertical"] },
    ],
    "data-display": [
      { name: "StatCard", complexity: "simple", variants: ["default","withTrend"] },
      { name: "Progress", complexity: "simple", variants: ["linear","withLabel"] },
      { name: "ScoreBoard", complexity: "simple", variants: ["default"] },
      { name: "Timeline", complexity: "simple", variants: ["vertical"] },
      { name: "Carousel", complexity: "medium", variants: ["default"] },
      { name: "Pagination", complexity: "medium", variants: ["default"] },
    ],
    navigation: [
      { name: "Breadcrumb", complexity: "simple", variants: ["default"] },
      { name: "DropdownMenu", complexity: "medium", variants: ["default","withIcon"] },
      { name: "Stepper", complexity: "medium", variants: ["horizontal"] },
    ],
    feedback: [
      { name: "Alert", complexity: "simple", variants: ["info","success","warning","error"] },
      { name: "Dialog", complexity: "medium", variants: ["default","confirm"] },
      { name: "Toast", complexity: "medium", variants: ["success","error"] },
      { name: "Result", complexity: "simple", variants: ["success","error"] },
      { name: "ConfirmDialog", complexity: "simple", variants: ["delete"] },
      { name: "Banner", complexity: "simple", variants: ["default","dismissible"] },
    ],
    animation: [
      { name: "Skeleton", complexity: "simple", variants: ["text","card","avatar"] },
      { name: "Spinner", complexity: "simple", variants: ["sm","md","lg"] },
      { name: "Button", complexity: "simple", variants: ["loading"] },
    ],
    mobile: [
      { name: "BottomSheet", complexity: "medium", variants: ["default"] },
      { name: "ActionSheet", complexity: "simple", variants: ["default","destructive"] },
      { name: "FloatingActionButton", complexity: "simple", variants: ["default","extended"] },
      { name: "BottomNavigation", complexity: "simple", variants: ["default","withBadge"] },
    ],
  };
  return map[catId] || [];
}
