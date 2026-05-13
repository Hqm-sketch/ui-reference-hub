"use client";

import * as React from "react";
import { Monitor, Smartphone, Tablet, Plus, X, Download, Copy, Search, ChevronUp, ChevronDown, Trash2, FileText } from "lucide-react";
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

interface LibraryItem {
  chinese: string; english: string; category: string; variants: string[]; desc: string;
}

interface LibraryCategory {
  name: string;
  items: LibraryItem[];
}

interface CanvasItem {
  id: string;
  component: LibraryItem;
  width: number;   // percentage 25-100
  height: number;  // px, 0 = auto
  note: string;    // user's label for AI
}

// ============ Component Library (Chinese, app-focused) ============
const LIBRARY: LibraryCategory[] = [
  {
    name: "📱 应用级组件",
    items: [
      { chinese: "底部导航栏", english: "底部导航栏", category: "app", variants: ["5tabs"], desc: "底部Tab切换，适合主导航" },
      { chinese: "页面标题栏", english: "页面标题", category: "app", variants: ["default"], desc: "顶部返回+标题+操作按钮" },
      { chinese: "搜索栏", english: "搜索栏", category: "app", variants: ["default"], desc: "圆角搜索输入框" },
      { chinese: "数据卡片", english: "数据卡片", category: "app", variants: ["default"], desc: "展示金额/数据指标" },
      { chinese: "统计行", english: "统计行", category: "app", variants: ["default"], desc: "一排3个统计数据" },
      { chinese: "交易记录", english: "交易记录", category: "app", variants: ["default"], desc: "收入/支出流水列表" },
      { chinese: "列表组", english: "列表组", category: "app", variants: ["default"], desc: "分类统计列表" },
      { chinese: "日历视图", english: "日历视图", category: "app", variants: ["default"], desc: "月历视图，可标记日期" },
      { chinese: "图表占位", english: "图表占位", category: "app", variants: ["default"], desc: "柱状图占位，AI会替换为真实图表" },
      { chinese: "设置列表", english: "设置列表", category: "app", variants: ["default"], desc: "设置项列表，带图标和箭头" },
      { chinese: "表单组", english: "表单组", category: "app", variants: ["default"], desc: "带标签的输入表单" },
      { chinese: "内容区块", english: "内容区块", category: "app", variants: ["default"], desc: "空白内容占位区" },
      { chinese: "空白占位", english: "空白占位", category: "app", variants: ["default"], desc: "完全空白，自由标注用途" },
    ],
  },
  {
    name: "🔘 基础组件",
    items: [
      { chinese: "按钮", english: "Button", category: "basic", variants: ["default","secondary","outline","ghost","destructive"], desc: "操作触发" },
      { chinese: "输入框", english: "Input", category: "basic", variants: ["default","disabled","error"], desc: "文本输入" },
      { chinese: "徽章", english: "Badge", category: "basic", variants: ["default","secondary","success","warning","destructive"], desc: "状态标记" },
      { chinese: "开关", english: "Switch", category: "basic", variants: ["default"], desc: "切换开关" },
      { chinese: "头像", english: "Avatar", category: "basic", variants: ["image","fallback","withStatus"], desc: "用户头像" },
      { chinese: "加载", english: "Spinner", category: "basic", variants: ["sm","md","lg"], desc: "加载指示器" },
      { chinese: "下拉选择", english: "Select", category: "basic", variants: ["default"], desc: "下拉菜单" },
      { chinese: "复选框", english: "Checkbox", category: "basic", variants: ["default"], desc: "多选" },
      { chinese: "单选框", english: "RadioGroup", category: "basic", variants: ["default"], desc: "单选组" },
    ],
  },
  {
    name: "📐 布局与反馈",
    items: [
      { chinese: "卡片", english: "Card", category: "layout", variants: ["default","hover"], desc: "内容容器" },
      { chinese: "提示条", english: "Alert", category: "feedback", variants: ["info","success","warning","error"], desc: "信息提示" },
      { chinese: "进度条", english: "Progress", category: "data-display", variants: ["linear","withLabel"], desc: "进度展示" },
      { chinese: "分割线", english: "Divider", category: "basic", variants: ["horizontal","withLabel"], desc: "内容分隔" },
      { chinese: "标签页", english: "Tabs", category: "layout", variants: ["line","pills"], desc: "选项卡切换" },
      { chinese: "空状态", english: "EmptyState", category: "layout", variants: ["default","withAction"], desc: "无数据占位" },
      { chinese: "评分板", english: "ScoreBoard", category: "data-display", variants: ["default"], desc: "评分展示" },
      { chinese: "时间轴", english: "Timeline", category: "data-display", variants: ["vertical"], desc: "事件时间线" },
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
      { id: nid(), component: LIBRARY[0].items[1], width: 100, height: 0, note: "" },  // 页面标题
      { id: nid(), component: LIBRARY[0].items[4], width: 100, height: 0, note: "显示本月收支概况" },
      { id: nid(), component: LIBRARY[0].items[5], width: 100, height: 0, note: "最近交易记录列表" },
      { id: nid(), component: LIBRARY[0].items[0], width: 100, height: 0, note: "底部导航：首页/账单/记账/提醒/我的" },
    ];
  });
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [layoutName, setLayoutName] = React.useState("记账App首页");

  // Resize state
  const [resizing, setResizing] = React.useState<{ id: string; edge: "right" | "bottom" | "corner"; startX: number; startY: number; startW: number; startH: number } | null>(null);

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
  };

  const removeItem = (id: string) => { setItems(prev => prev.filter(i => i.id !== id)); if (selectedId === id) setSelectedId(null); };
  const moveItem = (id: string, d: "up" | "down") => {
    setItems(prev => { const idx = prev.findIndex(i => i.id === id); if (idx === -1) return prev; if (d === "up" && idx === 0) return prev; if (d === "down" && idx === prev.length - 1) return prev; const n = [...prev]; [n[idx], n[d === "up" ? idx - 1 : idx + 1]] = [n[d === "up" ? idx - 1 : idx + 1], n[idx]]; return n; });
  };
  const duplicateItem = (id: string) => {
    const item = items.find(i => i.id === id); if (!item) return;
    const idx = items.findIndex(i => i.id === id);
    setItems(prev => [...prev.slice(0, idx + 1), { ...item, id: nid() }, ...prev.slice(idx + 1)]);
  };
  const updateWidth = (id: string, w: number) => setItems(prev => prev.map(i => i.id === id ? { ...i, width: Math.max(25, Math.min(100, w)) } : i));
  const updateHeight = (id: string, h: number) => setItems(prev => prev.map(i => i.id === id ? { ...i, height: Math.max(0, h) } : i));
  const updateNote = (id: string, note: string) => setItems(prev => prev.map(i => i.id === id ? { ...i, note } : i));

  // Resize handlers
  const onResizeStart = (e: React.MouseEvent, id: string, edge: "right" | "bottom" | "corner") => {
    e.preventDefault(); e.stopPropagation();
    const item = items.find(i => i.id === id);
    if (!item) return;
    setResizing({ id, edge, startX: e.clientX, startY: e.clientY, startW: item.width, startH: item.height || 120 });
  };
  React.useEffect(() => {
    if (!resizing) return;
    const onMove = (e: MouseEvent) => {
      setResizing(prev => {
        if (!prev) return null;
        const dx = e.clientX - prev.startX;
        const dy = e.clientY - prev.startY;
        const frameW = frameWidths[platform];
        const wDelta = Math.round((dx / frameW) * 100);
        if (prev.edge === "right" || prev.edge === "corner") updateWidth(prev.id, prev.startW + wDelta);
        if (prev.edge === "bottom" || prev.edge === "corner") updateHeight(prev.id, prev.startH + dy);
        return prev;
      });
    };
    const onUp = () => setResizing(null);
    window.addEventListener("mousemove", onMove); window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [resizing, platform]);

  // Export
  const buildExport = () => ({
    name: layoutName,
    platform,
    platformName: platformNames[platform],
    deviceWidth: frameWidths[platform],
    createdAt: new Date().toISOString(),
    components: items.map((item, i) => ({
      order: i + 1,
      component: item.component.chinese,
      englishName: item.component.english,
      category: item.component.category,
      width: `${item.width}%`,
      height: item.height > 0 ? `${item.height}px` : "auto（内容自适应）",
      note: item.note || "(未标注)",
      variants: item.component.variants,
    })),
    layoutHint: "组件按order从上到下排列。mobile下所有组件100%宽，desktop/tablet下按width百分比排列。height为0表示高度自适应内容。",
    designTokens: {
      colors: { primary: "#18181b", accent: "#2563eb", success: "#059669", danger: "#dc2626", bg: "#ffffff", bgSecondary: "#f4f4f5" },
      spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px" },
      radius: { sm: "4px", md: "8px", lg: "12px", xl: "16px", full: "9999px" },
      fontSize: { xs: "12px", sm: "14px", base: "16px", lg: "18px", xl: "20px", "2xl": "24px" },
      shadow: { sm: "0 1px 3px rgba(0,0,0,0.06)", md: "0 4px 12px rgba(0,0,0,0.08)" },
    },
    aiInstructions: "请根据此JSON生成完整的前端代码。每个component.englishName对应一个UI组件，note字段说明了该区域应该放置什么数据或功能。width和height控制组件尺寸。请使用React + Tailwind CSS实现。",
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
      <div className="shrink-0 h-12 border-b bg-white dark:border-zinc-800 dark:bg-zinc-950 flex items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">界面搭建器</span>
          <div className="flex rounded-md bg-zinc-100 p-0.5 dark:bg-zinc-800">
            {(["mobile", "desktop", "tablet"] as Platform[]).map(p => (
              <button key={p} onClick={() => setPlatform(p)} className={cn("flex items-center gap-1 rounded px-2.5 py-1 text-xs transition-all", platform === p ? "bg-white shadow-sm text-zinc-900 dark:bg-zinc-700 dark:text-white" : "text-zinc-500")}>
                {p === "mobile" ? <Smartphone className="h-3 w-3" /> : p === "desktop" ? <Monitor className="h-3 w-3" /> : <Tablet className="h-3 w-3" />}
                {platformNames[p]}
              </button>
            ))}
          </div>
          <Input className="h-7 w-36 text-xs" placeholder="方案名..." value={layoutName} onChange={e => setLayoutName(e.target.value)} />
          <span className="text-xs text-zinc-400">{items.length} 组件</span>
        </div>
        <Button size="sm" onClick={() => setExportOpen(true)} className="gap-1 h-7 text-xs"><Download className="h-3 w-3" />导出方案</Button>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Left library */}
        <div className="w-52 shrink-0 border-r bg-white dark:border-zinc-800 dark:bg-zinc-950 hidden lg:flex flex-col">
          <div className="p-2 border-b dark:border-zinc-800">
            <div className="relative"><Search className="absolute left-2 top-2 h-3 w-3 text-zinc-400" /><Input className="pl-7 h-7 text-xs" placeholder="搜索..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /></div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-1.5 space-y-0.5">
              {filteredLibrary.map(cat => (
                <div key={cat.name}>
                  <div className="px-2 py-1.5 text-[10px] font-semibold text-zinc-400">{cat.name}</div>
                  {cat.items.map(item => (
                    <button key={item.chinese} onClick={() => addItem(item)}
                      className="w-full text-left px-2 py-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                      <div className="text-xs font-medium">{item.chinese}</div>
                      <div className="text-[10px] text-zinc-400 truncate">{item.desc}</div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Center canvas */}
        <div className="flex-1 flex justify-center p-4 overflow-auto">
          <div style={{ width: frameWidths[platform] }} className="flex flex-col">
            {/* Device frame */}
            <div className={cn("bg-white dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden", platform === "mobile" && "rounded-2xl")}>
              {/* Browser chrome */}
              {platform !== "mobile" && (
                <div className="flex items-center gap-2 h-7 px-3 bg-zinc-100 dark:bg-zinc-800">
                  <span className="h-2 w-2 rounded-full bg-red-400" /><span className="h-2 w-2 rounded-full bg-yellow-400" /><span className="h-2 w-2 rounded-full bg-green-400" />
                  <span className="ml-2 text-[10px] text-zinc-500 flex-1 text-center">{layoutName}</span>
                </div>
              )}
              {/* Mobile status bar */}
              {platform === "mobile" && (
                <div className="flex justify-between items-center h-8 px-4 bg-white dark:bg-zinc-900 text-[10px] font-medium border-b dark:border-zinc-800">
                  <span>9:41</span>
                  <span>📶 🔋</span>
                </div>
              )}

              {/* Canvas area */}
              <div className="min-h-[500px] p-3 flex flex-wrap items-start content-start gap-3">
                {items.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center h-64 text-zinc-300 dark:text-zinc-600">
                    <Plus className="h-10 w-10 mb-2" /><p className="text-sm">从左侧添加组件</p>
                  </div>
                ) : (
                  items.map(item => (
                    <CanvasItemView
                      key={item.id}
                      item={item}
                      platform={platform}
                      isSelected={selectedId === item.id}
                      onSelect={() => setSelectedId(item.id === selectedId ? null : item.id)}
                      onRemove={() => removeItem(item.id)}
                      onMoveUp={() => moveItem(item.id, "up")}
                      onMoveDown={() => moveItem(item.id, "down")}
                      onDuplicate={() => duplicateItem(item.id)}
                      onResizeStart={onResizeStart}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-52 shrink-0 border-l bg-white dark:border-zinc-800 dark:bg-zinc-950 hidden lg:flex flex-col">
          <ScrollArea className="flex-1">
            {selectedItem ? (
              <div className="p-3 space-y-4">
                <h3 className="text-sm font-semibold">组件属性</h3>
                <div className="rounded-lg border p-3 dark:border-zinc-700 space-y-2">
                  <p className="text-sm font-medium">{selectedItem.component.chinese}</p>
                  <p className="text-[11px] text-zinc-500">{selectedItem.component.desc}</p>
                  <Badge variant="secondary" className="text-[10px]">{selectedItem.component.category}</Badge>
                </div>
                {/* Width slider */}
                <div>
                  <p className="text-xs font-medium mb-1">宽度: {selectedItem.width}%</p>
                  <input type="range" min={25} max={100} step={5} value={selectedItem.width}
                    onChange={e => updateWidth(selectedItem.id, Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none bg-zinc-200 dark:bg-zinc-700 accent-blue-500" />
                </div>
                {/* Height */}
                <div>
                  <p className="text-xs font-medium mb-1">高度: {selectedItem.height > 0 ? `${selectedItem.height}px` : "自动"}</p>
                  <div className="flex gap-1">
                    {[0, 80, 160, 240, 360].map(h => (
                      <button key={h} onClick={() => updateHeight(selectedItem.id, h)}
                        className={cn("flex-1 py-1 text-[10px] rounded border dark:border-zinc-700", selectedItem.height === h ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "hover:bg-zinc-50 dark:hover:bg-zinc-800")}>
                        {h === 0 ? "自动" : `${h}px`}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Note */}
                <div>
                  <p className="text-xs font-medium mb-1">备注（给AI看的）</p>
                  <textarea
                    className="w-full rounded-lg border px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 resize-none"
                    rows={2}
                    placeholder="例：这里放账户余额数据"
                    value={selectedItem.note}
                    onChange={e => updateNote(selectedItem.id, e.target.value)}
                  />
                  <p className="text-[10px] text-zinc-400 mt-0.5">导出时此备注会告诉AI这区域放什么</p>
                </div>
                <Separator />
                <div className="space-y-0.5">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7" onClick={() => duplicateItem(selectedItem.id)}>📋 复制</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7" onClick={() => moveItem(selectedItem.id, "up")}>⬆ 上移</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7" onClick={() => moveItem(selectedItem.id, "down")}>⬇ 下移</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7 text-red-500" onClick={() => removeItem(selectedItem.id)}>🗑 删除</Button>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-zinc-400 mt-8">点击画布中组件<br/>查看和编辑属性</div>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Export dialog */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="max-w-xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>导出布局方案</DialogTitle>
            <DialogDescription>结构化 JSON，直接提供给 AI 生成代码</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Stat label="组件数" value={items.length} />
              <Stat label="平台" value={platformNames[platform]} />
              <Stat label="备注数" value={items.filter(i => i.note).length} />
            </div>
            <pre className="rounded-lg bg-zinc-950 p-3 text-[11px] text-zinc-100 max-h-64 overflow-auto dark:bg-zinc-900 leading-relaxed">
              {JSON.stringify(buildExport(), null, 2)}
            </pre>
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

function Stat({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-lg border p-2 text-center dark:border-zinc-700"><p className="text-lg font-bold">{value}</p><p className="text-[10px] text-zinc-500">{label}</p></div>;
}

// ============ Canvas Item ============
function CanvasItemView({ item, platform, isSelected, onSelect, onRemove, onMoveUp, onMoveDown, onDuplicate, onResizeStart }: {
  item: CanvasItem; platform: Platform; isSelected: boolean;
  onSelect: () => void; onRemove: () => void; onMoveUp: () => void; onMoveDown: () => void; onDuplicate: () => void;
  onResizeStart: (e: React.MouseEvent, id: string, edge: "right" | "bottom" | "corner") => void;
}) {
  const w = platform === "mobile" ? "100%" : `${item.width}%`;
  const h = item.height > 0 ? item.height : undefined;

  return (
    <div
      style={{ width: w, height: h }}
      className={cn(
        "relative group rounded-xl border-2 transition-all flex-shrink-0",
        isSelected ? "border-blue-500 shadow-md" : "border-transparent hover:border-zinc-200 dark:hover:border-zinc-700",
        "bg-white dark:bg-zinc-900"
      )}
    >
      {/* Toolbar */}
      <div className={cn("absolute -top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-0.5 opacity-0 transition-opacity bg-white dark:bg-zinc-800 rounded-md shadow-lg border dark:border-zinc-700 px-0.5 py-0.5", isSelected ? "opacity-100" : "group-hover:opacity-100")}>
        <TBtn onClick={onMoveUp} title="上移"><ChevronUp className="h-3 w-3" /></TBtn>
        <TBtn onClick={onMoveDown} title="下移"><ChevronDown className="h-3 w-3" /></TBtn>
        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700" />
        <TBtn onClick={onDuplicate} title="复制">📋</TBtn>
        <TBtn onClick={onRemove} title="删除" danger><X className="h-3 w-3" /></TBtn>
      </div>

      {/* Content */}
      <div onClick={onSelect} className="cursor-pointer p-3 min-h-[60px] flex items-center justify-center overflow-hidden">
        <ComponentRenderer componentName={item.component.english} category={item.component.category} variants={item.component.variants} />
      </div>

      {/* Note label */}
      {item.note && (
        <div className="absolute top-1 left-2 z-10 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full max-w-[80%] truncate">
          💬 {item.note}
        </div>
      )}

      {/* Resize handles */}
      {isSelected && (
        <>
          <div className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-blue-200/50 z-20"
            onMouseDown={e => onResizeStart(e, item.id, "right")} />
          <div className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-blue-200/50 z-20"
            onMouseDown={e => onResizeStart(e, item.id, "bottom")} />
          <div className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-20"
            onMouseDown={e => onResizeStart(e, item.id, "corner")}>
            <svg width="12" height="12" className="absolute bottom-0.5 right-0.5 text-blue-400"><path d="M0 12 L12 0" stroke="currentColor" strokeWidth="2" /></svg>
          </div>
        </>
      )}
    </div>
  );
}

function TBtn({ children, onClick, title, danger }: { children: React.ReactNode; onClick: () => void; title: string; danger?: boolean }) {
  return <button onClick={e => { e.stopPropagation(); onClick(); }} title={title} className={cn("p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs", danger && "hover:bg-red-50 hover:text-red-500")}>{children}</button>;
}
