"use client";

import * as React from "react";
import { Monitor, Smartphone, Tablet, Plus, X, Download, Copy, Search, Layers, ArrowUpToLine, ArrowBigUp } from "lucide-react";
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
type Position = "tl" | "tc" | "tr" | "bl" | "bc" | "br" | "cc";
interface LibraryItem { chinese: string; english: string; category: string; variants: string[]; desc: string; canContain: boolean; canBeChild: boolean; defaultChildPos: Position; }
interface LibraryCategory { name: string; items: LibraryItem[]; }

interface CanvasItem {
  id: string;
  component: LibraryItem;
  width: number;
  height: number;
  note: string;
  children: CanvasItem[];
  parentId: string | null;
  position: Position;
}

// ============ Stack Rules ============
function canStackOn(child: LibraryItem, parent: LibraryItem): boolean {
  return parent.canContain && child.canBeChild;
}

const POSITIONS: { id: Position; label: string }[] = [
  { id: "tl", label: "左上" }, { id: "tc", label: "上中" }, { id: "tr", label: "右上" },
  { id: "bl", label: "左下" }, { id: "bc", label: "下中" }, { id: "br", label: "右下" },
  { id: "cc", label: "居中" },
];

const posStyles: Record<Position, string> = {
  tl: "top-1 left-1", tc: "top-1 left-1/2 -translate-x-1/2", tr: "top-1 right-1",
  bl: "bottom-1 left-1", bc: "bottom-1 left-1/2 -translate-x-1/2", br: "bottom-1 right-1",
  cc: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

// ============ Component Library ============
const LIBRARY: LibraryCategory[] = [
  {
    name: "📱 应用组件",
    items: [
      { chinese: "底部导航栏", english: "底部导航栏", category: "app", variants: ["5tabs"], desc: "底部Tab", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "页面标题栏", english: "页面标题", category: "app", variants: ["default"], desc: "标题+返回", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "搜索栏", english: "搜索栏", category: "app", variants: ["default"], desc: "搜索框", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "数据卡片", english: "数据卡片", category: "app", variants: ["default"], desc: "数据指标", canContain: true, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "统计行", english: "统计行", category: "app", variants: ["default"], desc: "统计数据", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "交易记录", english: "交易记录", category: "app", variants: ["default"], desc: "流水列表", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "列表组", english: "列表组", category: "app", variants: ["default"], desc: "分类列表", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "日历视图", english: "日历视图", category: "app", variants: ["default"], desc: "月历", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "图表占位", english: "图表占位", category: "app", variants: ["default"], desc: "图表区域", canContain: true, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "设置列表", english: "设置列表", category: "app", variants: ["default"], desc: "设置项", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "表单组", english: "表单组", category: "app", variants: ["default"], desc: "输入表单", canContain: true, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "内容区块", english: "内容区块", category: "app", variants: ["default"], desc: "空白内容区", canContain: true, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "空白占位", english: "空白占位", category: "app", variants: ["default"], desc: "自由标注", canContain: true, canBeChild: false, defaultChildPos: "tl" },
    ],
  },
  {
    name: "🎯 装饰叠加",
    items: [
      { chinese: "角标", english: "角标", category: "overlay", variants: ["number","dot","text"], desc: "数字/文字角标", canContain: false, canBeChild: true, defaultChildPos: "tr" },
      { chinese: "价格标签", english: "价格标签", category: "overlay", variants: ["default"], desc: "悬浮价格", canContain: false, canBeChild: true, defaultChildPos: "br" },
      { chinese: "状态点", english: "状态点", category: "overlay", variants: ["online","offline","busy"], desc: "在线状态", canContain: false, canBeChild: true, defaultChildPos: "br" },
      { chinese: "图标", english: "图标", category: "overlay", variants: ["heart","star","bell","settings"], desc: "装饰图标", canContain: false, canBeChild: true, defaultChildPos: "tr" },
      { chinese: "文字标签", english: "文字标签", category: "overlay", variants: ["default"], desc: "叠加文字", canContain: false, canBeChild: true, defaultChildPos: "tc" },
      { chinese: "按钮叠加", english: "按钮叠加", category: "overlay", variants: ["default"], desc: "悬浮按钮", canContain: false, canBeChild: true, defaultChildPos: "bc" },
      { chinese: "徽章", english: "Badge", category: "basic", variants: ["default","success","warning","destructive"], desc: "状态徽章", canContain: false, canBeChild: true, defaultChildPos: "tr" },
    ],
  },
  {
    name: "💬 社交聊天",
    items: [
      { chinese: "消息气泡", english: "消息气泡", category: "scene", variants: ["sent","received"], desc: "聊天气泡", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "聊天输入栏", english: "聊天输入栏", category: "scene", variants: ["default"], desc: "底部输入", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "用户信息卡", english: "用户信息卡", category: "scene", variants: ["default"], desc: "用户资料", canContain: true, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "联系人列表", english: "联系人列表", category: "scene", variants: ["default"], desc: "联系人", canContain: false, canBeChild: false, defaultChildPos: "tl" },
    ],
  },
  {
    name: "🛒 电商购物",
    items: [
      { chinese: "商品卡片", english: "商品卡片", category: "scene", variants: ["default"], desc: "商品展示", canContain: true, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "订单摘要", english: "订单摘要", category: "scene", variants: ["default"], desc: "订单信息", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "评价卡片", english: "评价卡片", category: "scene", variants: ["default"], desc: "用户评价", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "购物车项", english: "购物车项", category: "scene", variants: ["default"], desc: "购物车", canContain: false, canBeChild: false, defaultChildPos: "tl" },
    ],
  },
  {
    name: "🎵 媒体健康",
    items: [
      { chinese: "音乐播放条", english: "音乐播放条", category: "scene", variants: ["default"], desc: "播放控制", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "歌单卡片", english: "歌单卡片", category: "scene", variants: ["default"], desc: "歌单展示", canContain: true, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "步数卡片", english: "步数卡片", category: "scene", variants: ["default"], desc: "健康数据", canContain: true, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "签到卡片", english: "签到卡片", category: "scene", variants: ["default"], desc: "签到打卡", canContain: false, canBeChild: false, defaultChildPos: "tl" },
    ],
  },
  {
    name: "🎯 通用功能",
    items: [
      { chinese: "功能入口", english: "功能入口", category: "scene", variants: ["default"], desc: "宫格导航", canContain: true, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "标签筛选栏", english: "标签筛选栏", category: "scene", variants: ["default"], desc: "标签过滤", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "公告横幅", english: "公告横幅", category: "scene", variants: ["default"], desc: "通知横幅", canContain: true, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "进度环", english: "进度环", category: "scene", variants: ["default"], desc: "环形进度", canContain: false, canBeChild: false, defaultChildPos: "tl" },
    ],
  },
  {
    name: "🔘 基础元素",
    items: [
      { chinese: "按钮", english: "Button", category: "basic", variants: ["default","secondary","outline","ghost","destructive"], desc: "操作触发", canContain: false, canBeChild: true, defaultChildPos: "bc" },
      { chinese: "输入框", english: "Input", category: "basic", variants: ["default"], desc: "文本输入", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "开关", english: "Switch", category: "basic", variants: ["default"], desc: "切换", canContain: false, canBeChild: true, defaultChildPos: "tr" },
      { chinese: "卡片", english: "Card", category: "layout", variants: ["default"], desc: "内容容器", canContain: true, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "提示条", english: "Alert", category: "feedback", variants: ["info","success","warning","error"], desc: "信息提示", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "分割线", english: "Divider", category: "basic", variants: ["horizontal","withLabel"], desc: "分隔", canContain: false, canBeChild: false, defaultChildPos: "tl" },
      { chinese: "头像", english: "Avatar", category: "basic", variants: ["image","fallback","withStatus"], desc: "用户头像", canContain: false, canBeChild: true, defaultChildPos: "tl" },
    ],
  },
];

// ============ Builder ============
let idCounter = 0;
function nid() { return `c${++idCounter}`; }

function flatItems(items: CanvasItem[]): CanvasItem[] {
  const result: CanvasItem[] = [];
  for (const item of items) {
    result.push(item);
    if (item.children.length > 0) result.push(...flatItems(item.children));
  }
  return result;
}

function findItemByChinese(chinese: string): LibraryItem {
  for (const cat of LIBRARY) {
    const f = cat.items.find(i => i.chinese === chinese);
    if (f) return f;
  }
  return LIBRARY[0].items[0];
}

function findParent(items: CanvasItem[], childId: string): CanvasItem | null {
  for (const item of items) {
    if (item.children.some(c => c.id === childId)) return item;
    const found = findParent(item.children, childId);
    if (found) return found;
  }
  return null;
}

function removeItemById(items: CanvasItem[], id: string): CanvasItem[] {
  return items.filter(i => i.id !== id).map(i => ({ ...i, children: removeItemById(i.children, id) }));
}

function updateItemById(items: CanvasItem[], id: string, updater: (item: CanvasItem) => CanvasItem): CanvasItem[] {
  return items.map(i => {
    if (i.id === id) return updater(i);
    return { ...i, children: updateItemById(i.children, id, updater) };
  });
}

function moveChildToRoot(items: CanvasItem[], childId: string, parentId: string): CanvasItem[] {
  // Remove child from parent, insert after parent in root
  const parent = findParent(items, parentId) || items.find(i => i.id === parentId);
  if (!parent) return items;
  const child = parent.children.find(c => c.id === childId);
  if (!child) return items;
  const withoutChild = updateItemById(items, parentId, p => ({
    ...p, children: p.children.filter(c => c.id !== childId),
  }));
  const newChild = { ...child, parentId: null, width: parent.width, height: 0 };
  const idx = withoutChild.findIndex(i => i.id === parentId);
  return [...withoutChild.slice(0, idx + 1), newChild, ...withoutChild.slice(idx + 1)];
}

export default function BuilderPage() {
  const [platform, setPlatform] = React.useState<Platform>("mobile");
  const [items, setItems] = React.useState<CanvasItem[]>(() => {
    idCounter = 0;
    const statCard = findItemByChinese("数据卡片");
    return [
      { id: nid(), component: findItemByChinese("页面标题栏"), width: 100, height: 0, note: "应用首页", children: [], parentId: null, position: "tl" },
      { id: nid(), component: findItemByChinese("功能入口"), width: 100, height: 0, note: "4个功能入口", children: [], parentId: null, position: "tl" },
      { id: nid(), component: statCard, width: 50, height: 0, note: "", children: [
        { id: nid(), component: findItemByChinese("角标"), width: 0, height: 0, note: "新", children: [], parentId: "", position: "tr" },
      ], parentId: null, position: "tl" },
      { id: nid(), component: statCard, width: 50, height: 0, note: "", children: [], parentId: null, position: "tl" },
      { id: nid(), component: findItemByChinese("列表组"), width: 100, height: 0, note: "", children: [], parentId: null, position: "tl" },
      { id: nid(), component: findItemByChinese("底部导航栏"), width: 100, height: 0, note: "首页/发现/消息/我的", children: [], parentId: null, position: "tl" },
    ];
  });
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [layoutName, setLayoutName] = React.useState("我的应用");

  // Drag states
  const [dragId, setDragId] = React.useState<string | null>(null);
  const [dragOverIdx, setDragOverIdx] = React.useState<number | null>(null);
  const [dropTargetId, setDropTargetId] = React.useState<string | null>(null);
  const [dropAllowed, setDropAllowed] = React.useState<boolean>(false);
  const itemsRef = React.useRef(items); itemsRef.current = items;

  // Resize state
  const [resizeState, setResizeState] = React.useState<{ id: string; edge: string; sx: number; sy: number; sw: number; sh: number } | null>(null);

  const platformNames: Record<Platform, string> = { desktop: "桌面软件", mobile: "手机应用", tablet: "平板应用" };
  const frameWidths: Record<Platform, number> = { desktop: 960, mobile: 375, tablet: 640 };

  // ---- Flat list for root-level ordering ----
  const rootItems = items;

  // ---- Item operations ----
  const addItem = (libItem: LibraryItem) => {
    const newItem: CanvasItem = { id: nid(), component: libItem, width: platform === "mobile" ? 100 : 50, height: 0, note: "", children: [], parentId: null, position: libItem.defaultChildPos };
    if (selectedId) {
      const idx = rootItems.findIndex(i => i.id === selectedId);
      setItems(prev => [...prev.slice(0, idx + 1), newItem, ...prev.slice(idx + 1)]);
    } else {
      setItems(prev => [...prev, newItem]);
    }
    setSelectedId(newItem.id);
    setTimeout(() => document.getElementById(newItem.id)?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const removeItem = (id: string) => {
    setItems(prev => removeItemById(prev, id));
    if (selectedId === id) setSelectedId(null);
  };

  const duplicateItem = (id: string) => {
    setItems(prev => {
      function dup(arr: CanvasItem[]): CanvasItem[] {
        const result: CanvasItem[] = [];
        for (const item of arr) {
          if (item.id === id) {
            result.push(item);
            result.push({ ...item, id: nid(), children: dup(item.children) });
          } else {
            result.push({ ...item, children: dup(item.children) });
          }
        }
        return result;
      }
      return dup(prev);
    });
  };

  const updateWidth = (id: string, w: number) => setItems(prev => updateItemById(prev, id, i => ({ ...i, width: Math.max(25, Math.min(100, Math.round(w))) })));
  const updateHeight = (id: string, h: number) => setItems(prev => updateItemById(prev, id, i => ({ ...i, height: Math.max(0, Math.round(h)) })));
  const updateNote = (id: string, note: string) => setItems(prev => updateItemById(prev, id, i => ({ ...i, note })));
  const updatePosition = (id: string, position: Position) => setItems(prev => updateItemById(prev, id, i => ({ ...i, position })));
  const promoteToRoot = (childId: string, parentId: string) => setItems(prev => moveChildToRoot(prev, childId, parentId));

  // ---- Stack item onto another ----
  const stackItemOn = (childId: string, parentId: string) => {
    setItems(prev => {
      // Remove child from its current location
      let child: CanvasItem | null = null;
      function extract(arr: CanvasItem[]): CanvasItem[] {
        return arr.filter(i => {
          if (i.id === childId) { child = i; return false; }
          return true;
        }).map(i => ({ ...i, children: extract(i.children) }));
      }
      const without = extract(prev);
      if (!child) return prev;
      // Add as child of parent
      return updateItemById(without, parentId, p => ({
        ...p, children: [...p.children, { ...child!, parentId: parentId, position: child!.component.defaultChildPos }],
      }));
    });
  };

  // ---- Resize ----
  const onResizeStart = React.useCallback((e: React.MouseEvent, id: string, edge: string) => {
    e.preventDefault(); e.stopPropagation();
    const all = flatItems(itemsRef.current);
    const item = all.find(i => i.id === id);
    if (!item) return;
    setResizeState({ id, edge, sx: e.clientX, sy: e.clientY, sw: item.width || 50, sh: Math.max(item.height || 80, 40) });
  }, []);

  React.useEffect(() => {
    if (!resizeState) return;
    const frameW = frameWidths[platform];
    const onMove = (e: MouseEvent) => {
      const { id, edge, sx, sy, sw, sh } = resizeState;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      const wDelta = (dx / frameW) * 100;
      if (edge === "right" || edge === "corner") updateWidth(id, sw + wDelta);
      if (edge === "bottom" || edge === "corner") updateHeight(id, sh + dy);
    };
    const onUp = () => setResizeState(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [resizeState, platform]);

  // ---- Drag to reorder / stack ----
  const onDragStart = React.useCallback((e: React.MouseEvent, id: string) => {
    if ((e.target as HTMLElement).closest("[data-resize-handle]") || (e.target as HTMLElement).closest("[data-toolbar]")) return;
    e.preventDefault();
    setDragId(id);
  }, []);

  React.useEffect(() => {
    if (!dragId) return;
    const container = document.getElementById("canvas-container");
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const allItems = container.querySelectorAll("[data-item-id]");
      let bestTarget: string | null = null;
      let bestIdx: number | null = null;
      let isStack = false;

      for (const el of allItems) {
        const id = el.getAttribute("data-item-id");
        if (!id || id === dragId) continue;
        const rect = el.getBoundingClientRect();

        // If mouse is over the center area of another component, try stacking
        const centerY = rect.top + rect.height * 0.35;
        const centerBottom = rect.top + rect.height * 0.65;
        if (e.clientY > centerY && e.clientY < centerBottom && e.clientX > rect.left + rect.width * 0.15 && e.clientX < rect.right - rect.width * 0.15) {
          const all = flatItems(itemsRef.current);
          const dragItem = all.find(i => i.id === dragId);
          const targetItem = all.find(i => i.id === id);
          if (dragItem && targetItem && canStackOn(dragItem.component, targetItem.component)) {
            bestTarget = id;
            isStack = true;
            break;
          }
        }

        // Otherwise, reorder
        if (e.clientY < rect.top + rect.height / 2) {
          const rootIdx = itemsRef.current.findIndex(i => i.id === id || flatItems(i.children).some(c => c.id === id));
          if (rootIdx >= 0) bestIdx = rootIdx;
          break;
        }
      }

      // Find last index
      if (!isStack && bestIdx === null && allItems.length > 0) {
        const last = allItems[allItems.length - 1];
        const lastRect = last.getBoundingClientRect();
        if (e.clientY > lastRect.bottom) bestIdx = itemsRef.current.length;
      }

      setDropTargetId(isStack ? bestTarget : null);
      setDropAllowed(isStack);
      setDragOverIdx(isStack ? null : bestIdx);
    };

    const onUp = () => {
      // Perform stack
      if (dropTargetId && dropAllowed && dragId) {
        stackItemOn(dragId, dropTargetId);
      }
      // Perform reorder
      else if (dragOverIdx !== null) {
        setItems(prev => {
          const all = flatItems(prev);
          const dragItem = all.find(i => i.id === dragId);
          if (!dragItem) return prev;
          // Only reorder root items
          const without = removeItemById(prev, dragId);
          const insertAt = Math.min(dragOverIdx, without.length);
          return [...without.slice(0, insertAt), { ...dragItem, parentId: null }, ...without.slice(insertAt)];
        });
      }
      setDragId(null);
      setDropTargetId(null);
      setDropAllowed(false);
      setDragOverIdx(null);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [dragId, dropTargetId, dropAllowed, dragOverIdx]);

  // ---- Export ----
  const buildExport = () => {
    function serialize(items: CanvasItem[]): any[] {
      return items.map((item, i) => ({
        order: i + 1,
        component: item.component.chinese,
        englishName: item.component.english,
        width: `${item.width}%`,
        height: item.height > 0 ? `${item.height}px` : "auto",
        note: item.note || null,
        children: item.children.length > 0 ? serialize(item.children) : undefined,
        childPosition: item.parentId ? item.position : undefined,
      }));
    }
    return {
      name: layoutName, platform, platformName: platformNames[platform],
      deviceWidth: frameWidths[platform],
      createdAt: new Date().toISOString(),
      componentCount: flatItems(items).length,
      rootComponents: items.length,
      stackedComponents: flatItems(items).filter(i => i.parentId).length,
      layout: serialize(items),
      designTokens: {
        colors: { primary: "#18181b", accent: "#2563eb", success: "#059669", danger: "#dc2626", bg: "#ffffff", bgGray: "#f4f4f5" },
        spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
        radius: { sm: 4, md: 8, lg: 12, xl: 16, full: 9999 },
        fontSize: { xs: 12, sm: 14, base: 16, lg: 18, xl: 20 },
      },
      aiNote: "children数组表示叠加在父组件上的组件。childPosition表示叠加位置(tl=左上,tr=右上,bl=左下,br=右下,tc=上中,bc=下中,cc=居中)。note字段说明该区域的功能。",
    };
  };

  const filteredLibrary = React.useMemo(() => {
    if (!searchQuery.trim()) return LIBRARY;
    const q = searchQuery.toLowerCase();
    return LIBRARY.map(c => ({ ...c, items: c.items.filter(i => i.chinese.includes(q) || i.desc.includes(q)) })).filter(c => c.items.length > 0);
  }, [searchQuery]);

  const allItems = React.useMemo(() => flatItems(items), [items]);
  const selectedItem = allItems.find(i => i.id === selectedId);
  const selectedParent = selectedItem?.parentId ? findParent(items, selectedItem.id) : null;

  return (
    <div className="h-screen flex flex-col bg-zinc-100 dark:bg-zinc-950">
      {/* Top bar */}
      <div className="shrink-0 h-12 border-b bg-white dark:border-zinc-800 dark:bg-zinc-950 flex items-center justify-between px-3 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold hidden sm:inline">界面搭建器</span>
          <div className="flex rounded-md bg-zinc-100 p-0.5 dark:bg-zinc-800">
            {(["mobile", "desktop", "tablet"] as Platform[]).map(p => (
              <button key={p} onClick={() => setPlatform(p)}
                className={cn("flex items-center gap-1 rounded px-2 py-0.5 text-xs transition-all",
                  platform === p ? "bg-white shadow-sm text-zinc-900 dark:bg-zinc-700 dark:text-white" : "text-zinc-500")}>
                {p === "mobile" ? <Smartphone className="h-3 w-3" /> : p === "desktop" ? <Monitor className="h-3 w-3" /> : <Tablet className="h-3 w-3" />}
                <span className="hidden sm:inline">{platformNames[p]}</span>
              </button>
            ))}
          </div>
          <Input className="h-7 w-24 text-xs hidden sm:block" placeholder="方案名" value={layoutName} onChange={e => setLayoutName(e.target.value)} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-zinc-400">{flatItems(items).length}组件</span>
          <Button size="sm" onClick={() => setExportOpen(true)} className="gap-1 h-7 text-xs"><Download className="h-3 w-3" />导出</Button>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Left library */}
        <div className="w-44 shrink-0 border-r bg-white dark:border-zinc-800 dark:bg-zinc-950 hidden lg:flex flex-col">
          <div className="p-2 border-b dark:border-zinc-800">
            <div className="relative"><Search className="absolute left-2 top-2 h-3 w-3 text-zinc-400" /><Input className="pl-7 h-7 text-xs" placeholder="搜索..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /></div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-1 space-y-0.5">
              {filteredLibrary.map(cat => (
                <div key={cat.name}>
                  <div className="px-2 py-1 text-[9px] font-semibold text-zinc-400">{cat.name}</div>
                  {cat.items.map(item => (
                    <button key={item.chinese} onClick={() => addItem(item)}
                      className={cn("w-full text-left px-2 py-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
                        item.canContain && "border-l-2 border-l-green-400",
                        item.canBeChild && "border-l-2 border-l-blue-400")}>
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] font-medium">{item.chinese}</span>
                        {item.canContain && <span className="text-[8px] text-green-500">容器</span>}
                        {item.canBeChild && <span className="text-[8px] text-blue-500">可叠加</span>}
                      </div>
                      <div className="text-[9px] text-zinc-400 truncate">{item.desc}</div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-2 border-t dark:border-zinc-800 text-[10px] text-zinc-400 space-y-1">
            <p>🟢 绿边 = 可容纳叠加组件</p>
            <p>🔵 蓝边 = 可叠加到其他组件上</p>
          </div>
        </div>

        {/* Center canvas */}
        <div className="flex-1 flex justify-center p-3 overflow-auto bg-zinc-200/50 dark:bg-zinc-900/50">
          <div style={{ width: frameWidths[platform] }} className="flex flex-col h-fit">
            <div className={cn("bg-white dark:bg-zinc-900 shadow-xl overflow-hidden", platform === "mobile" ? "rounded-2xl border-8 border-zinc-800 dark:border-zinc-700" : "rounded-lg border dark:border-zinc-700")}>
              {platform !== "mobile" && (
                <div className="flex items-center gap-2 h-6 px-3 bg-zinc-100 dark:bg-zinc-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400" /><span className="h-1.5 w-1.5 rounded-full bg-yellow-400" /><span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                </div>
              )}
              {platform === "mobile" && (
                <div className="flex justify-between items-center h-7 px-4 bg-white dark:bg-zinc-900 text-[10px] font-medium border-b dark:border-zinc-800"><span>9:41</span><span>📶🔋</span></div>
              )}

              <div id="canvas-container" className="min-h-[480px] p-2 flex flex-wrap items-start content-start gap-2">
                {items.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center h-64 text-zinc-300 dark:text-zinc-600"><Plus className="h-8 w-8 mb-2" /><p className="text-xs">从左侧添加组件</p></div>
                ) : (
                  items.map((item, idx) => (
                    <CanvasItemView
                      key={item.id}
                      item={item}
                      platform={platform}
                      isSelected={selectedId === item.id}
                      isDragOver={dropTargetId === item.id && dropAllowed}
                      isDragBlocked={dropTargetId === item.id && !dropAllowed}
                      isDragging={dragId === item.id}
                      dragOverIdx={dragOverIdx}
                      currentIdx={idx}
                      onSelect={() => setSelectedId(prev => prev === item.id ? null : item.id)}
                      onRemove={() => removeItem(item.id)}
                      onDuplicate={() => duplicateItem(item.id)}
                      onResizeStart={onResizeStart}
                      onDragStart={onDragStart}
                      onStackFromChild={(childId) => { if (selectedItem?.parentId) promoteToRoot(childId, selectedItem.parentId); }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-44 shrink-0 border-l bg-white dark:border-zinc-800 dark:bg-zinc-950 hidden lg:flex flex-col">
          <ScrollArea className="flex-1">
            {selectedItem ? (
              <div className="p-3 space-y-3">
                <h3 className="text-xs font-semibold">属性</h3>
                <div className="rounded-lg border p-2 dark:border-zinc-700">
                  <p className="text-xs font-medium">{selectedItem.component.chinese}</p>
                  <p className="text-[10px] text-zinc-500">{selectedItem.component.desc}</p>
                  {selectedItem.component.canContain && <Badge variant="success" className="text-[8px] mt-1">可容纳叠加</Badge>}
                  {selectedItem.component.canBeChild && <Badge variant="secondary" className="text-[8px] mt-1 ml-1">可叠加</Badge>}
                </div>

                {/* If this is a child, show parent info + promote button */}
                {selectedParent && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-2 dark:border-amber-800 dark:bg-amber-950/30">
                    <p className="text-[10px] font-medium text-amber-700 dark:text-amber-300">已叠加在: {selectedParent.component.chinese}</p>
                    <Button variant="outline" size="sm" className="w-full mt-1 h-6 text-[10px]" onClick={() => promoteToRoot(selectedItem.id, selectedParent.id)}>
                      <ArrowBigUp className="h-3 w-3 mr-1" />移回主画布
                    </Button>
                  </div>
                )}

                {/* Position selector for children */}
                {selectedItem.parentId && (
                  <div>
                    <p className="text-[10px] font-medium mb-1">叠加位置</p>
                    <div className="grid grid-cols-3 gap-0.5">
                      {POSITIONS.map(pos => (
                        <button key={pos.id} onClick={() => updatePosition(selectedItem.id, pos.id)}
                          className={cn("py-1 text-[9px] rounded border dark:border-zinc-700",
                            selectedItem.position === pos.id ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "hover:bg-zinc-50 dark:hover:bg-zinc-800")}>
                          {pos.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!selectedItem.parentId && (
                  <>
                    <div>
                      <div className="flex justify-between text-[10px] mb-1"><span>宽度</span><span className="font-mono">{selectedItem.width}%</span></div>
                      <input type="range" min={25} max={100} step={5} value={selectedItem.width}
                        onChange={e => updateWidth(selectedItem.id, Number(e.target.value))}
                        className="w-full h-1.5 rounded-full appearance-none bg-zinc-200 dark:bg-zinc-700 accent-blue-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] mb-1"><span>高度</span><span className="font-mono">{selectedItem.height > 0 ? `${selectedItem.height}px` : "自动"}</span></div>
                      <div className="flex gap-1">
                        {[0, 100, 180, 280].map(h => (
                          <button key={h} onClick={() => updateHeight(selectedItem.id, h)}
                            className={cn("flex-1 py-1 text-[9px] rounded border dark:border-zinc-700", selectedItem.height === h ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900" : "hover:bg-zinc-50 dark:hover:bg-zinc-800")}>{h === 0 ? "自动" : h}</button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <p className="text-[10px] font-medium mb-1">备注</p>
                  <textarea className="w-full rounded-lg border px-2 py-1 text-[10px] dark:border-zinc-700 dark:bg-zinc-800 resize-none" rows={2}
                    placeholder="告诉AI这里放什么" value={selectedItem.note} onChange={e => updateNote(selectedItem.id, e.target.value)} />
                </div>
                <Separator />
                <div className="space-y-0.5">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-[10px] h-6" onClick={() => duplicateItem(selectedItem.id)}>📋 复制</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-[10px] h-6 text-red-500" onClick={() => removeItem(selectedItem.id)}>🗑 删除</Button>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-[10px] text-zinc-400 mt-8">
                <p>点击组件查看属性</p>
                <div className="mt-3 text-left space-y-1">
                  <p className="text-[10px] font-medium">💡 叠加操作:</p>
                  <p className="text-[9px]">按住装饰组件(蓝边)</p>
                  <p className="text-[9px]">拖到容器组件(绿边)上</p>
                  <p className="text-[9px]">🟢绿色=可叠加</p>
                  <p className="text-[9px]">🔴红色=无法叠加</p>
                </div>
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
            <DialogDescription>包含叠加关系 → 提供给 AI</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2">
              {[
                { l: "总数", v: flatItems(items).length },
                { l: "根组件", v: items.length },
                { l: "已叠加", v: flatItems(items).filter(i => i.parentId).length },
                { l: platformNames[platform], v: "" },
              ].map(s => (
                <div key={s.l} className="rounded-lg border p-1.5 text-center dark:border-zinc-700"><p className="text-base font-bold">{s.v || "📱"}</p><p className="text-[9px] text-zinc-500">{s.l}</p></div>
              ))}
            </div>
            <pre className="rounded-lg bg-zinc-950 p-3 text-[10px] text-zinc-100 max-h-52 overflow-auto dark:bg-zinc-900 leading-relaxed">{JSON.stringify(buildExport(), null, 2)}</pre>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={async () => { await navigator.clipboard.writeText(JSON.stringify(buildExport(), null, 2)); }} className="gap-1 h-7 text-xs"><Copy className="h-3 w-3" />复制</Button>
              <Button size="sm" onClick={() => { const b = new Blob([JSON.stringify(buildExport(), null, 2)], { type: "application/json" }); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = `${layoutName}.json`; a.click(); URL.revokeObjectURL(u); }} className="gap-1 h-7 text-xs"><Download className="h-3 w-3" />下载</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ============ Canvas Item View ============
function CanvasItemView({ item, platform, isSelected, isDragOver, isDragBlocked, isDragging, dragOverIdx, currentIdx, onSelect, onRemove, onDuplicate, onResizeStart, onDragStart, onStackFromChild }: {
  item: CanvasItem; platform: Platform; isSelected: boolean; isDragOver: boolean; isDragBlocked: boolean;
  isDragging: boolean; dragOverIdx: number | null; currentIdx: number;
  onSelect: () => void; onRemove: () => void; onDuplicate: () => void;
  onResizeStart: (e: React.MouseEvent, id: string, edge: string) => void;
  onDragStart: (e: React.MouseEvent, id: string) => void;
  onStackFromChild: (childId: string) => void;
}) {
  const isRoot = !item.parentId;
  const w = (isRoot && platform !== "mobile") ? `${item.width}%` : (isRoot ? "100%" : undefined);
  const h = isRoot && item.height > 0 ? item.height : undefined;
  const hasChildren = item.children.length > 0;

  return (
    <>
      {dragOverIdx === currentIdx && <div className="w-full h-1 bg-blue-500 rounded-full animate-pulse" />}

      <div
        id={item.id}
        data-item-id={item.id}
        style={{ width: w, height: h }}
        className={cn(
          "relative rounded-xl border-2 transition-all flex-shrink-0 select-none",
          isSelected && !isDragOver && !isDragBlocked ? "border-blue-500 shadow-md" : "",
          isDragOver ? "border-green-500 bg-green-50/30 shadow-lg shadow-green-200 dark:bg-green-950/20 dark:shadow-green-900 scale-[1.02]" : "",
          isDragBlocked ? "border-red-500 bg-red-50/30 shadow-lg shadow-red-200 dark:bg-red-950/20 dark:shadow-red-900" : "",
          isDragging ? "opacity-30 scale-95 border-blue-400" : "opacity-100",
          !isSelected && !isDragOver && !isDragBlocked ? "border-transparent hover:border-zinc-200 dark:hover:border-zinc-700" : "",
          "bg-white dark:bg-zinc-900",
          isRoot ? "cursor-grab active:cursor-grabbing" : "cursor-default",
        )}
        onMouseDown={e => isRoot ? onDragStart(e, item.id) : undefined}
        onClick={e => { if (!(e.target as HTMLElement).closest("[data-resize-handle]")) onSelect(); }}
      >
        {/* Stack indicator */}
        {isDragOver && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="rounded-full bg-green-500 text-white px-3 py-1 text-xs font-bold shadow-lg animate-bounce">
              <Layers className="inline h-3 w-3 mr-1" />松手叠加
            </div>
          </div>
        )}
        {isDragBlocked && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="rounded-full bg-red-500 text-white px-3 py-1 text-xs font-bold shadow-lg">
              <X className="inline h-3 w-3 mr-1" />无法叠加
            </div>
          </div>
        )}

        {/* Toolbar */}
        {isRoot && (
          <div data-toolbar className={cn(
            "absolute -top-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-0.5 bg-white dark:bg-zinc-800 rounded-md shadow-lg border dark:border-zinc-700 px-0.5 py-0.5 transition-opacity",
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}>
            <Tb onClick={onDuplicate} title="复制">📋</Tb>
            <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700" />
            <Tb onClick={onRemove} title="删除" danger><X className="h-3 w-3" /></Tb>
          </div>
        )}

        {/* Content */}
        <div className={cn("min-h-[50px] flex items-center justify-center overflow-hidden", hasChildren && "relative")}>
          <ComponentRenderer componentName={item.component.english} category={item.component.category} variants={item.component.variants} />

          {/* Render children (overlays) */}
          {item.children.map(child => (
            <div key={child.id}
              className={cn("absolute z-10", posStyles[child.position])}
              onClick={e => { e.stopPropagation(); }}
            >
              <div className={cn(
                "rounded-lg border-2 transition-all cursor-pointer",
                child.id === item.children.find(c => false)?.id ? "border-blue-400" : "border-blue-300/50 hover:border-blue-400"
              )}>
                <ComponentRenderer componentName={child.component.english} category={child.component.category} variants={child.component.variants} />
              </div>
              {/* Child remove button */}
              <button
                onClick={e => { e.stopPropagation(); onStackFromChild(child.id); }}
                className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-white border dark:bg-zinc-800 dark:border-zinc-600 shadow flex items-center justify-center hover:bg-red-50"
                title="移回主画布"
              >
                <X className="h-2.5 w-2.5 text-zinc-400 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {/* Note + Child count */}
        {(item.note || hasChildren) && (
          <div className="absolute top-1 left-2 z-10 flex items-center gap-1">
            {item.note && <span className="bg-blue-500 text-white text-[8px] px-1.5 py-0.5 rounded-full max-w-[100px] truncate">💬 {item.note}</span>}
            {hasChildren && <span className="bg-green-500 text-white text-[8px] px-1.5 py-0.5 rounded-full"><Layers className="inline h-2.5 w-2.5 mr-0.5" />{item.children.length}</span>}
          </div>
        )}

        {/* Resize handles (root only) */}
        {isSelected && isRoot && (
          <>
            <div data-resize-handle className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-blue-200/50 z-20"
              onMouseDown={e => onResizeStart(e, item.id, "right")} />
            <div data-resize-handle className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-blue-200/50 z-20"
              onMouseDown={e => onResizeStart(e, item.id, "bottom")} />
            <div data-resize-handle className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-20"
              onMouseDown={e => onResizeStart(e, item.id, "corner")}>
              <svg width="12" height="12" className="absolute bottom-0.5 right-0.5 text-blue-400"><path d="M0 12 L12 0" stroke="currentColor" strokeWidth="2" /></svg>
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
    className={cn("p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs", danger && "hover:bg-red-50 hover:text-red-500")}>{children}</button>;
}
