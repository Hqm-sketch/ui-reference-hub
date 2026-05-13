"use client";

import * as React from "react";
import {
  Monitor, Smartphone, Tablet, LayoutTemplate, Plus, X, Download, Copy, Check,
  Search, Trash2, GripVertical, ArrowLeft, Palette, Code2, ChevronRight,
  MousePointerClick, FormInput, Layout, Table, Navigation, AlertCircle,
  Sparkles, Menu, Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ComponentRenderer } from "@/components/component-renderer";
import { cn } from "@/lib/utils";

// ============ Types ============

type Platform = "desktop" | "mobile" | "tablet";

interface SlotComponent {
  name: string;
  category: string;
  variants: string[];
}

interface LayoutSlot {
  id: string;
  name: string;
  description: string;
  component: SlotComponent | null;
}

interface LayoutConfig {
  platform: Platform;
  name: string;
  slots: LayoutSlot[];
}

// ============ Platform Layouts ============

const PLATFORM_LAYOUTS: Record<Platform, { name: string; icon: typeof Monitor; slots: { id: string; name: string; description: string }[] }> = {
  desktop: {
    name: "桌面软件",
    icon: Monitor,
    slots: [
      { id: "header", name: "顶部导航栏", description: "Logo、搜索、菜单、用户头像" },
      { id: "sidebar", name: "侧边栏", description: "导航菜单、快捷操作" },
      { id: "content", name: "主内容区", description: "仪表盘、表格、表单、列表" },
      { id: "footer", name: "底部栏", description: "版权信息、链接、状态栏" },
    ],
  },
  mobile: {
    name: "移动端应用",
    icon: Smartphone,
    slots: [
      { id: "statusbar", name: "状态栏", description: "时间、电量、信号" },
      { id: "header", name: "顶部标题栏", description: "标题、返回按钮、操作" },
      { id: "content", name: "主内容区", description: "列表、卡片、表单、媒体" },
      { id: "bottomnav", name: "底部导航栏", description: "主要页面切换" },
      { id: "fab", name: "悬浮按钮", description: "主要操作入口" },
    ],
  },
  tablet: {
    name: "平板应用",
    icon: Tablet,
    slots: [
      { id: "header", name: "顶部导航栏", description: "标题、搜索、操作按钮" },
      { id: "sidebar", name: "侧边栏（可折叠）", description: "导航、筛选面板" },
      { id: "content", name: "主内容区", description: "内容展示、表单、媒体" },
      { id: "footer", name: "底部工具栏", description: "辅助操作、状态信息" },
    ],
  },
};

// ============ Component Library ============

const COMPONENT_LIBRARY: { category: string; categoryName: string; icon: typeof MousePointerClick; components: SlotComponent[] }[] = [
  {
    category: "basic", categoryName: "基础组件", icon: MousePointerClick,
    components: [
      { name: "Button", category: "basic", variants: ["default","secondary","outline","ghost","destructive"] },
      { name: "Input", category: "basic", variants: ["default","disabled","error"] },
      { name: "Badge", category: "basic", variants: ["default","secondary","success","warning"] },
      { name: "Switch", category: "basic", variants: ["default"] },
      { name: "Avatar", category: "basic", variants: ["image","fallback","withStatus"] },
      { name: "Spinner", category: "basic", variants: ["sm","md","lg"] },
      { name: "SearchInput", category: "basic", variants: ["default"] },
      { name: "Tooltip", category: "basic", variants: ["top"] },
      { name: "Divider", category: "basic", variants: ["horizontal"] },
    ],
  },
  {
    category: "navigation", categoryName: "导航组件", icon: Navigation,
    components: [
      { name: "Breadcrumb", category: "navigation", variants: ["default"] },
      { name: "DropdownMenu", category: "navigation", variants: ["default"] },
      { name: "Stepper", category: "navigation", variants: ["horizontal"] },
      { name: "Pagination", category: "navigation", variants: ["default"] },
    ],
  },
  {
    category: "layout", categoryName: "布局组件", icon: Layout,
    components: [
      { name: "Card", category: "layout", variants: ["default","hover"] },
      { name: "Tabs", category: "layout", variants: ["line","pills"] },
      { name: "Accordion", category: "layout", variants: ["single"] },
      { name: "EmptyState", category: "layout", variants: ["default","withAction"] },
      { name: "ErrorState", category: "layout", variants: ["default"] },
    ],
  },
  {
    category: "data-display", categoryName: "数据展示", icon: Table,
    components: [
      { name: "StatCard", category: "data-display", variants: ["default","withTrend"] },
      { name: "Progress", category: "data-display", variants: ["linear","withLabel"] },
      { name: "Timeline", category: "data-display", variants: ["vertical"] },
      { name: "ScoreBoard", category: "data-display", variants: ["default"] },
      { name: "Carousel", category: "data-display", variants: ["default"] },
      { name: "Pagination", category: "data-display", variants: ["default"] },
    ],
  },
  {
    category: "form", categoryName: "表单组件", icon: FormInput,
    components: [
      { name: "Form", category: "form", variants: ["default"] },
      { name: "Select", category: "basic", variants: ["default"] },
      { name: "Checkbox", category: "basic", variants: ["default"] },
      { name: "RadioGroup", category: "basic", variants: ["default"] },
      { name: "DatePicker", category: "form", variants: ["single","range"] },
      { name: "StarRating", category: "form", variants: ["default"] },
      { name: "SwitchGroup", category: "form", variants: ["default"] },
      { name: "TagInput", category: "form", variants: ["default"] },
      { name: "OtpInput", category: "form", variants: ["numeric"] },
    ],
  },
  {
    category: "feedback", categoryName: "反馈组件", icon: AlertCircle,
    components: [
      { name: "Alert", category: "feedback", variants: ["info","success","warning","error"] },
      { name: "Dialog", category: "feedback", variants: ["default","confirm"] },
      { name: "Toast", category: "feedback", variants: ["success","error"] },
      { name: "Result", category: "feedback", variants: ["success","error"] },
      { name: "ConfirmDialog", category: "feedback", variants: ["delete"] },
      { name: "Banner", category: "feedback", variants: ["default"] },
    ],
  },
  {
    category: "mobile", categoryName: "移动端专用", icon: Smartphone,
    components: [
      { name: "BottomSheet", category: "mobile", variants: ["default"] },
      { name: "ActionSheet", category: "mobile", variants: ["default"] },
      { name: "FloatingActionButton", category: "mobile", variants: ["default","extended"] },
      { name: "BottomNavigation", category: "mobile", variants: ["default","withBadge"] },
      { name: "MobileSearch", category: "mobile", variants: ["default"] },
    ],
  },
];

// ============ Main Page ============

export default function BuilderPage() {
  const [platform, setPlatform] = React.useState<Platform>("desktop");
  const [slots, setSlots] = React.useState<LayoutSlot[]>(() =>
    PLATFORM_LAYOUTS.desktop.slots.map(s => ({ ...s, component: null }))
  );
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [layoutName, setLayoutName] = React.useState("我的界面布局");

  const platformMeta = PLATFORM_LAYOUTS[platform];

  const switchPlatform = (p: Platform) => {
    setPlatform(p);
    setSlots(PLATFORM_LAYOUTS[p].slots.map(s => ({ ...s, component: null })));
    setSelectedSlot(null);
  };

  const assignComponent = (component: SlotComponent) => {
    if (!selectedSlot) return;
    setSlots(prev => prev.map(s =>
      s.id === selectedSlot ? { ...s, component } : s
    ));
    setPickerOpen(false);
  };

  const removeComponent = (slotId: string) => {
    setSlots(prev => prev.map(s =>
      s.id === slotId ? { ...s, component: null } : s
    ));
  };

  const buildExportData = () => ({
    name: layoutName,
    platform,
    platformName: platformMeta.name,
    createdAt: new Date().toISOString(),
    slots: slots.map(s => ({
      id: s.id,
      name: s.name,
      component: s.component ? {
        name: s.component.name,
        category: s.component.category,
        url: `/components/${s.component.category}/${s.component.name.toLowerCase()}`,
      } : null,
    })),
    usedComponents: slots.filter(s => s.component).map(s => ({
      slotId: s.id,
      slotName: s.name,
      component: s.component!.name,
      category: s.component!.category,
      variants: s.component!.variants,
    })),
    designTokens: {
      platform,
      responsiveBreakpoints: { mobile: 375, tablet: 768, desktop: 1280 },
      colors: { primary: "#18181b", accent: "#2563eb", success: "#059669", danger: "#dc2626", background: "#ffffff" },
      spacing: { xs: "0.25rem", sm: "0.5rem", md: "1rem", lg: "1.5rem", xl: "2rem" },
      borderRadius: { sm: "0.25rem", md: "0.5rem", lg: "0.75rem", full: "9999px" },
    },
  });

  const handleCopyExport = async () => {
    await navigator.clipboard.writeText(JSON.stringify(buildExportData(), null, 2));
  };

  const handleDownloadExport = () => {
    const blob = new Blob([JSON.stringify(buildExportData(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${layoutName.replace(/\s/g, "-").toLowerCase()}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  // Filter components for picker
  const filteredLibrary = React.useMemo(() => {
    if (!searchQuery.trim()) return COMPONENT_LIBRARY;
    const q = searchQuery.toLowerCase();
    return COMPONENT_LIBRARY.map(cat => ({
      ...cat,
      components: cat.components.filter(c =>
        c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
      ),
    })).filter(cat => cat.components.length > 0);
  }, [searchQuery]);

  // Device frame dimensions
  const frameStyles: Record<Platform, string> = {
    desktop: "w-full max-w-4xl mx-auto",
    mobile: "w-[375px] mx-auto",
    tablet: "w-[640px] mx-auto",
  };

  return (
    <div className="h-[calc(100vh-0px)] flex flex-col">
      {/* ===== TOP BAR ===== */}
      <div className="shrink-0 border-b bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <LayoutTemplate className="h-5 w-5" />
              <span className="text-sm font-semibold">界面搭建器</span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            {/* Platform toggle */}
            <div className="flex rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-800">
              {(["desktop", "tablet", "mobile"] as Platform[]).map(p => {
                const meta = PLATFORM_LAYOUTS[p];
                const Icon = meta.icon;
                return (
                  <button
                    key={p}
                    onClick={() => switchPlatform(p)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-all",
                      platform === p
                        ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-50"
                        : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{meta.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Input
              className="h-8 w-40 text-xs"
              placeholder="布局名称..."
              value={layoutName}
              onChange={e => setLayoutName(e.target.value)}
            />
            <Button size="sm" variant="outline" onClick={() => setExportOpen(true)} className="gap-1.5 h-8 text-xs">
              <Code2 className="h-3.5 w-3.5" />
              导出布局
            </Button>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex min-h-0">
        {/* LEFT: Component Library */}
        <div className="w-60 shrink-0 border-r bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="p-3 border-b dark:border-zinc-800">
            <div className="relative">
              <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-zinc-400" />
              <Input
                className="pl-7 h-8 text-xs"
                placeholder="搜索组件..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-7rem)]">
            <div className="p-2 space-y-1">
              {filteredLibrary.map(cat => (
                <div key={cat.category}>
                  <div className="flex items-center gap-1.5 px-2 py-1.5">
                    <cat.icon className="h-3 w-3 text-zinc-400" />
                    <span className="text-[11px] font-semibold uppercase text-zinc-400">{cat.categoryName}</span>
                  </div>
                  {cat.components.map(comp => (
                    <button
                      key={comp.name}
                      onClick={() => {
                        if (selectedSlot) {
                          assignComponent(comp);
                        }
                      }}
                      className={cn(
                        "w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors hover:bg-zinc-200/60 dark:hover:bg-zinc-800",
                        !selectedSlot && "opacity-50 cursor-not-allowed"
                      )}
                      disabled={!selectedSlot}
                      title={!selectedSlot ? "请先在预览区选择一个区域" : `添加 ${comp.name}`}
                    >
                      <span className="text-xs">{comp.name}</span>
                      <span className="ml-1 text-[10px] text-zinc-400">
                        {comp.variants.length > 0 ? `(${comp.variants.length} 变体)` : ""}
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* CENTER: Canvas Preview */}
        <div className="flex-1 flex items-start justify-center p-4 bg-zinc-100/50 dark:bg-zinc-900/50 overflow-auto">
          <div className={cn("flex flex-col gap-0", frameStyles[platform])}>
            {/* Device frame */}
            <div className="rounded-xl border-2 border-zinc-300 bg-white shadow-lg overflow-hidden dark:border-zinc-600 dark:bg-zinc-950">
              {/* Browser chrome (desktop/tablet) */}
              {(platform === "desktop" || platform === "tablet") && (
                <div className="flex items-center gap-2 h-9 px-3 bg-zinc-100 border-b dark:bg-zinc-800 dark:border-zinc-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-[10px] text-zinc-400 truncate flex-1 text-center">
                    {layoutName} — {platformMeta.name}
                  </span>
                </div>
              )}

              {/* Layout Slots */}
              <div className={cn(
                "min-h-[500px]",
                platform === "mobile" && "min-h-[600px]"
              )}>
                {slots.map(slot => (
                  <LayoutSlotRenderer
                    key={slot.id}
                    slot={slot}
                    platform={platform}
                    isSelected={selectedSlot === slot.id}
                    onSelect={() => setSelectedSlot(slot.id)}
                    onRemove={() => removeComponent(slot.id)}
                  />
                ))}
              </div>
            </div>

            {/* Hint */}
            {!selectedSlot && (
              <div className="mt-3 text-center text-xs text-amber-600 dark:text-amber-400">
                👆 点击预览区的虚线框选择区域，然后从左侧组件库挑选组件
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Slot Info */}
        <div className="w-64 shrink-0 border-l bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30">
          <ScrollArea className="h-[calc(100vh-3.5rem)]">
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-4">布局区域</h3>
              <div className="space-y-2">
                {slots.map(slot => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={cn(
                      "w-full text-left rounded-lg border p-3 transition-all",
                      selectedSlot === slot.id
                        ? "border-zinc-900 bg-white dark:border-zinc-50 dark:bg-zinc-800"
                        : "border-zinc-200 hover:bg-white dark:border-zinc-700 dark:hover:bg-zinc-800"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{slot.name}</span>
                      {slot.component && (
                        <button
                          onClick={e => { e.stopPropagation(); removeComponent(slot.id); }}
                          className="rounded p-0.5 hover:bg-red-100 dark:hover:bg-red-900/30"
                        >
                          <X className="h-3 w-3 text-zinc-400 hover:text-red-500" />
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5">{slot.description}</p>
                    {slot.component ? (
                      <Badge variant="secondary" className="mt-2 text-[10px]">{slot.component.name}</Badge>
                    ) : (
                      <p className="mt-1 text-[11px] text-amber-500">未选择组件</p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* ===== EXPORT DIALOG ===== */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="max-w-xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>导出布局方案</DialogTitle>
            <DialogDescription>
              结构化 JSON 格式，包含布局结构、组件信息、设计 Token，可直接提供给 AI
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border p-3 text-center dark:border-zinc-700">
                <p className="text-xl font-bold">{slots.filter(s => s.component).length}</p>
                <p className="text-[10px] text-zinc-500">已选组件</p>
              </div>
              <div className="rounded-lg border p-3 text-center dark:border-zinc-700">
                <p className="text-xl font-bold">{slots.length}</p>
                <p className="text-[10px] text-zinc-500">布局区域</p>
              </div>
              <div className="rounded-lg border p-3 text-center dark:border-zinc-700">
                <p className="text-xl font-bold">{platformMeta.name}</p>
                <p className="text-[10px] text-zinc-500">目标平台</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">JSON 预览（AI 可读）</p>
              <pre className="rounded-lg bg-zinc-950 p-3 text-xs text-zinc-100 max-h-48 overflow-auto dark:bg-zinc-900">
                {JSON.stringify(buildExportData(), null, 2)}
              </pre>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyExport} className="gap-1.5">
                <Copy className="h-3.5 w-3.5" />复制 JSON
              </Button>
              <Button size="sm" onClick={handleDownloadExport} className="gap-1.5">
                <Download className="h-3.5 w-3.5" />下载 JSON
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ============ Layout Slot Renderer ============

function LayoutSlotRenderer({
  slot, platform, isSelected, onSelect, onRemove,
}: {
  slot: LayoutSlot;
  platform: Platform;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
}) {
  const slotStyles: Record<string, string> = {
    header: "h-14",
    sidebar: "h-48",
    content: "flex-1 min-h-[280px]",
    footer: "h-12",
    statusbar: "h-8",
    bottomnav: "h-14",
    fab: "h-16",
  };

  // Special layout for desktop: header + (sidebar | content) + footer
  if (platform === "desktop") {
    if (slot.id === "header") return <SlotBar slot={slot} isSelected={isSelected} onSelect={onSelect} onRemove={onRemove} className="h-14 border-b dark:border-zinc-700" />;
    if (slot.id === "footer") return <SlotBar slot={slot} isSelected={isSelected} onSelect={onSelect} onRemove={onRemove} className="h-10 border-t dark:border-zinc-700" />;
    if (slot.id === "sidebar") return (
      <div className="flex flex-1 min-h-[300px]">
        <SlotBar slot={slot} isSelected={isSelected} onSelect={onSelect} onRemove={onRemove} className="w-48 border-r dark:border-zinc-700" />
        <SlotPlaceholder slotId="content" isSelected={isSelected} />
      </div>
    );
    if (slot.id === "content") return null; // rendered as placeholder in the sidebar slot
  }

  // Tablet layout
  if (platform === "tablet") {
    if (slot.id === "header") return <SlotBar slot={slot} isSelected={isSelected} onSelect={onSelect} onRemove={onRemove} className="h-14 border-b dark:border-zinc-700" />;
    if (slot.id === "footer") return <SlotBar slot={slot} isSelected={isSelected} onSelect={onSelect} onRemove={onRemove} className="h-10 border-t dark:border-zinc-700" />;
    if (slot.id === "sidebar") return (
      <div className="flex flex-1 min-h-[300px]">
        <SlotBar slot={slot} isSelected={isSelected} onSelect={onSelect} onRemove={onRemove} className="w-40 border-r dark:border-zinc-700" />
        <SlotPlaceholder slotId="content" isSelected={isSelected} />
      </div>
    );
    if (slot.id === "content") return null;
  }

  // Mobile layout
  if (platform === "mobile") {
    if (slot.id === "content") return <SlotBar slot={slot} isSelected={isSelected} onSelect={onSelect} onRemove={onRemove} className="flex-1 min-h-[350px]" />;
    if (slot.id === "fab") return (
      <div className="relative h-0">
        <div className="absolute bottom-4 right-4">
          <SlotBar slot={slot} isSelected={isSelected} onSelect={onSelect} onRemove={onRemove} className="h-14 w-14 rounded-full" />
        </div>
      </div>
    );
  }

  return <SlotBar slot={slot} isSelected={isSelected} onSelect={onSelect} onRemove={onRemove} className={slotStyles[slot.id] || "h-16"} />;
}

function SlotPlaceholder({ slotId, isSelected }: { slotId: string; isSelected: boolean }) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[300px] bg-zinc-50/50 dark:bg-zinc-900/30">
      <p className="text-xs text-zinc-300 dark:text-zinc-600">选择 &quot;{slotId}&quot; 区域添加组件</p>
    </div>
  );
}

function SlotBar({
  slot, isSelected, onSelect, onRemove, className,
}: {
  slot: LayoutSlot;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "relative transition-all cursor-pointer group",
        isSelected && "ring-2 ring-blue-500 ring-inset z-10",
        !slot.component && "border-2 border-dashed border-zinc-300 hover:border-blue-400 dark:border-zinc-600",
        className
      )}
    >
      {slot.component ? (
        <div className="flex items-center justify-center h-full p-3 bg-white dark:bg-zinc-950">
          <div className="w-full overflow-hidden">
            <ComponentRenderer
              componentName={slot.component.name}
              category={slot.component.category}
              variants={slot.component.variants}
            />
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-start justify-end p-1">
            <div className="opacity-0 group-hover:opacity-100 flex gap-1">
              <button
                onClick={e => { e.stopPropagation(); onRemove(); }}
                className="rounded bg-white shadow p-1 hover:bg-red-50 dark:bg-zinc-800"
                title="移除组件"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full min-h-[60px]">
          <div className="text-center">
            <Plus className="mx-auto h-4 w-4 text-zinc-400" />
            <span className="text-[11px] text-zinc-400 mt-1 block">{slot.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}
