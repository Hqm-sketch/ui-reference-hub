"use client";

import * as React from "react";
import {
  Monitor, Smartphone, Tablet, Plus, X, Download, Copy, Check, Search,
  Trash2, ChevronUp, ChevronDown, GripHorizontal, Minus, Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ComponentRenderer } from "@/components/component-renderer";
import { cn } from "@/lib/utils";

// ============ Types ============

type Platform = "desktop" | "mobile" | "tablet";
type Width = "full" | "1/2" | "1/3" | "2/3" | "1/4";

interface CanvasItem {
  id: string;
  component: { english: string; chinese: string; category: string; variants: string[] };
  width: Width;
}

// ============ Component Library (Chinese names) ============

interface LibraryItem {
  chinese: string;
  english: string;
  category: string;
  variants: string[];
  desc: string;
}

interface LibraryCategory {
  name: string;
  icon: string;
  items: LibraryItem[];
}

const LIBRARY: LibraryCategory[] = [
  {
    name: "基础组件", icon: "□",
    items: [
      { chinese: "按钮", english: "Button", category: "basic", variants: ["default","secondary","outline","ghost","destructive"], desc: "操作触发按钮，支持多种变体" },
      { chinese: "输入框", english: "Input", category: "basic", variants: ["default","disabled","error"], desc: "文本输入" },
      { chinese: "徽章", english: "Badge", category: "basic", variants: ["default","secondary","success","warning","destructive"], desc: "状态标记" },
      { chinese: "开关", english: "Switch", category: "basic", variants: ["default"], desc: "二元状态切换" },
      { chinese: "头像", english: "Avatar", category: "basic", variants: ["image","fallback","withStatus"], desc: "用户头像" },
      { chinese: "加载旋转", english: "Spinner", category: "basic", variants: ["sm","md","lg"], desc: "加载状态指示" },
      { chinese: "搜索框", english: "SearchInput", category: "basic", variants: ["default"], desc: "搜索输入" },
      { chinese: "密码框", english: "PasswordInput", category: "basic", variants: ["default"], desc: "密码输入" },
      { chinese: "文本域", english: "Textarea", category: "basic", variants: ["default"], desc: "多行文本" },
      { chinese: "分割线", english: "Divider", category: "basic", variants: ["horizontal"], desc: "内容分隔" },
      { chinese: "复选框", english: "Checkbox", category: "basic", variants: ["default"], desc: "多选" },
      { chinese: "单选框", english: "RadioGroup", category: "basic", variants: ["default"], desc: "单选" },
      { chinese: "下拉选择", english: "Select", category: "basic", variants: ["default"], desc: "下拉菜单选择" },
      { chinese: "骨架屏", english: "Skeleton", category: "basic", variants: ["text","card"], desc: "加载占位" },
      { chinese: "提示框", english: "Tooltip", category: "basic", variants: ["top"], desc: "悬浮提示" },
    ],
  },
  {
    name: "导航组件", icon: "☰",
    items: [
      { chinese: "面包屑", english: "Breadcrumb", category: "navigation", variants: ["default"], desc: "页面路径" },
      { chinese: "下拉菜单", english: "DropdownMenu", category: "navigation", variants: ["default"], desc: "操作菜单" },
      { chinese: "步骤条", english: "Stepper", category: "navigation", variants: ["horizontal"], desc: "流程步骤" },
      { chinese: "分页器", english: "Pagination", category: "navigation", variants: ["default"], desc: "数据分页" },
      { chinese: "分段控件", english: "Tabs", category: "layout", variants: ["line","pills"], desc: "内容切换标签" },
    ],
  },
  {
    name: "数据展示", icon: "▦",
    items: [
      { chinese: "统计卡片", english: "StatCard", category: "data-display", variants: ["default","withTrend"], desc: "数据指标展示" },
      { chinese: "进度条", english: "Progress", category: "data-display", variants: ["linear","withLabel"], desc: "进度展示" },
      { chinese: "时间轴", english: "Timeline", category: "data-display", variants: ["vertical"], desc: "事件时间线" },
      { chinese: "评分板", english: "ScoreBoard", category: "data-display", variants: ["default"], desc: "评分展示" },
      { chinese: "轮播", english: "Carousel", category: "data-display", variants: ["default"], desc: "内容轮播" },
      { chinese: "日历", english: "DatePicker", category: "form", variants: ["single","range"], desc: "日期选择" },
      { chinese: "标签页", english: "Tabs", category: "layout", variants: ["line","pills"], desc: "选项卡" },
      { chinese: "手风琴", english: "Accordion", category: "layout", variants: ["single"], desc: "折叠面板" },
    ],
  },
  {
    name: "容器布局", icon: "▣",
    items: [
      { chinese: "卡片", english: "Card", category: "layout", variants: ["default","hover"], desc: "内容容器" },
      { chinese: "空状态", english: "EmptyState", category: "layout", variants: ["default","withAction"], desc: "无数据占位" },
      { chinese: "错误状态", english: "ErrorState", category: "layout", variants: ["default"], desc: "错误占位" },
      { chinese: "分割线", english: "Divider", category: "basic", variants: ["horizontal","withLabel"], desc: "分区隔断" },
      { chinese: "滚动区", english: "ScrollArea", category: "basic", variants: ["vertical"], desc: "自定义滚动" },
    ],
  },
  {
    name: "表单组件", icon: "☑",
    items: [
      { chinese: "星级评分", english: "StarRating", category: "form", variants: ["default"], desc: "评分" },
      { chinese: "开关组", english: "SwitchGroup", category: "form", variants: ["default"], desc: "多个开关" },
      { chinese: "标签输入", english: "TagInput", category: "form", variants: ["default"], desc: "标签管理" },
      { chinese: "滑块", english: "Slider", category: "form", variants: ["default"], desc: "数值滑动" },
      { chinese: "验证码", english: "OtpInput", category: "form", variants: ["numeric"], desc: "OTP输入" },
      { chinese: "颜色选择", english: "ColorPicker", category: "form", variants: ["default"], desc: "颜色选择" },
    ],
  },
  {
    name: "反馈通知", icon: "⚠",
    items: [
      { chinese: "提示条", english: "Alert", category: "feedback", variants: ["info","success","warning","error"], desc: "信息提示" },
      { chinese: "对话框", english: "Dialog", category: "feedback", variants: ["default","confirm"], desc: "模态弹窗" },
      { chinese: "消息通知", english: "Toast", category: "feedback", variants: ["success","error"], desc: "短暂通知" },
      { chinese: "结果页", english: "Result", category: "feedback", variants: ["success","error"], desc: "操作结果" },
      { chinese: "确认弹窗", english: "ConfirmDialog", category: "feedback", variants: ["delete"], desc: "确认操作" },
      { chinese: "横幅通知", english: "Banner", category: "feedback", variants: ["default"], desc: "顶部横幅" },
    ],
  },
  {
    name: "移动端专用", icon: "📱",
    items: [
      { chinese: "底部弹出面板", english: "BottomSheet", category: "mobile", variants: ["default"], desc: "底部弹出" },
      { chinese: "操作菜单", english: "ActionSheet", category: "mobile", variants: ["default"], desc: "iOS操作菜单" },
      { chinese: "悬浮按钮", english: "FloatingActionButton", category: "mobile", variants: ["default","extended"], desc: "浮动操作" },
      { chinese: "底部导航", english: "BottomNavigation", category: "mobile", variants: ["default","withBadge"], desc: "移动导航" },
      { chinese: "移动搜索", english: "MobileSearch", category: "mobile", variants: ["default"], desc: "全屏搜索" },
    ],
  },
];

// ============ Main Page ============

let itemCounter = 0;
function nextId() { return `item-${++itemCounter}`; }

export default function BuilderPage() {
  const [platform, setPlatform] = React.useState<Platform>("desktop");
  const [items, setItems] = React.useState<CanvasItem[]>(() => {
    itemCounter = 0;
    return [
      { id: nextId(), component: LIBRARY[0].items[0], width: "1/3" }, // 按钮
      { id: nextId(), component: LIBRARY[0].items[2], width: "1/3" }, // 徽章
      { id: nextId(), component: LIBRARY[0].items[3], width: "1/3" }, // 开关
      { id: nextId(), component: LIBRARY[2].items[0], width: "1/4" }, // 统计卡片
      { id: nextId(), component: LIBRARY[2].items[0], width: "1/4" },
      { id: nextId(), component: LIBRARY[2].items[0], width: "1/4" },
      { id: nextId(), component: LIBRARY[2].items[0], width: "1/4" },
    ];
  });
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [layoutName, setLayoutName] = React.useState("我的界面");

  const platformNames: Record<Platform, string> = { desktop: "桌面软件", mobile: "手机应用", tablet: "平板应用" };

  const addItem = (libItem: LibraryItem) => {
    const newItem: CanvasItem = {
      id: nextId(),
      component: libItem,
      width: platform === "mobile" ? "full" : "full",
    };
    if (selectedId) {
      // Insert after selected
      const idx = items.findIndex(i => i.id === selectedId);
      setItems(prev => [...prev.slice(0, idx + 1), newItem, ...prev.slice(idx + 1)]);
    } else {
      setItems(prev => [...prev, newItem]);
    }
    setPickerOpen(false);
    setSelectedId(newItem.id);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const moveItem = (id: string, direction: "up" | "down") => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === id);
      if (idx === -1) return prev;
      if (direction === "up" && idx === 0) return prev;
      if (direction === "down" && idx === prev.length - 1) return prev;
      const newItems = [...prev];
      const targetIdx = direction === "up" ? idx - 1 : idx + 1;
      [newItems[idx], newItems[targetIdx]] = [newItems[targetIdx], newItems[idx]];
      return newItems;
    });
  };

  const setItemWidth = (id: string, width: Width) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, width } : i));
  };

  const duplicateItem = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    const newItem = { ...item, id: nextId() };
    const idx = items.findIndex(i => i.id === id);
    setItems(prev => [...prev.slice(0, idx + 1), newItem, ...prev.slice(idx + 1)]);
  };

  const buildExport = () => ({
    name: layoutName,
    platform,
    platformName: platformNames[platform],
    createdAt: new Date().toISOString(),
    componentCount: items.length,
    layout: items.map((item, index) => ({
      order: index + 1,
      component: item.component.chinese,
      english: item.component.english,
      category: item.component.category,
      width: item.width,
      variants: item.component.variants,
    })),
    designTokens: {
      colors: { primary: "#18181b", accent: "#2563eb", success: "#059669", danger: "#dc2626", background: "#ffffff" },
      spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px" },
      borderRadius: { sm: "4px", md: "8px", lg: "12px", full: "9999px" },
      fontSize: { xs: "12px", sm: "14px", base: "16px", lg: "18px", xl: "20px" },
      animation: { fast: "150ms", normal: "300ms" },
    },
    responsiveBreakpoints: { mobile: 375, tablet: 768, desktop: 1280 },
    exportNote: "此JSON可直接提供给AI，用于生成对应的前端代码。layout数组中的order表示组件从上到下的排列顺序，width表示组件占据的宽度比例。",
  });

  const filteredLibrary = React.useMemo(() => {
    if (!searchQuery.trim()) return LIBRARY;
    const q = searchQuery.toLowerCase();
    return LIBRARY.map(cat => ({
      ...cat,
      items: cat.items.filter(i => i.chinese.toLowerCase().includes(q) || i.english.toLowerCase().includes(q)),
    })).filter(cat => cat.items.length > 0);
  }, [searchQuery]);

  const frameStyles: Record<Platform, string> = {
    desktop: "w-full max-w-4xl",
    mobile: "w-[375px]",
    tablet: "w-[640px]",
  };

  const widthOptions: { label: string; value: Width; className: string }[] = [
    { label: "满宽", value: "full", className: "w-full" },
    { label: "1/2", value: "1/2", className: "w-1/2" },
    { label: "1/3", value: "1/3", className: "w-1/3" },
    { label: "2/3", value: "2/3", className: "w-2/3" },
    { label: "1/4", value: "1/4", className: "w-1/4" },
  ];

  return (
    <div className="h-[calc(100vh-0px)] flex flex-col">
      {/* ===== TOP BAR ===== */}
      <div className="shrink-0 border-b bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="flex items-center justify-between px-4 h-12">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">界面搭建器</span>
            <div className="flex rounded-md bg-zinc-100 p-0.5 dark:bg-zinc-800">
              {(["desktop", "tablet", "mobile"] as Platform[]).map(p => (
                <button key={p} onClick={() => setPlatform(p)}
                  className={cn("flex items-center gap-1 rounded px-2.5 py-1 text-xs transition-all",
                    platform === p ? "bg-white shadow-sm text-zinc-900 dark:bg-zinc-700 dark:text-zinc-50" : "text-zinc-500 hover:text-zinc-700")}>
                  {p === "desktop" ? <Monitor className="h-3 w-3" /> : p === "mobile" ? <Smartphone className="h-3 w-3" /> : <Tablet className="h-3 w-3" />}
                  {platformNames[p]}
                </button>
              ))}
            </div>
            <Separator orientation="vertical" className="h-5" />
            <Input className="h-7 w-32 text-xs" placeholder="方案名称..." value={layoutName} onChange={e => setLayoutName(e.target.value)} />
            <span className="text-xs text-zinc-400">{items.length} 个组件</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => setPickerOpen(true)} className="gap-1 h-7 text-xs">
              <Plus className="h-3 w-3" />添加组件
            </Button>
            <Button size="sm" onClick={() => setExportOpen(true)} className="gap-1 h-7 text-xs">
              <Download className="h-3 w-3" />导出方案
            </Button>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex min-h-0">
        {/* LEFT: Component Library */}
        <div className="w-56 shrink-0 border-r bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30 hidden lg:block">
          <div className="p-2 border-b dark:border-zinc-800">
            <div className="relative">
              <Search className="absolute left-2 top-2 h-3 w-3 text-zinc-400" />
              <Input className="pl-7 h-7 text-xs" placeholder="搜索组件..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-6rem)]">
            <div className="p-1.5 space-y-0.5">
              {filteredLibrary.map(cat => (
                <div key={cat.name}>
                  <div className="px-2 py-1.5 text-[10px] font-semibold uppercase text-zinc-400">{cat.name}</div>
                  {cat.items.map(item => (
                    <button key={item.english} onClick={() => addItem(item)}
                      className="w-full text-left px-2 py-1.5 rounded-md transition-colors hover:bg-zinc-200/60 dark:hover:bg-zinc-800 group">
                      <div className="text-xs">{item.chinese}</div>
                      <div className="text-[10px] text-zinc-400">{item.english} · {item.desc}</div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* CENTER: Canvas */}
        <div className="flex-1 flex flex-col items-center p-4 bg-zinc-100/50 dark:bg-zinc-900/50 overflow-auto">
          <div className={cn("flex flex-col gap-3", frameStyles[platform])}>
            {/* Browser chrome for desktop/tablet */}
            {(platform === "desktop" || platform === "tablet") && (
              <div className="flex items-center gap-2 h-7 px-3 rounded-t-lg bg-zinc-200/70 dark:bg-zinc-800/70">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                <span className="h-2 w-2 rounded-full bg-green-400" />
                <span className="ml-2 text-[10px] text-zinc-500 flex-1 text-center">{layoutName}</span>
              </div>
            )}

            {/* Items */}
            <div className={cn(
              "bg-white dark:bg-zinc-950 rounded-lg min-h-[400px] p-4",
              platform === "mobile" && "rounded-2xl",
              (platform === "desktop" || platform === "tablet") && "rounded-b-lg shadow-sm border dark:border-zinc-700"
            )}>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-zinc-300 dark:text-zinc-600">
                  <Plus className="h-10 w-10 mb-3" />
                  <p className="text-sm">从左侧组件库选择组件</p>
                  <p className="text-xs mt-1">或点击右上角"添加组件"</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {items.map((item) => (
                    <CanvasItemCard
                      key={item.id}
                      item={item}
                      isSelected={selectedId === item.id}
                      onSelect={() => setSelectedId(item.id === selectedId ? null : item.id)}
                      onRemove={() => removeItem(item.id)}
                      onMoveUp={() => moveItem(item.id, "up")}
                      onMoveDown={() => moveItem(item.id, "down")}
                      onDuplicate={() => duplicateItem(item.id)}
                      onWidthChange={(w) => setItemWidth(item.id, w)}
                      widthOptions={widthOptions}
                      platform={platform}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Properties panel */}
        <div className="w-56 shrink-0 border-l bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30 hidden lg:block">
          <ScrollArea className="h-[calc(100vh-3rem)]">
            {selectedId ? (
              <div className="p-3">
                <h3 className="text-sm font-semibold mb-3">组件属性</h3>
                {(() => {
                  const item = items.find(i => i.id === selectedId);
                  if (!item) return null;
                  return (
                    <div className="space-y-4">
                      <div className="rounded-lg border p-3 dark:border-zinc-700">
                        <p className="text-sm font-medium">{item.component.chinese}</p>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{item.component.english}</p>
                        <Badge variant="secondary" className="mt-2 text-[10px]">{item.component.category}</Badge>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-2">宽度</p>
                        <div className="space-y-0.5">
                          {widthOptions.map(w => (
                            <button key={w.value} onClick={() => onWidthChange(w.value)}
                              className={cn("w-full text-left px-2 py-1 rounded text-xs",
                                item.width === w.value ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "hover:bg-zinc-100 dark:hover:bg-zinc-800")}>
                              {w.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-2">变体</p>
                        <div className="flex flex-wrap gap-1">
                          {item.component.variants.map(v => <Badge key={v} variant="outline" className="text-[10px]">{v}</Badge>)}
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-1">
                        <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7" onClick={() => onDuplicate()}>📋 复制组件</Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7" onClick={() => onMoveUp()}>⬆ 上移</Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7" onClick={() => onMoveDown()}>⬇ 下移</Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7 text-red-500" onClick={() => onRemove()}>🗑 删除</Button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-zinc-400 mt-8">
                <p>点击画布中的组件</p>
                <p className="mt-1">查看和编辑属性</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* ===== EXPORT DIALOG ===== */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="max-w-xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>导出布局方案</DialogTitle>
            <DialogDescription>结构化 JSON，可直接提供给 AI 生成代码</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg border p-2 text-center dark:border-zinc-700">
                <p className="text-lg font-bold">{items.length}</p>
                <p className="text-[10px] text-zinc-500">组件数</p>
              </div>
              <div className="rounded-lg border p-2 text-center dark:border-zinc-700">
                <p className="text-lg font-bold">{platformNames[platform]}</p>
                <p className="text-[10px] text-zinc-500">平台</p>
              </div>
              <div className="rounded-lg border p-2 text-center dark:border-zinc-700">
                <p className="text-lg font-bold">{new Set(items.map(i => i.component.category)).size}</p>
                <p className="text-[10px] text-zinc-500">分类数</p>
              </div>
            </div>
            <pre className="rounded-lg bg-zinc-950 p-3 text-xs text-zinc-100 max-h-64 overflow-auto dark:bg-zinc-900">
              {JSON.stringify(buildExport(), null, 2)}
            </pre>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={async () => { await navigator.clipboard.writeText(JSON.stringify(buildExport(), null, 2)); }} className="gap-1 h-8 text-xs">
                <Copy className="h-3 w-3" />复制
              </Button>
              <Button size="sm" onClick={() => { const b = new Blob([JSON.stringify(buildExport(), null, 2)], { type: "application/json" }); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = `${layoutName}.json`; a.click(); URL.revokeObjectURL(u); }} className="gap-1 h-8 text-xs">
                <Download className="h-3 w-3" />下载
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ============ Canvas Item Card ============

function CanvasItemCard({
  item, isSelected, onSelect, onRemove, onMoveUp, onMoveDown, onDuplicate, onWidthChange, widthOptions, platform,
}: {
  item: CanvasItem;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onWidthChange: (w: Width) => void;
  widthOptions: { label: string; value: Width; className: string }[];
  platform: Platform;
}) {
  const widthClass = widthOptions.find(w => w.value === item.width)?.className || "w-full";

  return (
    <div className={cn(
      "group relative rounded-xl transition-all",
      platform === "mobile" ? "w-full" : cn(widthClass, "flex-shrink-0"),
      isSelected ? "ring-2 ring-blue-500" : "border-2 border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
    )}>
      {/* Hover toolbar */}
      <div className={cn(
        "absolute -top-3 right-2 z-20 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
        isSelected && "opacity-100"
      )}>
        <div className="flex rounded-md bg-white shadow-lg border dark:bg-zinc-800 dark:border-zinc-700 overflow-hidden">
          <ToolBtn onClick={onMoveUp} title="上移"><ChevronUp className="h-3 w-3" /></ToolBtn>
          <ToolBtn onClick={onMoveDown} title="下移"><ChevronDown className="h-3 w-3" /></ToolBtn>
          <div className="w-px bg-zinc-200 dark:bg-zinc-700" />
          <ToolBtn onClick={onDuplicate} title="复制">📋</ToolBtn>
          <div className="w-px bg-zinc-200 dark:bg-zinc-700" />
          {widthOptions.map(w => (
            <ToolBtn key={w.value} onClick={() => onWidthChange(w.value)} title={w.label} active={item.width === w.value}>
              <span className="text-[10px]">{w.label === "满宽" ? "▣" : w.label}</span>
            </ToolBtn>
          ))}
          <div className="w-px bg-zinc-200 dark:bg-zinc-700" />
          <ToolBtn onClick={onRemove} title="删除" danger><X className="h-3 w-3" /></ToolBtn>
        </div>
      </div>

      {/* Component content */}
      <div onClick={onSelect} className="cursor-pointer rounded-xl border bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900 min-h-[60px]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-zinc-400">{item.component.chinese}</span>
        </div>
        <ComponentRenderer componentName={item.component.english} category={item.component.category} variants={item.component.variants} />
      </div>
    </div>
  );
}

function ToolBtn({ children, onClick, title, active, danger }: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  active?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        "px-1.5 py-1 text-xs transition-colors",
        active && "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
        danger && "hover:bg-red-50 hover:text-red-500",
        !active && !danger && "hover:bg-zinc-100 dark:hover:bg-zinc-700"
      )}
    >
      {children}
    </button>
  );
}
