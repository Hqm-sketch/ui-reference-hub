"use client";

import * as React from "react";
import { Monitor, Smartphone, Tablet, Plus, X, Download, Copy, Search, Layers } from "lucide-react";
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
type Position = "tl" | "tc" | "tr" | "ml" | "cc" | "mr" | "bl" | "bc" | "br";

interface LibraryItem {
  chinese: string; english: string; category: string;
  desc: string; defaultW: number; defaultH: number;
  canContain: boolean;
  variants: string[];
}
interface LibraryCategory { name: string; items: LibraryItem[]; }

interface CanvasItem {
  id: string;
  component: LibraryItem;
  w: number;   // px width (0 = auto)
  h: number;   // px height (0 = auto)
  note: string;
  children: CanvasItem[];
  parentId: string | null;
  position: Position;
}

// ============ TRUE ATOMIC COMPONENT LIBRARY ============
// Every component is small, atomic, and independently usable.
// None of them are pre-assembled composites.
const LIBRARY: LibraryCategory[] = [
  {
    name: "🔘 按钮",
    items: [
      { chinese: "小按钮", english: "AtomicBtn", category: "atom", desc: "独立按钮，可随意放", defaultW: 80, defaultH: 0, canContain: false, variants: ["default","secondary","outline","ghost","danger"] },
      { chinese: "图标按钮", english: "AtomicIconBtn", category: "atom", desc: "圆形图标按钮", defaultW: 40, defaultH: 40, canContain: false, variants: ["search","settings","bell","heart","plus","x"] },
      { chinese: "文字按钮", english: "AtomicTextBtn", category: "atom", desc: "纯文字按钮", defaultW: 60, defaultH: 0, canContain: false, variants: ["default","underline"] },
    ],
  },
  {
    name: "📝 文字",
    items: [
      { chinese: "标题文字", english: "AtomicH", category: "atom", desc: "标题 h1~h4", defaultW: 200, defaultH: 0, canContain: false, variants: ["h1","h2","h3","h4"] },
      { chinese: "正文段落", english: "AtomicP", category: "atom", desc: "一段正文", defaultW: 280, defaultH: 0, canContain: false, variants: ["default","small","muted"] },
      { chinese: "标签文字", english: "AtomicLabel", category: "atom", desc: "小文字标签", defaultW: 60, defaultH: 0, canContain: false, variants: ["default","bold","muted"] },
      { chinese: "价格数字", english: "AtomicPrice", category: "atom", desc: "¥金额展示", defaultW: 100, defaultH: 0, canContain: false, variants: ["red","green","default","large"] },
    ],
  },
  {
    name: "🎨 图标",
    items: [
      { chinese: "小图标24", english: "AtomicIcon24", category: "atom", desc: "24px 图标", defaultW: 24, defaultH: 24, canContain: false, variants: ["heart","star","bell","search","settings","user","home","plus","check","x","chevron"] },
      { chinese: "中图标32", english: "AtomicIcon32", category: "atom", desc: "32px 图标", defaultW: 32, defaultH: 32, canContain: false, variants: ["heart","star","bell","search","settings","user","home"] },
      { chinese: "大图标48", english: "AtomicIcon48", category: "atom", desc: "48px 大图标", defaultW: 48, defaultH: 48, canContain: false, variants: ["heart","star","bell","search","settings","user"] },
      { chinese: "Emoji", english: "AtomicEmoji", category: "atom", desc: "Emoji 表情", defaultW: 32, defaultH: 32, canContain: false, variants: ["💰","📊","🎯","💳","📝","⚙️","📈","🔔","🏠","👤","❤️","⭐","🔥","✨","💬","📱"] },
    ],
  },
  {
    name: "🔤 输入",
    items: [
      { chinese: "短输入框", english: "AtomicInput", category: "atom", desc: "文本输入", defaultW: 180, defaultH: 0, canContain: false, variants: ["default","withLabel","withIcon"] },
      { chinese: "搜索框", english: "AtomicSearch", category: "atom", desc: "搜索输入", defaultW: 200, defaultH: 0, canContain: false, variants: ["default","rounded"] },
      { chinese: "开关", english: "AtomicSwitch", category: "atom", desc: "Toggle 开关", defaultW: 50, defaultH: 30, canContain: false, variants: ["off","on"] },
      { chinese: "选择框", english: "AtomicSelect", category: "atom", desc: "下拉选择", defaultW: 140, defaultH: 0, canContain: false, variants: ["default"] },
      { chinese: "复选框", english: "AtomicCheckbox", category: "atom", desc: "复选框", defaultW: 120, defaultH: 0, canContain: false, variants: ["unchecked","checked"] },
    ],
  },
  {
    name: "📦 容器",
    items: [
      { chinese: "空白盒子", english: "AtomicBox", category: "container", desc: "空白容器，可放任意东西", defaultW: 200, defaultH: 120, canContain: true, variants: ["default","dashed","glass"] },
      { chinese: "圆角卡片", english: "AtomicCard", category: "container", desc: "圆角卡片容器", defaultW: 260, defaultH: 160, canContain: true, variants: ["default","glass","dark"] },
      { chinese: "横向排列", english: "AtomicRow", category: "container", desc: "水平排列子元素", defaultW: 300, defaultH: 60, canContain: true, variants: ["default","centered","between"] },
      { chinese: "纵向排列", english: "AtomicCol", category: "container", desc: "垂直排列子元素", defaultW: 200, defaultH: 120, canContain: true, variants: ["default","centered"] },
    ],
  },
  {
    name: "🏷 装饰",
    items: [
      { chinese: "角标数字", english: "AtomicBadgeNum", category: "deco", desc: "数字角标", defaultW: 24, defaultH: 24, canContain: false, variants: ["red","blue","green","gray"] },
      { chinese: "角标圆点", english: "AtomicBadgeDot", category: "deco", desc: "圆点提示", defaultW: 10, defaultH: 10, canContain: false, variants: ["red","green","blue","yellow"] },
      { chinese: "状态标签", english: "AtomicTag", category: "deco", desc: "小标签条", defaultW: 50, defaultH: 0, canContain: false, variants: ["default","success","warning","danger","info"] },
      { chinese: "头像圆圈", english: "AtomicAvatar", category: "deco", desc: "圆形头像", defaultW: 40, defaultH: 40, canContain: false, variants: ["sm","md","lg","withStatus"] },
      { chinese: "分割线", english: "AtomicDivider", category: "deco", desc: "水平分割线", defaultW: 200, defaultH: 2, canContain: false, variants: ["default","withLabel"] },
      { chinese: "占位间距", english: "AtomicSpacer", category: "deco", desc: "空白间距", defaultW: 100, defaultH: 16, canContain: false, variants: ["sm","md","lg"] },
    ],
  },
  {
    name: "📊 数据",
    items: [
      { chinese: "数据数字", english: "AtomicNumber", category: "data", desc: "大数字展示", defaultW: 120, defaultH: 0, canContain: false, variants: ["default","green","red","blue"] },
      { chinese: "进度条", english: "AtomicProgress", category: "data", desc: "进度条", defaultW: 200, defaultH: 8, canContain: false, variants: ["default","blue","green"] },
      { chinese: "评分星星", english: "AtomicStars", category: "data", desc: "星级评分", defaultW: 120, defaultH: 0, canContain: false, variants: ["0","1","2","3","4","5"] },
      { chinese: "列表项", english: "AtomicListItem", category: "data", desc: "单行列表项", defaultW: 280, defaultH: 0, canContain: false, variants: ["default","withArrow","withIcon"] },
    ],
  },
];

// ============ Stack Rule: all containers accept everything ============
function canStack(child: LibraryItem, parent: LibraryItem): boolean {
  return parent.canContain;
}

// ============ Helpers ============
let idCounter = 0;
function nid() { return `c${++idCounter}`; }

function flatAll(items: CanvasItem[]): CanvasItem[] {
  const r: CanvasItem[] = [];
  for (const i of items) { r.push(i); r.push(...flatAll(i.children)); }
  return r;
}
function removeById(items: CanvasItem[], id: string): CanvasItem[] {
  return items.filter(i => i.id !== id).map(i => ({ ...i, children: removeById(i.children, id) }));
}
function updateById(items: CanvasItem[], id: string, fn: (i: CanvasItem) => CanvasItem): CanvasItem[] {
  return items.map(i => i.id === id ? fn(i) : { ...i, children: updateById(i.children, id, fn) });
}
function findById(items: CanvasItem[], id: string): CanvasItem | null {
  for (const i of items) { if (i.id === id) return i; const f = findById(i.children, id); if (f) return f; }
  return null;
}
function findParent(items: CanvasItem[], childId: string): CanvasItem | null {
  for (const i of items) { if (i.children.some(c => c.id === childId)) return i; const f = findParent(i.children, childId); if (f) return f; }
  return null;
}

const POSITIONS: { id: Position; label: string }[] = [
  { id: "tl", label: "左上" }, { id: "tc", label: "上中" }, { id: "tr", label: "右上" },
  { id: "ml", label: "左中" }, { id: "cc", label: "居中" }, { id: "mr", label: "右中" },
  { id: "bl", label: "左下" }, { id: "bc", label: "下中" }, { id: "br", label: "右下" },
];
const posClass: Record<Position, string> = {
  tl: "top-0 left-0", tc: "top-0 left-1/2 -translate-x-1/2", tr: "top-0 right-0",
  ml: "top-1/2 left-0 -translate-y-1/2", cc: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", mr: "top-1/2 right-0 -translate-y-1/2",
  bl: "bottom-0 left-0", bc: "bottom-0 left-1/2 -translate-x-1/2", br: "bottom-0 right-0",
};

// ============ Builder ============
export default function BuilderPage() {
  const [platform, setPlatform] = React.useState<Platform>("mobile");
  const [items, setItems] = React.useState<CanvasItem[]>(() => { idCounter = 0; return []; });
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [layoutName, setLayoutName] = React.useState("我的界面");

  // Drag
  const [dragId, setDragId] = React.useState<string | null>(null);
  const [dragOverIdx, setDragOverIdx] = React.useState<number | null>(null);
  const [dropTargetId, setDropTargetId] = React.useState<string | null>(null);
  const [dropAllowed, setDropAllowed] = React.useState<boolean>(false);

  // Resize
  const [resizing, setResizing] = React.useState<{ id: string; edge: string; sx: number; sy: number; sw: number; sh: number } | null>(null);

  const platformNames: Record<Platform, string> = { desktop: "桌面软件", mobile: "手机应用", tablet: "平板应用" };
  const frameW: Record<Platform, number> = { desktop: 960, mobile: 375, tablet: 640 };

  const allFlat = React.useMemo(() => flatAll(items), [items]);
  const selectedItem = selectedId ? findById(items, selectedId) : null;
  const selectedParent = selectedItem?.parentId ? findParent(items, selectedItem.id) : null;

  // ---- Operations ----
  const addItem = (lib: LibraryItem) => {
    const item: CanvasItem = { id: nid(), component: lib, w: lib.defaultW, h: lib.defaultH, note: "", children: [], parentId: null, position: "tl" };
    if (selectedId && !selectedItem?.parentId) {
      const idx = items.findIndex(i => i.id === selectedId);
      setItems(prev => [...prev.slice(0, idx + 1), item, ...prev.slice(idx + 1)]);
    } else {
      setItems(prev => [...prev, item]);
    }
    setSelectedId(item.id);
    setTimeout(() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  };

  const removeItem = (id: string) => { setItems(prev => removeById(prev, id)); if (selectedId === id) setSelectedId(null); };
  const dupItem = (id: string) => {
    setItems(prev => {
      function dup(arr: CanvasItem[]): CanvasItem[] {
        const r: CanvasItem[] = [];
        for (const i of arr) {
          r.push(i);
          if (i.id === id) r.push({ ...i, id: nid(), children: dup(i.children) });
          else r.push({ ...i, children: dup(i.children) });
        }
        return r;
      }
      return dup(prev);
    });
  };

  const setW = (id: string, w: number) => setItems(prev => updateById(prev, id, i => ({ ...i, w: Math.max(20, w) })));
  const setH = (id: string, h: number) => setItems(prev => updateById(prev, id, i => ({ ...i, h: Math.max(0, h) })));
  const setNote = (id: string, note: string) => setItems(prev => updateById(prev, id, i => ({ ...i, note })));
  const setPos = (id: string, p: Position) => setItems(prev => updateById(prev, id, i => ({ ...i, position: p })));

  const promote = (childId: string, parentId: string) => {
    setItems(prev => {
      const parent = findById(prev, parentId);
      if (!parent) return prev;
      const child = parent.children.find(c => c.id === childId);
      if (!child) return prev;
      const without = updateById(prev, parentId, p => ({ ...p, children: p.children.filter(c => c.id !== childId) }));
      const newChild = { ...child, parentId: null, w: 120, h: 0 };
      const idx = without.findIndex(i => i.id === parentId);
      return [...without.slice(0, idx + 1), newChild, ...without.slice(idx + 1)];
    });
  };

  const stackOn = (childId: string, parentId: string) => {
    const ref = { v: null as CanvasItem | null };
    function extract(arr: CanvasItem[]): CanvasItem[] {
      return arr.filter(i => { if (i.id === childId) { ref.v = i; return false; } return true; }).map(i => ({ ...i, children: extract(i.children) }));
    }
    setItems(prev => {
      const without = extract(prev);
      const child = ref.v;
      if (!child) return prev;
      return updateById(without, parentId, p => ({ ...p, children: [...p.children, { ...child, parentId, position: "tr" as Position }] }));
    });
  };

  // ---- Resize ----
  const onRS = (e: React.MouseEvent, id: string, edge: string) => {
    e.preventDefault(); e.stopPropagation();
    const item = findById(items, id);
    setResizing({ id, edge, sx: e.clientX, sy: e.clientY, sw: item?.w || 100, sh: Math.max(item?.h || 40, 40) });
  };
  React.useEffect(() => {
    if (!resizing) return;
    const onM = (e: MouseEvent) => {
      const { id, edge, sx, sy, sw, sh } = resizing;
      if (edge === "right" || edge === "corner") setW(id, sw + (e.clientX - sx));
      if (edge === "bottom" || edge === "corner") setH(id, sh + (e.clientY - sy));
    };
    const onU = () => setResizing(null);
    window.addEventListener("mousemove", onM); window.addEventListener("mouseup", onU);
    return () => { window.removeEventListener("mousemove", onM); window.removeEventListener("mouseup", onU); };
  }, [resizing]);

  // ---- Drag ----
  const onDS = (e: React.MouseEvent, id: string) => {
    if ((e.target as HTMLElement).closest("[data-rs]") || (e.target as HTMLElement).closest("[data-tb]")) return;
    e.preventDefault();
    setDragId(id);
  };
  React.useEffect(() => {
    if (!dragId) return;
    const container = document.getElementById("cv");
    if (!container) return;
    const onM = (e: MouseEvent) => {
      const els = container.querySelectorAll("[data-iid]");
      let target: string | null = null;
      let idx: number | null = null;
      let stack = false;

      for (const el of els) {
        const iid = el.getAttribute("data-iid");
        if (!iid || iid === dragId) continue;
        const r = el.getBoundingClientRect();
        const cy = r.top + r.height * 0.35;
        const cb = r.top + r.height * 0.65;
        if (e.clientY > cy && e.clientY < cb && e.clientX > r.left + r.width * 0.15 && e.clientX < r.right - r.width * 0.15) {
          const dragItem = findById(items, dragId);
          const tgtItem = findById(items, iid);
          if (dragItem && tgtItem && canStack(dragItem.component, tgtItem.component)) { target = iid; stack = true; break; }
        }
        if (e.clientY < r.top + r.height / 2) { idx = items.findIndex(i => i.id === iid || flatAll(i.children).some(c => c.id === iid)); break; }
      }
      if (!stack && idx === null && els.length > 0) { const lr = els[els.length - 1].getBoundingClientRect(); if (e.clientY > lr.bottom) idx = items.length; }
      setDropTargetId(stack ? target : null);
      setDropAllowed(stack);
      setDragOverIdx(stack ? null : idx);
    };
    const onU = () => {
      if (dropTargetId && dropAllowed && dragId) stackOn(dragId, dropTargetId);
      else if (dragOverIdx !== null) {
        const ref = { v: null as CanvasItem | null };
        function extract(arr: CanvasItem[]): CanvasItem[] {
          return arr.filter(i => { if (i.id === dragId) { ref.v = i; return false; } return true; }).map(i => ({ ...i, children: extract(i.children) }));
        }
        setItems(prev => {
          const without = extract(prev);
          const item = ref.v;
          if (!item) return prev;
          const insertAt = Math.min(dragOverIdx!, without.length);
          return [...without.slice(0, insertAt), { ...item, parentId: null }, ...without.slice(insertAt)];
        });
      }
      setDragId(null); setDropTargetId(null); setDropAllowed(false); setDragOverIdx(null);
    };
    window.addEventListener("mousemove", onM); window.addEventListener("mouseup", onU);
    return () => { window.removeEventListener("mousemove", onM); window.removeEventListener("mouseup", onU); };
  }, [dragId, dropTargetId, dropAllowed, dragOverIdx, items]);

  // ---- Export ----
  const buildExport = () => {
    function ser(arr: CanvasItem[]): any[] {
      return arr.map((i, idx) => ({
        order: idx + 1, component: i.component.chinese, type: i.component.category,
        width: i.w > 0 ? `${i.w}px` : "auto", height: i.h > 0 ? `${i.h}px` : "auto",
        note: i.note || null, children: i.children.length > 0 ? ser(i.children) : undefined,
        position: i.parentId ? i.position : undefined,
      }));
    }
    return {
      name: layoutName, platform, platformName: platformNames[platform],
      componentCount: allFlat.length,
      layout: ser(items),
      tokens: { colors: { primary: "#18181b", accent: "#2563eb", success: "#059669", danger: "#dc2626" }, radius: "8px", spacing: "8px" },
    };
  };

  const filteredLib = React.useMemo(() => {
    if (!searchQuery.trim()) return LIBRARY;
    const q = searchQuery.toLowerCase();
    return LIBRARY.map(c => ({ ...c, items: c.items.filter(i => i.chinese.includes(q) || i.desc.includes(q)) })).filter(c => c.items.length > 0);
  }, [searchQuery]);

  return (
    <div className="h-screen flex flex-col bg-zinc-100 dark:bg-zinc-950">
      {/* Top */}
      <div className="shrink-0 h-11 border-b bg-white dark:border-zinc-800 dark:bg-zinc-950 flex items-center justify-between px-3 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold hidden sm:inline">搭建器</span>
          <div className="flex rounded-md bg-zinc-100 p-0.5 dark:bg-zinc-800">
            {(["mobile", "desktop", "tablet"] as Platform[]).map(p => (
              <button key={p} onClick={() => setPlatform(p)} className={cn("flex items-center gap-1 rounded px-2 py-0.5 text-[10px]", platform === p ? "bg-white shadow-sm text-zinc-900 dark:bg-zinc-700 dark:text-white" : "text-zinc-500")}>
                {p === "mobile" ? <Smartphone className="h-3 w-3" /> : p === "desktop" ? <Monitor className="h-3 w-3" /> : <Tablet className="h-3 w-3" />}
                <span className="hidden sm:inline">{platformNames[p]}</span>
              </button>
            ))}
          </div>
          <Input className="h-6 w-24 text-[10px] hidden sm:block" placeholder="方案名" value={layoutName} onChange={e => setLayoutName(e.target.value)} />
          <span className="text-[10px] text-zinc-400 hidden sm:inline">{allFlat.length}个</span>
        </div>
        <div className="flex items-center gap-1">
          <Button size="sm" variant="outline" onClick={() => setItems([])} className="gap-1 h-6 text-[10px] hidden sm:inline-flex">清空</Button>
          <Button size="sm" onClick={() => setExportOpen(true)} className="gap-1 h-6 text-[10px]"><Download className="h-3 w-3" />导出</Button>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Left */}
        <div className="w-40 shrink-0 border-r bg-white dark:border-zinc-800 dark:bg-zinc-950 hidden lg:flex flex-col">
          <div className="p-1.5 border-b dark:border-zinc-800">
            <div className="relative"><Search className="absolute left-1.5 top-1.5 h-3 w-3 text-zinc-400" /><Input className="pl-6 h-6 text-[10px]" placeholder="搜索..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /></div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-1 space-y-0.5">
              {filteredLib.map(cat => (
                <div key={cat.name}>
                  <div className="px-1.5 py-1 text-[9px] font-semibold text-zinc-400">{cat.name}</div>
                  {cat.items.map(item => (
                    <button key={item.chinese} onClick={() => addItem(item)}
                      className={cn("w-full text-left px-1.5 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800",
                        item.canContain && "border-l-2 border-l-green-400")}>
                      <div className="text-[10px] font-medium">{item.chinese}</div>
                      <div className="text-[8px] text-zinc-400">{item.desc}{item.canContain ? " · 容器" : ""}</div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-1.5 border-t dark:border-zinc-800 text-[8px] text-zinc-400">
            <p>🟢 绿边 = 可放东西进去</p>
            <p>拖到容器上 = 叠加</p>
          </div>
        </div>

        {/* Center */}
        <div className="flex-1 flex justify-center p-2 overflow-auto bg-zinc-200/50 dark:bg-zinc-900/50">
          <div style={{ width: frameW[platform] }} className="flex flex-col h-fit">
            <div className={cn("bg-white dark:bg-zinc-900 shadow-xl min-h-[400px] overflow-hidden",
              platform === "mobile" ? "rounded-2xl border-8 border-zinc-800 dark:border-zinc-700" : "rounded-lg border dark:border-zinc-700")}>
              {platform !== "mobile" && (
                <div className="flex items-center gap-1.5 h-5 px-2 bg-zinc-100 dark:bg-zinc-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400" /><span className="h-1.5 w-1.5 rounded-full bg-yellow-400" /><span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                </div>
              )}
              {platform === "mobile" && (
                <div className="flex justify-between items-center h-6 px-3 bg-white dark:bg-zinc-900 text-[9px] border-b dark:border-zinc-800"><span>9:41</span><span>📶🔋</span></div>
              )}
              <div id="cv" className="min-h-[400px] p-2 flex flex-wrap items-start content-start gap-1.5">
                {items.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center h-48 text-zinc-300 dark:text-zinc-600">
                    <Plus className="h-6 w-6 mb-1" /><p className="text-[10px]">从左侧添加原子组件，自由拼装</p>
                  </div>
                ) : (
                  items.map((item, idx) => (
                    <CanvasItemView key={item.id} item={item} platform={platform}
                      isSelected={selectedId === item.id}
                      isDragOver={dropTargetId === item.id && dropAllowed}
                      isDragBlocked={dropTargetId === item.id && !dropAllowed}
                      isDragging={dragId === item.id}
                      dragOverIdx={dragOverIdx} currentIdx={idx}
                      onSelect={() => setSelectedId(prev => prev === item.id ? null : item.id)}
                      onRemove={() => removeItem(item.id)} onDup={() => dupItem(item.id)}
                      onRS={onRS} onDS={onDS}
                      onPromote={(cid: string) => promote(cid, item.id)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-40 shrink-0 border-l bg-white dark:border-zinc-800 dark:bg-zinc-950 hidden lg:flex flex-col">
          <ScrollArea className="flex-1">
            {selectedItem ? (
              <div className="p-2.5 space-y-2.5">
                <h3 className="text-[10px] font-semibold">属性</h3>
                <div className="rounded-lg border p-2 dark:border-zinc-700">
                  <p className="text-[10px] font-medium">{selectedItem.component.chinese}</p>
                  <p className="text-[8px] text-zinc-500">{selectedItem.component.desc}</p>
                </div>
                {selectedParent && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-1.5 dark:border-amber-800 dark:bg-amber-950/30">
                    <p className="text-[9px] text-amber-700 dark:text-amber-300">叠在: {selectedParent.component.chinese}</p>
                    <button onClick={() => promote(selectedItem.id, selectedParent.id)}
                      className="w-full mt-1 text-[9px] border rounded py-0.5 hover:bg-white dark:hover:bg-zinc-800">↥ 移出</button>
                  </div>
                )}
                {selectedItem.parentId && (
                  <div>
                    <p className="text-[9px] mb-1">叠加位置</p>
                    <div className="grid grid-cols-3 gap-0.5">
                      {POSITIONS.map(pos => (
                        <button key={pos.id} onClick={() => setPos(selectedItem.id, pos.id)}
                          className={cn("py-0.5 text-[8px] rounded border dark:border-zinc-700",
                            selectedItem.position === pos.id ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "hover:bg-zinc-50")}>{pos.label}</button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <div className="flex justify-between text-[9px]"><span>宽</span><span>{selectedItem.w}px</span></div>
                  <input type="range" min={20} max={600} step={10} value={selectedItem.w}
                    onChange={e => setW(selectedItem.id, Number(e.target.value))}
                    className="w-full h-1 rounded-full bg-zinc-200 dark:bg-zinc-700 accent-blue-500" />
                </div>
                <div>
                  <div className="flex justify-between text-[9px]"><span>高</span><span>{selectedItem.h > 0 ? `${selectedItem.h}px` : "auto"}</span></div>
                  <input type="range" min={0} max={400} step={10} value={selectedItem.h}
                    onChange={e => setH(selectedItem.id, Number(e.target.value))}
                    className="w-full h-1 rounded-full bg-zinc-200 dark:bg-zinc-700 accent-blue-500" />
                </div>
                <div>
                  <p className="text-[9px] mb-1">备注</p>
                  <textarea className="w-full rounded border px-1.5 py-1 text-[9px] dark:border-zinc-700 dark:bg-zinc-800 resize-none" rows={2}
                    placeholder="告诉AI这是什么..." value={selectedItem.note} onChange={e => setNote(selectedItem.id, e.target.value)} />
                </div>
                <Button variant="ghost" size="sm" className="w-full justify-start text-[9px] h-5" onClick={() => dupItem(selectedItem.id)}>📋 复制</Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-[9px] h-5 text-red-500" onClick={() => removeItem(selectedItem.id)}>🗑 删除</Button>
              </div>
            ) : (
              <div className="p-3 text-center text-[9px] text-zinc-400 mt-6">
                <p>💡 使用说明</p>
                <div className="mt-2 text-left space-y-0.5 text-[8px]">
                  <p>1. 左侧选组件添加</p>
                  <p>2. 拖拽组件排序</p>
                  <p>3. 拖到🟢容器上叠加</p>
                  <p>4. 选中后调大小</p>
                  <p>5. 写备注给AI</p>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Export */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="max-w-lg max-h-[85vh]">
          <DialogHeader><DialogTitle>导出 JSON</DialogTitle><DialogDescription>原子组件布局 → AI 生成代码</DialogDescription></DialogHeader>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-1.5">
              {[{ l: "组件数", v: allFlat.length }, { l: "平台", v: platformNames[platform] }, { l: "已叠加", v: allFlat.filter(i => i.parentId).length }].map(s => (
                <div key={s.l} className="rounded border p-1.5 text-center dark:border-zinc-700"><p className="text-base font-bold">{s.v}</p><p className="text-[8px] text-zinc-500">{s.l}</p></div>
              ))}
            </div>
            <pre className="rounded-lg bg-zinc-950 p-2.5 text-[9px] text-zinc-100 max-h-48 overflow-auto dark:bg-zinc-900">{JSON.stringify(buildExport(), null, 2)}</pre>
            <div className="flex justify-end gap-1.5">
              <Button variant="outline" size="sm" onClick={async () => { await navigator.clipboard.writeText(JSON.stringify(buildExport(), null, 2)); }} className="gap-1 h-6 text-[10px]"><Copy className="h-3 w-3" />复制</Button>
              <Button size="sm" onClick={() => { const b = new Blob([JSON.stringify(buildExport(), null, 2)], { type: "application/json" }); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = `${layoutName}.json`; a.click(); URL.revokeObjectURL(u); }} className="gap-1 h-6 text-[10px]"><Download className="h-3 w-3" />下载</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ============ Canvas Item ============
function CanvasItemView({ item, platform, isSelected, isDragOver, isDragBlocked, isDragging, dragOverIdx, currentIdx, onSelect, onRemove, onDup, onRS, onDS, onPromote }: {
  item: CanvasItem; platform: Platform; isSelected: boolean; isDragOver: boolean; isDragBlocked: boolean;
  isDragging: boolean; dragOverIdx: number | null; currentIdx: number;
  onSelect: () => void; onRemove: () => void; onDup: () => void;
  onRS: (e: React.MouseEvent, id: string, edge: string) => void;
  onDS: (e: React.MouseEvent, id: string) => void;
  onPromote: (childId: string) => void;
}) {
  const isRoot = !item.parentId;
  const hasKids = item.children.length > 0;
  const style: React.CSSProperties = {};
  if (isRoot && item.w > 0) style.width = item.w;
  if (isRoot && item.h > 0) style.height = item.h;

  return (
    <>
      {dragOverIdx === currentIdx && <div className="w-full h-1 bg-blue-500 rounded-full animate-pulse" />}
      <div id={item.id} data-iid={item.id} style={style}
        className={cn(
          "relative rounded-lg border-2 transition-all flex-shrink-0 select-none group",
          isSelected && !isDragOver && !isDragBlocked ? "border-blue-500 shadow-md" : "",
          isDragOver ? "border-green-500 bg-green-50/50 shadow-lg shadow-green-200 dark:bg-green-950/20 scale-[1.03]" : "",
          isDragBlocked ? "border-red-500 bg-red-50/50 shadow-lg shadow-red-200 dark:bg-red-950/20" : "",
          isDragging ? "opacity-25 scale-95" : "opacity-100",
          !isSelected && !isDragOver && !isDragBlocked ? "border-transparent hover:border-zinc-200 dark:hover:border-zinc-700" : "",
          "bg-white dark:bg-zinc-900",
          isRoot ? "cursor-grab active:cursor-grabbing" : "cursor-default"
        )}
        onMouseDown={e => isRoot ? onDS(e, item.id) : undefined}
        onClick={e => { if (!(e.target as HTMLElement).closest("[data-rs]") && !(e.target as HTMLElement).closest("[data-tb]")) onSelect(); }}
      >
        {/* Stack indicator */}
        {isDragOver && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="rounded-full bg-green-500 text-white px-2 py-0.5 text-[10px] font-bold shadow-lg animate-bounce"><Layers className="inline h-3 w-3 mr-0.5" />松手叠加</div>
          </div>
        )}
        {isDragBlocked && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="rounded-full bg-red-500 text-white px-2 py-0.5 text-[10px] font-bold shadow-lg"><X className="inline h-3 w-3 mr-0.5" />无法叠加</div>
          </div>
        )}

        {/* Toolbar */}
        {isRoot && (
          <div data-tb className={cn("absolute -top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-0.5 bg-white dark:bg-zinc-800 rounded shadow-lg border dark:border-zinc-700 px-0.5 py-0.5 transition-opacity",
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>
            <Tb onClick={onDup} title="复制">📋</Tb>
            <Tb onClick={onRemove} title="删除" danger><X className="h-2.5 w-2.5" /></Tb>
          </div>
        )}

        {/* Content */}
        <div className={cn("min-h-[20px] flex items-center justify-center overflow-visible", hasKids && "relative")}>
          <ComponentRenderer componentName={item.component.english} category={item.component.category} variants={item.component.variants} />
          {/* Children */}
          {item.children.map(child => (
            <div key={child.id} className={cn("absolute z-10", posClass[child.position])} onClick={e => e.stopPropagation()}>
              <div className="border border-blue-300/30 rounded hover:border-blue-400">
                <ComponentRenderer componentName={child.component.english} category={child.component.category} variants={child.component.variants} />
              </div>
              <button onClick={e => { e.stopPropagation(); onPromote(child.id); }}
                className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full bg-white border dark:bg-zinc-800 shadow flex items-center justify-center hover:bg-red-50">
                <X className="h-2 w-2 text-zinc-400 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {/* Note + Child count */}
        {(item.note || hasKids) && (
          <div className="absolute top-0.5 left-1 z-10 flex items-center gap-0.5">
            {item.note && <span className="bg-blue-500 text-white text-[7px] px-1 py-0.5 rounded-full max-w-[80px] truncate">💬{item.note}</span>}
            {hasKids && <span className="bg-green-500 text-white text-[7px] px-1 py-0.5 rounded-full">{item.children.length}</span>}
          </div>
        )}

        {/* Resize handles */}
        {isSelected && isRoot && (
          <>
            <div data-rs className="absolute right-0 top-0 bottom-0 w-1.5 cursor-ew-resize hover:bg-blue-200/50 z-20" onMouseDown={e => onRS(e, item.id, "right")} />
            <div data-rs className="absolute bottom-0 left-0 right-0 h-1.5 cursor-ns-resize hover:bg-blue-200/50 z-20" onMouseDown={e => onRS(e, item.id, "bottom")} />
            <div data-rs className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize z-20" onMouseDown={e => onRS(e, item.id, "corner")}>
              <svg width="10" height="10" className="absolute bottom-0.5 right-0.5 text-blue-400"><path d="M0 10 L10 0" stroke="currentColor" strokeWidth="2" /></svg>
            </div>
          </>
        )}
      </div>
      {dragOverIdx === currentIdx + 1 && <div className="w-full h-1 bg-blue-500 rounded-full animate-pulse" />}
    </>
  );
}

function Tb({ children, onClick, title, danger }: { children: React.ReactNode; onClick: () => void; title: string; danger?: boolean }) {
  return <button onClick={e => { e.stopPropagation(); onClick(); }} title={title}
    className={cn("p-0.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs", danger && "hover:bg-red-50 hover:text-red-500")}>{children}</button>;
}
