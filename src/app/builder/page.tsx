"use client";

import * as React from "react";
import { Monitor, Smartphone, Tablet, Plus, X, Download, Copy, Search, GripVertical } from "lucide-react";
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

interface LibraryItem { chinese: string; english: string; category: string; variants: string[]; desc: string; }
interface LibraryCategory { name: string; items: LibraryItem[]; }

interface CanvasItem {
  id: string;
  component: LibraryItem;
  width: number;   // 25-100 %
  height: number;  // px, 0 = auto
  note: string;
}

// ============ Component Library ============
const LIBRARY: LibraryCategory[] = [
  {
    name: "📱 常用组件",
    items: [
      { chinese: "底部导航栏", english: "底部导航栏", category: "app", variants: ["5tabs"], desc: "底部Tab导航" },
      { chinese: "页面标题栏", english: "页面标题", category: "app", variants: ["default"], desc: "标题+返回+操作" },
      { chinese: "搜索栏", english: "搜索栏", category: "app", variants: ["default"], desc: "圆角搜索框" },
      { chinese: "数据卡片", english: "数据卡片", category: "app", variants: ["default"], desc: "金额/数据指标" },
      { chinese: "统计行", english: "统计行", category: "app", variants: ["default"], desc: "一排统计数据" },
      { chinese: "交易记录", english: "交易记录", category: "app", variants: ["default"], desc: "流水列表" },
      { chinese: "列表组", english: "列表组", category: "app", variants: ["default"], desc: "分类统计列表" },
      { chinese: "日历视图", english: "日历视图", category: "app", variants: ["default"], desc: "月历" },
      { chinese: "图表占位", english: "图表占位", category: "app", variants: ["default"], desc: "图表区域" },
      { chinese: "设置列表", english: "设置列表", category: "app", variants: ["default"], desc: "设置项" },
      { chinese: "表单组", english: "表单组", category: "app", variants: ["default"], desc: "输入表单" },
      { chinese: "内容区块", english: "内容区块", category: "app", variants: ["default"], desc: "空白内容区" },
      { chinese: "空白占位", english: "空白占位", category: "app", variants: ["default"], desc: "自由标注" },
    ],
  },
  {
    name: "💬 社交/聊天",
    items: [
      { chinese: "消息气泡", english: "消息气泡", category: "scene", variants: ["sent","received"], desc: "聊天气泡" },
      { chinese: "聊天输入栏", english: "聊天输入栏", category: "scene", variants: ["default"], desc: "底部输入+发送" },
      { chinese: "用户信息卡", english: "用户信息卡", category: "scene", variants: ["default"], desc: "头像+昵称+简介" },
      { chinese: "联系人列表", english: "联系人列表", category: "scene", variants: ["default"], desc: "联系人项" },
    ],
  },
  {
    name: "🛒 电商/购物",
    items: [
      { chinese: "商品卡片", english: "商品卡片", category: "scene", variants: ["default"], desc: "图+名+价" },
      { chinese: "订单摘要", english: "订单摘要", category: "scene", variants: ["default"], desc: "订单信息" },
      { chinese: "价格标签", english: "价格标签", category: "scene", variants: ["default"], desc: "价格展示" },
      { chinese: "评价卡片", english: "评价卡片", category: "scene", variants: ["default"], desc: "用户评价" },
      { chinese: "购物车项", english: "购物车项", category: "scene", variants: ["default"], desc: "购物车列表" },
    ],
  },
  {
    name: "🎵 媒体/健康",
    items: [
      { chinese: "音乐播放条", english: "音乐播放条", category: "scene", variants: ["default"], desc: "播放控制" },
      { chinese: "歌单卡片", english: "歌单卡片", category: "scene", variants: ["default"], desc: "歌单展示" },
      { chinese: "步数卡片", english: "步数卡片", category: "scene", variants: ["default"], desc: "健康数据" },
      { chinese: "签到卡片", english: "签到卡片", category: "scene", variants: ["default"], desc: "签到打卡" },
    ],
  },
  {
    name: "🎯 通用功能",
    items: [
      { chinese: "功能入口", english: "功能入口", category: "scene", variants: ["default"], desc: "宫格导航" },
      { chinese: "标签筛选栏", english: "标签筛选栏", category: "scene", variants: ["default"], desc: "标签过滤" },
      { chinese: "公告横幅", english: "公告横幅", category: "scene", variants: ["default"], desc: "通知横幅" },
      { chinese: "进度环", english: "进度环", category: "scene", variants: ["default"], desc: "环形进度" },
    ],
  },
  {
    name: "🔘 基础元素",
    items: [
      { chinese: "按钮", english: "Button", category: "basic", variants: ["default","secondary","outline","ghost","destructive"], desc: "操作触发" },
      { chinese: "输入框", english: "Input", category: "basic", variants: ["default"], desc: "文本输入" },
      { chinese: "徽章", english: "Badge", category: "basic", variants: ["default","secondary","success","warning"], desc: "状态标记" },
      { chinese: "开关", english: "Switch", category: "basic", variants: ["default"], desc: "切换" },
      { chinese: "卡片", english: "Card", category: "layout", variants: ["default"], desc: "内容容器" },
      { chinese: "提示条", english: "Alert", category: "feedback", variants: ["info","success","warning","error"], desc: "信息提示" },
      { chinese: "分割线", english: "Divider", category: "basic", variants: ["horizontal","withLabel"], desc: "分隔" },
    ],
  },
];

// ============ Builder ============
let idCounter = 0;
function nid() { return `c${++idCounter}`; }

export default function BuilderPage() {
  const [platform, setPlatform] = React.useState<Platform>("mobile");
  const [items, setItems] = React.useState<CanvasItem[]>(() => {
    idCounter = 0;
    return [
      { id: nid(), component: findItem("页面标题栏"), width: 100, height: 0, note: "应用首页标题" },
      { id: nid(), component: findItem("功能入口"), width: 100, height: 0, note: "4个主要功能入口" },
      { id: nid(), component: findItem("公告横幅"), width: 100, height: 0, note: "最新活动通知" },
      { id: nid(), component: findItem("数据卡片"), width: 50, height: 0, note: "今日核心数据" },
      { id: nid(), component: findItem("数据卡片"), width: 50, height: 0, note: "本周趋势数据" },
      { id: nid(), component: findItem("列表组"), width: 100, height: 0, note: "内容分类入口" },
      { id: nid(), component: findItem("底部导航栏"), width: 100, height: 0, note: "主导航: 首页/发现/消息/我的" },
    ];
  });
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [layoutName, setLayoutName] = React.useState("我的应用");

  // Drag-to-reorder state
  const [dragId, setDragId] = React.useState<string | null>(null);
  const [dragOverIdx, setDragOverIdx] = React.useState<number | null>(null);
  const itemsRef = React.useRef(items);
  itemsRef.current = items;

  // Resize state
  const [resizeState, setResizeState] = React.useState<{ id: string; edge: string; sx: number; sy: number; sw: number; sh: number } | null>(null);

  const platformNames: Record<Platform, string> = { desktop: "桌面软件", mobile: "手机应用", tablet: "平板应用" };
  const frameWidths: Record<Platform, number> = { desktop: 960, mobile: 375, tablet: 640 };

  const addItem = (libItem: LibraryItem) => {
    const newItem: CanvasItem = { id: nid(), component: libItem, width: platform === "mobile" ? 100 : 50, height: 0, note: "" };
    if (selectedId) {
      const idx = items.findIndex(i => i.id === selectedId);
      setItems(prev => [...prev.slice(0, idx + 1), newItem, ...prev.slice(idx + 1)]);
    } else {
      setItems(prev => [...prev, newItem]);
    }
    setSelectedId(newItem.id);
    // Ensure we scroll to the new item
    setTimeout(() => document.getElementById(newItem.id)?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const removeItem = (id: string) => { setItems(prev => prev.filter(i => i.id !== id)); if (selectedId === id) setSelectedId(null); };
  const duplicateItem = (id: string) => {
    const idx = items.findIndex(i => i.id === id); if (idx === -1) return;
    setItems(prev => { const n = [...prev]; n.splice(idx + 1, 0, { ...prev[idx], id: nid() }); return n; });
  };
  const updateWidth = (id: string, w: number) => setItems(prev => prev.map(i => i.id === id ? { ...i, width: Math.max(25, Math.min(100, Math.round(w))) } : i));
  const updateHeight = (id: string, h: number) => setItems(prev => prev.map(i => i.id === id ? { ...i, height: Math.max(0, Math.round(h)) } : i));
  const updateNote = (id: string, note: string) => setItems(prev => prev.map(i => i.id === id ? { ...i, note } : i));

  // ---- Resize Handlers ----
  const onResizeStart = React.useCallback((e: React.MouseEvent, id: string, edge: string) => {
    e.preventDefault(); e.stopPropagation();
    const item = itemsRef.current.find(i => i.id === id);
    if (!item) return;
    setResizeState({ id, edge, sx: e.clientX, sy: e.clientY, sw: item.width, sh: Math.max(item.height || 80, 40) });
  }, []);

  React.useEffect(() => {
    if (!resizeState) return;
    const frameW = frameWidths[platform];
    const onMove = (e: MouseEvent) => {
      const { id, edge, sx, sy, sw, sh } = resizeState;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      const wDelta = (dx / frameW) * 100;
      if (edge === "right" || edge === "corner") updateWidth(id, sw + wDelta);
      if (edge === "bottom" || edge === "corner") updateHeight(id, sh + dy);
    };
    const onUp = () => setResizeState(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [resizeState, platform]);

  // ---- Drag to Reorder Handlers ----
  const onDragStart = React.useCallback((e: React.MouseEvent, id: string) => {
    // Don't start drag if clicking resize handles or toolbar buttons
    if ((e.target as HTMLElement).closest("[data-resize-handle]") || (e.target as HTMLElement).closest("[data-toolbar]")) return;
    e.preventDefault();
    setDragId(id);
    setSelectedId(id);
    const idx = itemsRef.current.findIndex(i => i.id === id);
    setDragOverIdx(idx);
  }, []);

  React.useEffect(() => {
    if (!dragId) return;
    const container = document.getElementById("canvas-container");
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const children = Array.from(container.querySelectorAll("[data-item-id]"));
      if (children.length === 0) return;
      // Find which item the mouse is over
      let targetIdx = itemsRef.current.length - 1;
      for (let i = 0; i < children.length; i++) {
        const rect = children[i].getBoundingClientRect();
        if (e.clientY < rect.top + rect.height / 2) {
          targetIdx = i;
          break;
        }
      }
      setDragOverIdx(targetIdx);
    };

    const onUp = () => {
      // Reorder items
      if (dragOverIdx !== null) {
        setItems(prev => {
          const dragIdx = prev.findIndex(i => i.id === dragId);
          if (dragIdx === -1 || dragIdx === dragOverIdx) return prev;
          const n = [...prev];
          const [item] = n.splice(dragIdx, 1);
          const insertAt = dragIdx < dragOverIdx ? dragOverIdx - 1 : dragOverIdx;
          n.splice(Math.max(0, insertAt), 0, item);
          return n;
        });
      }
      setDragId(null);
      setDragOverIdx(null);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [dragId, dragOverIdx]);

  // ---- Export ----
  const buildExport = () => ({
    name: layoutName,
    platform, platformName: platformNames[platform],
    deviceWidth: frameWidths[platform],
    createdAt: new Date().toISOString(),
    components: items.map((item, i) => ({
      order: i + 1,
      component: item.component.chinese,
      englishName: item.component.english,
      category: item.component.category,
      width: `${item.width}%`,
      height: item.height > 0 ? `${item.height}px` : "auto（内容自适应）",
      note: item.note || "(未标注用途)",
      variants: item.component.variants,
    })),
    designTokens: {
      colors: { primary: "#18181b", accent: "#2563eb", success: "#059669", danger: "#dc2626", bg: "#ffffff", bgGray: "#f4f4f5" },
      spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
      radius: { sm: 4, md: 8, lg: 12, xl: 16, full: 9999 },
      fontSize: { xs: 12, sm: 14, base: 16, lg: 18, xl: 20 },
      shadow: { sm: "0 1px 3px rgba(0,0,0,0.06)", md: "0 4px 12px rgba(0,0,0,0.08)" },
    },
    aiInstructions: "每个component是一个UI模块。note说明该区域应放置什么数据或功能。请生成对应的React + Tailwind CSS 前端代码。",
  });

  const filteredLibrary = React.useMemo(() => {
    if (!searchQuery.trim()) return LIBRARY;
    const q = searchQuery.toLowerCase();
    return LIBRARY.map(c => ({ ...c, items: c.items.filter(i => i.chinese.includes(q) || i.english.toLowerCase().includes(q) || i.desc.includes(q)) })).filter(c => c.items.length > 0);
  }, [searchQuery]);

  const selectedItem = items.find(i => i.id === selectedId);

  return (
    <div className="h-screen flex flex-col bg-zinc-100 dark:bg-zinc-950">
      {/* Top bar */}
      <div className="shrink-0 h-12 border-b bg-white dark:border-zinc-800 dark:bg-zinc-950 flex items-center justify-between px-4 gap-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold hidden sm:inline">界面搭建器</span>
          <div className="flex rounded-md bg-zinc-100 p-0.5 dark:bg-zinc-800">
            {(["mobile", "desktop", "tablet"] as Platform[]).map(p => (
              <button key={p} onClick={() => setPlatform(p)}
                className={cn("flex items-center gap-1 rounded px-2.5 py-1 text-xs transition-all",
                  platform === p ? "bg-white shadow-sm text-zinc-900 dark:bg-zinc-700 dark:text-white" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300")}>
                {p === "mobile" ? <Smartphone className="h-3 w-3" /> : p === "desktop" ? <Monitor className="h-3 w-3" /> : <Tablet className="h-3 w-3" />}
                <span className="hidden sm:inline">{platformNames[p]}</span>
              </button>
            ))}
          </div>
          <Input className="h-7 w-28 text-xs hidden sm:block" placeholder="方案名" value={layoutName} onChange={e => setLayoutName(e.target.value)} />
          <span className="text-[11px] text-zinc-400 hidden sm:inline">{items.length}个组件</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm" variant="outline" className="gap-1 h-7 text-xs lg:hidden"
            onClick={() => {
              const lib = document.getElementById("library-panel");
              if (lib) lib.classList.toggle("hidden");
            }}>
            <Plus className="h-3 w-3" />添加
          </Button>
          <Button size="sm" onClick={() => setExportOpen(true)} className="gap-1 h-7 text-xs"><Download className="h-3 w-3" />导出方案</Button>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Left library */}
        <div id="library-panel" className="w-48 shrink-0 border-r bg-white dark:border-zinc-800 dark:bg-zinc-950 hidden lg:flex flex-col">
          <div className="p-2 border-b dark:border-zinc-800">
            <div className="relative"><Search className="absolute left-2 top-2 h-3 w-3 text-zinc-400" /><Input className="pl-7 h-7 text-xs" placeholder="搜索组件..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /></div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-1.5 space-y-0.5">
              {filteredLibrary.map(cat => (
                <div key={cat.name}>
                  <div className="px-2 py-1.5 text-[10px] font-semibold text-zinc-400">{cat.name}</div>
                  {cat.items.map(item => (
                    <button key={item.chinese} onClick={() => addItem(item)}
                      className="w-full text-left px-2 py-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                      <div className="text-[11px] font-medium">{item.chinese}</div>
                      <div className="text-[10px] text-zinc-400 truncate">{item.desc}</div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Center canvas */}
        <div className="flex-1 flex justify-center p-3 overflow-auto" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 19px, #e5e5e5 19px, #e5e5e5 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, #e5e5e5 19px, #e5e5e5 20px)" }}>
          <div style={{ width: frameWidths[platform] }} className="flex flex-col h-fit">
            <div className={cn("bg-white dark:bg-zinc-900 shadow-xl overflow-hidden", platform === "mobile" ? "rounded-2xl border-8 border-zinc-800 dark:border-zinc-700" : "rounded-lg border dark:border-zinc-700")}>
              {platform !== "mobile" && (
                <div className="flex items-center gap-2 h-6 px-3 bg-zinc-100 dark:bg-zinc-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400" /><span className="h-1.5 w-1.5 rounded-full bg-yellow-400" /><span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-[9px] text-zinc-500 flex-1 text-center">{layoutName}</span>
                </div>
              )}
              {platform === "mobile" && (
                <div className="flex justify-between items-center h-7 px-4 bg-white dark:bg-zinc-900 text-[10px] font-medium border-b dark:border-zinc-800"><span>9:41</span><span>📶🔋</span></div>
              )}

              {/* Canvas */}
              <div id="canvas-container" className="min-h-[480px] p-2 flex flex-wrap items-start content-start gap-2">
                {items.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center h-64 text-zinc-300 dark:text-zinc-600">
                    <Plus className="h-8 w-8 mb-2" /><p className="text-xs">从左侧添加组件</p>
                  </div>
                ) : (
                  items.map((item, idx) => (
                    <CanvasItemView
                      key={item.id}
                      item={item}
                      platform={platform}
                      isSelected={selectedId === item.id}
                      isDragging={dragId === item.id}
                      dragOverIdx={dragOverIdx}
                      currentIdx={idx}
                      onSelect={() => setSelectedId(prev => prev === item.id ? null : item.id)}
                      onRemove={() => removeItem(item.id)}
                      onDuplicate={() => duplicateItem(item.id)}
                      onResizeStart={onResizeStart}
                      onDragStart={onDragStart}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-48 shrink-0 border-l bg-white dark:border-zinc-800 dark:bg-zinc-950 hidden lg:flex flex-col">
          <ScrollArea className="flex-1">
            {selectedItem ? (
              <div className="p-3 space-y-3">
                <h3 className="text-xs font-semibold">组件属性</h3>
                <div className="rounded-lg border p-2.5 dark:border-zinc-700">
                  <p className="text-xs font-medium">{selectedItem.component.chinese}</p>
                  <p className="text-[10px] text-zinc-500">{selectedItem.component.desc}</p>
                  <Badge variant="secondary" className="mt-1 text-[9px]">{selectedItem.component.category}</Badge>
                </div>
                {/* Width */}
                <div>
                  <div className="flex justify-between text-[10px] mb-1"><span>宽度</span><span className="font-mono">{selectedItem.width}%</span></div>
                  <input type="range" min={25} max={100} step={5} value={selectedItem.width}
                    onChange={e => updateWidth(selectedItem.id, Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none bg-zinc-200 dark:bg-zinc-700 accent-blue-500" />
                </div>
                {/* Height */}
                <div>
                  <div className="flex justify-between text-[10px] mb-1"><span>高度</span><span className="font-mono">{selectedItem.height > 0 ? `${selectedItem.height}px` : "自动"}</span></div>
                  <div className="flex gap-1">
                    {[0, 100, 180, 280, 400].map(h => (
                      <button key={h} onClick={() => updateHeight(selectedItem.id, h)}
                        className={cn("flex-1 py-1 text-[9px] rounded border dark:border-zinc-700", selectedItem.height === h ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "hover:bg-zinc-50 dark:hover:bg-zinc-800")}>{h === 0 ? "自动" : h}</button>
                    ))}
                  </div>
                </div>
                {/* Note */}
                <div>
                  <p className="text-[10px] font-medium mb-1">备注 (给AI)</p>
                  <textarea className="w-full rounded-lg border px-2 py-1.5 text-[11px] dark:border-zinc-700 dark:bg-zinc-800 resize-none" rows={2}
                    placeholder="例: 这里放用户余额数据"
                    value={selectedItem.note} onChange={e => updateNote(selectedItem.id, e.target.value)} />
                </div>
                <Separator />
                <div className="space-y-0.5">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-[11px] h-7" onClick={() => duplicateItem(selectedItem.id)}>📋 复制组件</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-[11px] h-7 text-red-500" onClick={() => removeItem(selectedItem.id)}>🗑 删除组件</Button>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-[11px] text-zinc-400 mt-8">
                <p>点击组件查看属性</p>
                <p className="mt-1 text-[10px]">按住组件可拖动排序</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Export dialog */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="max-w-lg max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>导出布局方案</DialogTitle>
            <DialogDescription>结构化 JSON → 提供给 AI 生成代码</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {[{ l: "组件数", v: items.length }, { l: "平台", v: platformNames[platform] }, { l: "备注数", v: items.filter(i => i.note).length }].map(s => (
                <div key={s.l} className="rounded-lg border p-2 text-center dark:border-zinc-700"><p className="text-lg font-bold">{s.v}</p><p className="text-[10px] text-zinc-500">{s.l}</p></div>
              ))}
            </div>
            <pre className="rounded-lg bg-zinc-950 p-3 text-[10px] text-zinc-100 max-h-56 overflow-auto dark:bg-zinc-900 leading-relaxed">{JSON.stringify(buildExport(), null, 2)}</pre>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={async () => { await navigator.clipboard.writeText(JSON.stringify(buildExport(), null, 2)); }} className="gap-1 h-8 text-xs"><Copy className="h-3 w-3" />复制</Button>
              <Button size="sm" onClick={() => { const b = new Blob([JSON.stringify(buildExport(), null, 2)], { type: "application/json" }); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = `${layoutName}.json`; a.click(); URL.revokeObjectURL(u); }} className="gap-1 h-8 text-xs"><Download className="h-3 w-3" />下载</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function findItem(chinese: string): LibraryItem {
  for (const cat of LIBRARY) {
    const found = cat.items.find(i => i.chinese === chinese);
    if (found) return found;
  }
  return LIBRARY[0].items[0];
}

// ============ Canvas Item ============
function CanvasItemView({ item, platform, isSelected, isDragging, dragOverIdx, currentIdx, onSelect, onRemove, onDuplicate, onResizeStart, onDragStart }: {
  item: CanvasItem; platform: Platform; isSelected: boolean; isDragging: boolean; dragOverIdx: number | null; currentIdx: number;
  onSelect: () => void; onRemove: () => void; onDuplicate: () => void;
  onResizeStart: (e: React.MouseEvent, id: string, edge: string) => void;
  onDragStart: (e: React.MouseEvent, id: string) => void;
}) {
  const w = platform === "mobile" ? "100%" : `${item.width}%`;
  const h = item.height > 0 ? item.height : undefined;

  return (
    <>
      {/* Drop indicator before this item */}
      {dragOverIdx === currentIdx && (
        <div className="w-full h-1 bg-blue-500 rounded-full animate-pulse" />
      )}

      <div
        id={item.id}
        data-item-id={item.id}
        style={{ width: w, height: h }}
        className={cn(
          "relative rounded-xl border-2 transition-all flex-shrink-0 cursor-grab active:cursor-grabbing select-none",
          isSelected ? "border-blue-500 shadow-md" : "border-transparent hover:border-zinc-200 dark:hover:border-zinc-700",
          isDragging ? "opacity-30 scale-95 border-blue-400 shadow-lg" : "opacity-100",
          "bg-white dark:bg-zinc-900"
        )}
        onMouseDown={e => onDragStart(e, item.id)}
      >
        {/* Toolbar */}
        <div data-toolbar className={cn(
          "absolute -top-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-0.5 transition-opacity bg-white dark:bg-zinc-800 rounded-md shadow-lg border dark:border-zinc-700 px-0.5 py-0.5",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          <TBtn onClick={onDuplicate} title="复制">📋</TBtn>
          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700" />
          <TBtn onClick={onRemove} title="删除" danger><X className="h-3 w-3" /></TBtn>
        </div>

        {/* Content */}
        <div className="p-2 min-h-[50px] flex items-center justify-center overflow-hidden pointer-events-none">
          <ComponentRenderer componentName={item.component.english} category={item.component.category} variants={item.component.variants} />
        </div>

        {/* Note label */}
        {item.note && (
          <div className="absolute top-1 left-2 z-10 bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded-full max-w-[80%] truncate">💬 {item.note}</div>
        )}

        {/* Resize handles */}
        {isSelected && (
          <>
            <div data-resize-handle className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-blue-200/50 z-20 rounded-r-xl"
              onMouseDown={e => { e.stopPropagation(); onResizeStart(e, item.id, "right"); }} />
            <div data-resize-handle className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-blue-200/50 z-20 rounded-b-xl"
              onMouseDown={e => { e.stopPropagation(); onResizeStart(e, item.id, "bottom"); }} />
            <div data-resize-handle className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-20"
              onMouseDown={e => { e.stopPropagation(); onResizeStart(e, item.id, "corner"); }}>
              <svg width="12" height="12" className="absolute bottom-0.5 right-0.5 text-blue-400"><path d="M0 12 L12 0 M6 12 L12 6 M12 12 L12 11" stroke="currentColor" strokeWidth="2" /></svg>
            </div>
          </>
        )}
      </div>

      {/* Drop indicator after last item */}
      {dragOverIdx === currentIdx + 1 && dragOverIdx >= (typeof currentIdx === 'number' ? 1 : 0) && (
        <div className="w-full h-1 bg-blue-500 rounded-full animate-pulse" />
      )}
    </>
  );
}

function TBtn({ children, onClick, title, danger }: { children: React.ReactNode; onClick: () => void; title: string; danger?: boolean }) {
  return <button onClick={e => { e.stopPropagation(); onClick(); }} title={title}
    className={cn("p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs", danger && "hover:bg-red-50 hover:text-red-500")}>{children}</button>;
}
